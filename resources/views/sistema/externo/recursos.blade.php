@extends('layouts.horizontal')

@section('css')
    <style>
        .card {
            box-shadow: 4px 6px 12px 0px rgb(219 219 219 / 0%);
        }
        .cd_btn .cd_btn_text:hover {
            color: #fff;
            text-decoration: underline;
        }
        .active .cd_btn_text{
            color: #fff;
            text-decoration: underline;
        }
        .centro_menu {
            display: flex;
            align-items: center;
        }
        .link-02:hover {
            background-color: #e7e7e7;
            color: #0000ff;
        }
    </style>
@endsection

@section('content')
@include('layouts.menu_h')
@include('layouts.header_v', [
    'title_include' => $banner ? $banner->titulo : 'CENTRO DE INFORMACIÓN Y DOCUMENTACIÓN CIENTÍFICA',
    'subtitle_include' => $banner ? $banner->descripcion : '', 
    'image' => $banner ? 'storage/recursos/'.$banner->imagen : 'images/banner_2.webp'
])

<main class="m-0" >
    <div class="last_banner" style="background-image: url({{asset('images/centro-fondo.jpg')}});background-repeat: no-repeat, repeat;
    background-size: cover;">
        <div class="bg_color">
            <div class="container">
                <div class="centro_wrapper">
                    <section class="centro_menu custom_shadow mt-5">
                        <div class="stats_data_links">
                            <ul>
                                @foreach ($centros as $item)
                                <li class="{{$id == $item->id ? 'active' : ''}}">
                                    <a href="{{url('centro_informacion/tipo/'.$item->id)}}">
                                        <i class="{{$item->icon}} cen_inf"></i>
                                        <p>{{$item->nombre}}</p>
                                    </a>
                                </li>
                                @endforeach
                                {{-- <li>
                                    <a href="{{url('centro_informacion/tipo/DT')}}">
                                        <i>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"> <g clip-path="url(#clip0_32_8)"> <path d="M12 0H6C5.175 0 4.5 0.675 4.5 1.5V13.5C4.5 14.325 5.175 15 6 15H15C15.825 15 16.5 14.325 16.5 13.5V4.5L12 0ZM15 13.5H6V1.5H11.25V5.25H15V13.5ZM3 3V16.5H15V18H3C2.175 18 1.5 17.325 1.5 16.5V3H3ZM7.5 7.5V9H13.5V7.5H7.5ZM7.5 10.5V12H11.25V10.5H7.5Z" fill="white"/> </g> <defs> <clipPath id="clip0_32_8"> <rect width="18" height="18" fill="white"/> </clipPath> </defs> </svg>
                                        </i>
                                        <p>Documentos técnicos</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="{{url('centro_informacion/tipo/PU')}}">
                                        <i>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"> <path d="M8.25 2.75V16.5H11V2.75H8.25ZM11 4.58333L14.6667 16.5L17.4167 15.5833L13.75 3.66667L11 4.58333ZM4.58333 4.58333V16.5H7.33333V4.58333H4.58333ZM2.75 17.4167V19.25H19.25V17.4167H2.75Z" fill="white"/> </svg>
                                        </i>
                                        <p>Publicaciones</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="{{url('centro_informacion/tipo/WF')}}">
                                        <i>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none"> <g clip-path="url(#clip0_32_12)"> <path d="M16.5 3C16.8978 3 17.2794 3.15804 17.5607 3.43934C17.842 3.72064 18 4.10218 18 4.5V12C18 12.3978 17.842 12.7794 17.5607 13.0607C17.2794 13.342 16.8978 13.5 16.5 13.5H4.5C4.10218 13.5 3.72064 13.342 3.43934 13.0607C3.15804 12.7794 3 12.3978 3 12V3C3 2.60218 3.15804 2.22064 3.43934 1.93934C3.72064 1.65804 4.10218 1.5 4.5 1.5H9L10.5 3H16.5ZM1.5 4.5V15H15V16.5H1.5C1.10218 16.5 0.720644 16.342 0.43934 16.0607C0.158035 15.7794 0 15.3978 0 15V4.5H1.5ZM4.5 4.5V12H16.5V4.5H4.5Z" fill="white"/> </g> <defs> <clipPath id="clip0_32_12"> <rect width="18" height="18" fill="white"/> </clipPath> </defs> </svg>
                                        </i>
                                        <p>Pipeline - workflow</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="{{url('centro_informacion/tipo/SP')}}">
                                        <i>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23" fill="none"> <path d="M11.7875 6.98624C11.9792 6.81374 12.2092 6.70832 12.4584 6.70832C12.7171 6.70832 12.9375 6.81374 13.1388 6.98624C13.3209 7.18749 13.4167 7.41749 13.4167 7.66666C13.4167 7.92541 13.3209 8.14582 13.1388 8.34707C12.9375 8.52916 12.7171 8.62499 12.4584 8.62499C12.2092 8.62499 11.9792 8.52916 11.7875 8.34707C11.6054 8.14582 11.5 7.92541 11.5 7.66666C11.5 7.41749 11.6054 7.18749 11.7875 6.98624ZM9.39169 11.4712C9.39169 11.4712 11.4713 9.82291 12.2284 9.75582C12.9375 9.69832 12.7938 10.5129 12.7267 10.9346L12.7171 10.9921C12.5829 11.5 12.42 12.1133 12.2571 12.6979C11.8929 14.03 11.5384 15.3333 11.6246 15.5729C11.7204 15.8987 12.3146 15.4867 12.7459 15.1992C12.8034 15.1608 12.8513 15.1225 12.8992 15.0937C12.8992 15.0937 12.9759 15.0171 13.0525 15.1225C13.0717 15.1512 13.0909 15.18 13.11 15.1992C13.1963 15.3333 13.2442 15.3812 13.1292 15.4579L13.0909 15.4771C12.88 15.6208 11.9792 16.2533 11.615 16.4833C11.2221 16.7421 9.71752 17.6046 9.94752 15.9275C10.1488 14.7487 10.4171 13.7329 10.6279 12.9375C11.0209 11.5 11.1934 10.8483 10.3117 11.4137C9.9571 11.6246 9.74627 11.7587 9.62169 11.845C9.51627 11.9217 9.50669 11.9217 9.4396 11.7971L9.41085 11.7396L9.36294 11.6629C9.29585 11.5671 9.29585 11.5575 9.39169 11.4712ZM21.0834 11.5C21.0834 16.7708 16.7709 21.0833 11.5 21.0833C6.22919 21.0833 1.91669 16.7708 1.91669 11.5C1.91669 6.22916 6.22919 1.91666 11.5 1.91666C16.7709 1.91666 21.0834 6.22916 21.0834 11.5ZM19.1667 11.5C19.1667 7.26416 15.7359 3.83332 11.5 3.83332C7.26419 3.83332 3.83335 7.26416 3.83335 11.5C3.83335 15.7358 7.26419 19.1667 11.5 19.1667C15.7359 19.1667 19.1667 15.7358 19.1667 11.5Z" fill="white"/> </svg>
                                        </i>
                                        <p>Centro de prensa</p>
                                    </a>
                                </li> --}}
                            </ul>
                        </div>
                    </section>
                    <section class="centro_years">
                        <h2>
                            <span style="text-shadow: 2px 2px 2px rgba(0,0,0,0.39);">{{$centro->nombre.': '}}</span> 
                            
                            <button class="tx-20" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{$anio_text}}</button>
                            <div class="dropdown-menu">
                                @foreach ($anios as $an)
                                    <a href="{{url('centro_informacion/tipo/'.$id.'/'.$an['id'])}}" class="dropdown-item {{$anio == $an['id'] ? 'active' : ''}}">{{$an['nombre']}}</a>
                                @endforeach
                            </div>
                        </h2>
                        {{-- <div class="row">
                            @foreach ($recursos as $key => $item)
                                <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
                                    <div class="">
                                        <div class="card card-file">
                                            <div class="dropdown-file">
                                                <a href="" class="dropdown-link" data-bs-toggle="dropdown"><i data-feather="more-vertical"></i></a>
                                                <div class="dropdown-menu dropdown-menu-end">
                                                    <a href="javascript:void(0)" class="dropdown-item details" onclick="OpenDetails({{json_encode($item)}})"><i data-feather="info"></i>Ver detalles</a>
                                                    <a href="javascript:void(0)" class="dropdown-item" onclick="Download({{$item->id}})"><i data-feather="download"></i>Descargar</a>
                                                </div>
                                            </div><!-- dropdown -->
                                            <div class="card-file-thumb tx-danger">
                                                <i class="far fa-file-pdf"></i>
                                            </div>
                                            <div class="card-body">
                                                <h6><a href="javascript:void(0)" onclick="Download({{$item->id}})" class="link-02" data-bs-toggle="tooltip" data-bs-placement="top" title="Click para descargar">{{$item->nombre_archivo}}</a></h6>
                                            </div>
                                            <div class="card-footer"><span class="text_1">Publicación: {{date('d/m/Y', strtotime($item->fecha))}}</span></div>
                                        </div>
                                    </div>
                                </div>
                            @endforeach
                        </div> --}}

                        <div data-label="Example" class="df-example">
                            <ul class="list-unstyled">
                                @foreach ($recursos as $key => $item)
                                    <div class="pos-absolute pais_top">
                                        <img src="{{asset('storage/paises/'.$item->pais->bandera)}}" class="codigo_tel">
                                    </div>
                                    <li class="media d-block d-sm-flex mb-3">    
                                        <img src="{{asset('storage/recursos/'.$item->imagen)}}" class="wd-100p wd-sm-200 rounded mg-sm-r-20 mg-b-20 mg-sm-b-0" alt="">
                                        <div class="media-body">
                                            <h5 class="mb-0 text_1">{{$item->titulo}}</h5>
                                            <div class="tx-12 mb-2"><strong><i class="fas fa-calendar-alt"></i> Publicación:</strong> {{date('d/m/Y', strtotime($item->fecha))}}</div>
                                            <div class="text-justify">{{$item->descripcion}}</div>

                                            <div class="text-end">
                                                @if ($item->enlace)
                                                    <a href="{{$item->enlace}}" target="_blank" class="btn btn-sm btn-outline-dark"><i class="fas fa-download"></i> Descargar</a>
                                                @endif
                                            </div>
                                        </div>
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</main>

<div class="modal fade effect-scale" id="modalViewDetails" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body pd-20 pd-sm-30">
                <button type="button" class="close pos-absolute t-15 r-20" data-bs-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>

                <h4 class="tx-18 tx-sm-20 mg-b-30">Detalles</h4>

                <div class="row mg-b-10">
                    <div class="col-4">Archivo:</div>
                    <div class="col-8 file_name"></div>
                </div>
                <div class="row mg-b-10">
                    <div class="col-4">Tipo de Archivo:</div>
                    <div class="col-8 file_type">PDF</div>
                </div>
                <div class="row mg-b-10">
                    <div class="col-4">Pais:</div>
                    <div class="col-8 file_pais"></div>
                </div>
                <div class="row mg-b-10">
                    <div class="col-4">Título:</div>
                    <div class="col-8 file_title"></div>
                </div>
                <div class="row mg-b-10">
                    <div class="col-4">Descripción:</div>
                    <div class="col-8 file_description"></div>
                </div>
                <div class="row mg-b-10">
                    <div class="col-4">Publicación:</div>
                    <div class="col-8 file_date"></div>
                </div>
            </div>

            <div class="modal-footer">
                <button type="button" class="btn btn-secondary mg-sm-l-5" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
@endsection

@section('js')
    <script>
        function OpenDetails(key) {
            let data = key;
            
            $(".file_name").html(data.nombre_archivo);
            $(".file_type").html('PDF');
            $(".file_pais").html('<img src="../../../storage/paises/'+data.pais.bandera+'" class="codigo_tel"> '+data.pais.nombre);
            $(".file_title").html(data.titulo);
            $(".file_description").html(data.descripcion);
            $(".file_date").html(Fecha(data.fecha));
            $("#modalViewDetails").modal('show');
        }

        function Download(id) {
            window.location = '../../download/'+id;
        }

        function Fecha(date) {
            if (date) {
                let fecha = date.split('-');
                return fecha[2]+'/'+fecha[1]+'/'+fecha[0];
            }
            return '';
        }
    </script>
@endsection