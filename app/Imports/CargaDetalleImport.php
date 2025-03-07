<?php

namespace App\Imports;

use App\Models\CargaDetalle;
use App\Models\CargaGisaid;
use App\Models\TipoMuestreo;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Row;
use Maatwebsite\Excel\Concerns\OnEachRow;
use Maatwebsite\Excel\Concerns\WithStartRow;
use Maatwebsite\Excel\Concerns\WithChunkReading;
use Maatwebsite\Excel\Concerns\Importable;
use Carbon\Carbon;

class CargaDetalleImport implements OnEachRow, WithChunkReading, WithStartRow
{
    use Importable;

    public $errors = [], $total = 0, $total_error = 0, $carga = [], $fecha = '';

    public function __construct($carga)
    {
        $this->carga = $carga;
    }

    public function startRow(): int
    {
        return 2;
    }

    public function chunkSize(): int
    {
        return 100;
    }

    public function onRow(Row $row)
    {
        $rowIndex = $row->getIndex();
        $row      = array_map('trim', $row->toArray());
        
        try {
            $success = true;
            $columna = [];

            $gisaid = CargaGisaid::where('virus_name', $row[0])->where('activo', 'S')->first();
            if (!$gisaid) {
                $success = false;
                $columna[] = 'virus_name (No existe en el archivo GISAID)';
            }
            
            $muestreo = TipoMuestreo::where('nombre', $row[15])->where('activo', 'S')->first();
            if (!$muestreo) {
                $success = false;
                $columna[] = 'tipo_muestreo (No existe en los registros)';
            }

            if ($success) {
                $fecha_muestra = null;
                $fecha_sistema = null;
                if ($row[6]) {
                    $fecha_muestra = $this->transformDateTime($row[6], 'Y-m-d');
                }
                if ($row[21]) {
                    $fecha_sistema = $this->transformDateTime($row[21], 'Y-m-d H:i:s');
                }
    
                $detalle = new CargaDetalle();
                $detalle->carga_id = $this->carga->id;
                $detalle->virus_id = $this->carga->virus_id;
                $detalle->pais_id = $this->carga->pais_id;
                $detalle->codigo = $row[0];
                $detalle->codigo_pais = $row[1];
                $detalle->kit_ct = $row[2];
                $detalle->gen = $row[3];
                $detalle->ct = $row[4];
                $detalle->ct2 = $row[5];
                $detalle->fecha_muestra = $fecha_muestra;
                $detalle->edad = $row[7];
                $detalle->sexo = $row[8];
                $detalle->vacunado = $row[9];
                $detalle->dosis_1 = $row[10];
                $detalle->dosis_2 = $row[11];
                $detalle->dosis_3 = $row[12];
                $detalle->dosis_4 = $row[13];
                $detalle->dosis_5 = $row[14];
                $detalle->tipo_muestreo = $row[15];
                $detalle->hospitalizacion = $row[16];
                $detalle->fallecido = $row[17];
                $detalle->numero_placa = $row[18];
                $detalle->placa = $row[19];
                $detalle->corrida = $row[20];
                $detalle->fecha_sistema = $fecha_sistema;
                $detalle->cobertura = $row[22];
                $detalle->cobertura_porcentaje = $row[23];
                $detalle->asintomatico = $row[24];
                $detalle->sintomas = $row[25];
                $detalle->comorbilidad = $row[26];
                $detalle->comorbilidad_lista = $row[27];
                $detalle->user_id = Auth::user()->id;
                $detalle->save();
    
                $this->total += 1;
            } else {
                $this->total_error += 1;
    
                $this->errors[] = [
                    'fila' => $rowIndex,
                    'error' => $columna
                ];
            }

        } catch (\Exception $e) {
            $this->total_error += 1;

            $this->errors[] = [
                'fila' => $rowIndex,
                'error' => $e->getMessage()
            ];
        }
    }

    public function getData()
    {
        return [
            'total' => $this->total,
            'total_error' => $this->total_error,
            'errors' => $this->errors,
        ];
    }

    private function transformDateTime(string $value, string $format)
    {
        try {
            return Carbon::instance(\PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($value))->format($format);
        } catch (\ErrorException $e) {
            return Carbon::createFromFormat($format, $value);
        }
    }
}
