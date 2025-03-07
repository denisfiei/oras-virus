new Vue({
    el: '#form_cargas',
    data: {
        config: [],
        color: 'rgba(0, 0, 0, 0.71)',
        search: {
            'datos': null
        },
        page: 1,

        listRequest: [],
        pagination: {
            'total': 0,
            'current_page': 0,
            'per_page': 0,
            'last_page': 0,
            'from': 0,
            'to': 0,
        },
        to_pagination: 0,

        modal: {
            'size': null,
            'method': null,
            'loading': null,
            'title': null,
        },
        id: null,
        seleccion: [],
        errors: [],

        virus: [],
        muestreos: [],
        carga: {
            'nombre': null,
            'fecha': null,
            'virus': null,
            'virus_text': '--- Seleccione una Opción ---',
            'tipo': null,
            'tipo_text': '--- Seleccione una Opción ---',
            'muestreo': null,
            'muestreo_text': '--- Seleccione una Opción ---',
            'archivo': null,
            'tipo': 'TSV',
            'file': null
        },
        gisaids: [],
        detalles: [],
        page_load: 1,
        page_last_load: 1,

        // UPLOAD
        visible: true,
        importar: {
            'rows': 0,
            'rows_error': 0,
            'errors': [],
            'log_file': null,
        },
        finished: false,
        total_rows: 0,
    },
    created() {
        this.Datos();
        $(".my_vue").show();
    },
    methods: {
        changePage(page) {
            this.page = page;
            this.pagination.current_page = page;
            this.Buscar(page);
        },
        Load(id, show, text) {
            if (show == 'on') {
                return $(".a_load").show();
            }
            return $(".a_load").hide();
        },
        Alert(action, title, message) {
            // switch (action) {
            //     case 'success':
            //         toastr.success(message, title, {
            //             positionClass: "toast-top-right",
            //             timeOut: 5e3,
            //             closeButton: !0,
            //             debug: !1,
            //             newestOnTop: !0,
            //             progressBar: !1,
            //             preventDuplicates: !0,
            //             onclick: null,
            //             showDuration: "300",
            //             hideDuration: "500",
            //             extendedTimeOut: "1000",
            //             showEasing: "swing",
            //             hideEasing: "linear",
            //             showMethod: "fadeIn",
            //             hideMethod: "fadeOut",
            //             tapToDismiss: !1
            //         });
            //         break;

            //     case 'error':
            //         toastr.error(message, title, {
            //             positionClass: "toast-top-right",
            //             timeOut: 5e3,
            //             closeButton: !0,
            //             debug: !1,
            //             newestOnTop: !0,
            //             progressBar: !1,
            //             preventDuplicates: !0,
            //             onclick: null,
            //             showDuration: "300",
            //             hideDuration: "1000",
            //             extendedTimeOut: "1000",
            //             showEasing: "swing",
            //             hideEasing: "linear",
            //             showMethod: "fadeIn",
            //             hideMethod: "fadeOut",
            //             tapToDismiss: !1
            //         });
            //         break;
            
            //     default:
            //         toastr.warning(message, title, {
            //             positionClass: "toast-top-right",
            //             timeOut: 5e3,
            //             closeButton: !0,
            //             debug: !1,
            //             newestOnTop: !0,
            //             progressBar: !1,
            //             preventDuplicates: !0,
            //             onclick: null,
            //             showDuration: "300",
            //             hideDuration: "1000",
            //             extendedTimeOut: "1000",
            //             showEasing: "swing",
            //             hideEasing: "linear",
            //             showMethod: "fadeIn",
            //             hideMethod: "fadeOut",
            //             tapToDismiss: !1
            //         });
            //         break;
            // }
        },
        Alert2(action, titulo, texto) {
            switch (action) {
                case 'success':
                    Swal.fire({
                        title: titulo,
                        text: texto,
                        icon: 'success',
                        showConfirmButton: false,
                        customClass: {
                            confirmButton: 'btn btn-success'
                        },
                        timer: 2000
                    });
                break;
                case 'error': 
                    Swal.fire({
                        title: titulo,
                        text: texto,
                        icon: 'error',
                        showConfirmButton: true,
                        customClass: {
                            confirmButton: 'btn btn-danger'
                        }
                    });
                break;
                default: 
                    Swal.fire({
                        title: titulo,
                        text: texto,
                        icon: 'warning',
                        showConfirmButton: true,
                        customClass: {
                            confirmButton: 'btn btn-warning'
                        }
                    });
                break;
            }
        },
        Datos() {
            axios.post('cargas/datos').then(response => {
                this.virus = response.data.virus;

                this.listRequest = response.data.cargas.data;
                this.to_pagination = response.data.cargas.to;
                this.pagination = response.data.pagination;
            }).catch(error => {
                console.log(error);
                let action = 'error';
                let title = 'Error !!';
                let message = 'No se pudo conectar con el servidor, por favor actualice la página.';
                this.Alert2(action, title, message);
            });
        },
        Buscar(page) {
            urlBuscar = 'cargas/buscar?page=' + page;
            axios.post(urlBuscar, {
                search: this.search.datos
            }).then(response => {
                this.listRequest = response.data.cargas.data;
                this.to_pagination = response.data.cargas.to;
                this.pagination = response.data.pagination;
            }).catch(error => {
                console.log(error)

                let action = 'error';
                let title = 'Error !!';
                let message = 'No se pudo conectar con el servidor, por favor actualice la página.';
                this.Alert2(action, title, message);
            });
        },
        Modal(size, metodo, id, seleccion) {
            $("#formularioModal").modal('show');
            this.modal.size = size;
            this.modal.method = metodo;
            this.id = id;
            this.color = 'rgba(236, 120, 0, 0.98)'

            switch (metodo) {                
                case 'create':
                    this.modal.title = 'NUEVA CARGA GISAID';
                    break;
                    
                case 'carga':
                    this.modal.title = 'NUEVA CARGA DETALLE';
                    this.carga.archivo = seleccion.archivo_gisaid;
                    break;

                case 'delete':
                    this.modal.title = 'ELIMINAR CARGA';
                    this.carga.archivo = seleccion.archivo_gisaid;
                    if (seleccion.archivo_detalle) {
                        this.carga.archivo = seleccion.archivo_gisaid+' y '+seleccion.archivo_detalle;
                    }
                    this.carga.fecha = this.FechaHora(seleccion.created_at);
                    break;
                
                case 'rows_gisaid':
                    this.modal.title = 'LISTA GISAID';
                    this.carga.archivo = seleccion.archivo_gisaid;
                    this.BuscarGisaid(metodo);
                    break;

                case 'rows_detalle':
                    this.modal.title = 'LISTA DETALLE';
                    this.carga.archivo = seleccion.archivo_detalle;
                    this.BuscarDetalle(metodo);
                    break;
                    
                default:
                    this.carga.archivo = seleccion.archivo_gisaid;
                    this.carga.fecha = this.FechaHora(seleccion.created_at);
                    break;
            }
        },
        CloseModal() {
            $("#formularioModal").modal('hide');
            this.color = 'rgba(0, 0, 0, 0.71)';
            this.modal = {
                'size': null,
                'method': null,
                'loading': null,
                'title': null,
            };
            this.id = null;
            this.seleccion = [];
            this.errors = [];

            this.carga = {
                'nombre': null,
                'fecha': null,
                'virus': null,
                'virus_text': '--- Seleccione una Opción ---',
                'tipo': null,
                'tipo_text': '--- Seleccione una Opción ---',
                'muestreo': null,
                'muestreo_text': '--- Seleccione una Opción ---',
                'archivo': null,
                'tipo': 'TSV',
                'file': null
            };
            this.gisaids = [];
            this.detalles = [];

            // -------- UPLOAD
            this.visible = true;
            this.importar = {
                'rows': 0,
                'rows_error': 0,
                'errors': [],
                'log_file': null,
            };
            this.finished = false;
            this.total_rows = 0;            
            $('#file').val('');
            $('#file_det').val('');

            this.page_load = 1;
        },
        Delete(form) {
            this.Load(form, 'on', 'Eliminando Registro ...');

            this.errors = [];
            axios.post('cargas/delete', {
                id: this.id,
            }).then(response=> {
                this.Load(form, 'off', null);

                let action = response.data.action;
                let title = response.data.title;
                let message = response.data.message;
                this.Alert2(action, title, message);

                if (action == 'success') {
                    $('#formularioModal').modal('hide');
                    this.CloseModal();
                    this.Buscar(this.page);
                }
            }).catch(error => {
                console.log(error)
                this.Load(form, 'off', null);

                let action = 'error';
                let title = 'Ops error !!';
                let message = 'No se pudo conectar con el servidor, por favor actualice la página.';

                this.Alert2(action, title, message);
            });
        },
        DeleteDetalle(form) {
            this.Load(form, 'on', 'Eliminando Registro ...');

            this.errors = [];
            axios.post('cargas/delete_detalle', {
                id: this.id,
            }).then(response=> {
                this.Load(form, 'off', null);

                let action = response.data.action;
                let title = response.data.title;
                let message = response.data.message;
                this.Alert2(action, title, message);

                if (action == 'success') {
                    $('#formularioModal').modal('hide');
                    this.CloseModalConfirm();
                    this.CloseModal();
                    this.Buscar(this.page);
                }
            }).catch(error => {
                console.log(error)
                this.Load(form, 'off', null);

                let action = 'error';
                let title = 'Ops error !!';
                let message = 'No se pudo conectar con el servidor, por favor actualice la página.';

                this.Alert2(action, title, message);
            });
        },
        Publicado(id, activo) {
            this.Load('my_table', 'on', 'Eliminando Registro ...');
            console.log(activo);

            axios.post('cargas/publicado', {
                id: id,
                estado: activo
            }).then(response=> {
                this.Load('my_table', 'off', null);

                let action = response.data.action;
                let title = response.data.title;
                let message = response.data.message;
                this.Alert2(action, title, message);

                if (action == 'success') {
                    $('#formularioModal').modal('hide');
                    this.Buscar(this.page);
                }
            }).catch(error => {
                console.log(error)
                this.Load('my_table', 'off', null);

                let action = 'error';
                let title = 'Ops error !!';
                let message = 'No se pudo conectar con el servidor, por favor actualice la página.';

                this.Alert2(action, title, message);
            });
        },
        BuscarGisaid(form) {
            this.Load(form, 'on', 'Cargando datos ...');

            axios.post('cargas/datos_gisaid?page='+this.page_load, {
                id: this.id
            }).then(response => {
                this.Load(form, 'off', null);
                this.gisaids = this.gisaids.concat(response.data.gisaids.data);
                this.page_load = response.data.gisaids.current_page+1;
                this.page_last_load = response.data.gisaids.last_page;
                console.log(this.gisaids);
            }).catch(error => {
                console.log(error)
                this.Load(form, 'off', null);
                let action = 'error';
                let title = 'Error !!';
                let message = 'No se pudo conectar con el servidor, por favor actualice la página.';
                this.Alert2(action, title, message);
            });
        },
        BuscarDetalle(form) {
            this.Load(form, 'on', 'Cargando datos ...');

            axios.post('cargas/datos_detalle?page='+this.page_load, {
                id: this.id
            }).then(response => {
                this.Load(form, 'off', null);
                this.detalles = this.detalles.concat(response.data.detalles.data);
                this.page_load = response.data.detalles.current_page+1;
                this.page_last_load = response.data.detalles.last_page;
            }).catch(error => {
                console.log(error)
                this.Load(form, 'off', null);
                let action = 'error';
                let title = 'Error !!';
                let message = 'No se pudo conectar con el servidor, por favor actualice la página.';
                this.Alert2(action, title, message);
            });
        },

        SelectVirus(data) {
            this.carga.virus = data.id;
            this.carga.virus_text = data.nombre;
        },
        SelectTipo(id, text) {
            this.carga.tipo = id;
            this.carga.tipo_text = text;
        },
        SelectMuestreo(data) {
            this.carga.muestreo = data.id;
            this.carga.muestreo_text = data.nombre;
        },
        ConfirmModal() {
            $("#confirmModal").modal('show');
        },
        CloseModalConfirm() {
            $("#confirmModal").modal('hide');
        },
        Tipo(data) {
            if (data == 1) {
                return 'GISAID';
            }
            return 'DETALLE';  
        },
        Fecha(date) {
            if (date) {
                let fecha = date.split('-');
                return fecha[2]+'-'+fecha[1]+'-'+fecha[0];
            }
            return '';
        },
        FechaHora(doc) {
            let date = new Date(doc);
            let day = this.zeroFill(date.getDate(), 2);
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let hour = date.getHours();
            let min = this.zeroFill(date.getMinutes(), 2);

            hour = this.zeroFill(hour, 2);

            if (month < 10) {
                return (`${day}/0${month}/${year} ${hour}:${min}`)
            } else {
                return (`${day}/${month}/${year} ${hour}:${min}`)
            }
        },
        zeroFill(number, width) {
            width -= number.toString().length;
            if (width > 0) {
                return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
            }
            return number + "";
        },

        //----------------- UPLOAD
        File(form) {
            this.errors = [];
            //this.Load(form, 'on', 'Cargando archivo ...');
            var file = event.target.files[0];
            this.carga.file = file;

            /*var formData  = new FormData();
            formData.append('file', file);
            axios.post('cargas/rows', formData).then(response=>{
                this.Load(form, 'off', null);

                var action = response.data.action;
                var title = response.data.title;
                var message = response.data.message;
                
                if (action == 'success') {
                    this.total_rows = response.data.rows.total;
                    this.carga.file = file;
                } else {
                    this.Alert2(action, title, message);
                }
            }).catch(error => {
                console.log(error);
                $('#file').val('');
                this.Load(form, 'off', null);

                if (error.response.status == 422) {
                    this.errors = error.response.data.errors;
                } else {
                    var action = 'error';
                    var title = 'Ops error !!';
                    var message = 'No se pudo conectar con el servidor, por favor actualice la página.';

                    this.Alert2(action, title, message);
                }
            });*/
        },
        Gisaid(form) {
            this.errors = [];
            this.Load(form, 'on', 'Importando datos espere ...');
            this.visible = false;

            var formData  = new FormData();
            formData.append('virus', this.carga.virus);
            formData.append('tipo', this.carga.tipo);
            formData.append('file', this.carga.file);
            formData.append('cantidad', this.total_rows);

            axios.post('cargas/gisaid', formData).then(response=>{
                this.Load(form, 'off', null);
                var action = response.data.action;
                var title = response.data.title;
                var message = response.data.message;
                
                if (action == 'success' || action == 'warning') {
                    this.finished = true;
                    this.importar.rows = response.data.import.total;
                    this.importar.rows_error = response.data.import.total_error;
                    this.importar.errors = response.data.import.errors;
                    if (response.data.log) {
                        this.importar.log_file = 'storage/'+response.data.log;
                    }
                    this.Buscar(this.page);

                    this.Alert2(action, title, message);
                } else {
                    this.Alert2(action, title, message);
                    this.visible = true;
                    this.carga.file = null;
                    $('#file').val('');
                }
            }).catch(error => {
                console.log(error);

                $('#file').val('');
                this.visible = true;
                this.Load(form, 'off', null);

                if (error.response.status == 422) {
                    this.errors = error.response.data.errors;
                } else {
                    var action = 'error';
                    var title = 'Ops error !!';
                    var message = 'No se pudo conectar con el servidor, por favor actualice la página.';

                    this.Alert2(action, title, message);
                }
            });
        },
        Detalle(form) {
            this.errors = [];
            this.Load(form, 'on', 'Importando datos espere ...');
            this.visible = false;

            console.log(this.carga.tipo);
            var formData  = new FormData();
            formData.append('id', this.id);
            formData.append('tipo', this.carga.tipo);
            formData.append('file', this.carga.file);
            formData.append('cantidad', this.total_rows);

            axios.post('cargas/detalle', formData).then(response=>{
                this.Load(form, 'off', null);
                var action = response.data.action;
                var title = response.data.title;
                var message = response.data.message;
                
                if (action == 'success' || action == 'warning') {
                    this.finished = true;
                    this.importar.rows = response.data.import.total;
                    this.importar.rows_error = response.data.import.total_error;
                    this.importar.errors = response.data.import.errors;
                    if (response.data.log) {
                        this.importar.log_file = 'storage/'+response.data.log;
                    }
                    this.Buscar(this.page);

                    this.Alert2(action, title, message);
                } else {
                    this.Alert2(action, title, message);
                    this.visible = true;
                    this.carga.file = null;
                    $('#file_det').val('');
                }
            }).catch(error => {
                console.log(error);

                $('#file_det').val('');
                this.visible = true;
                this.Load(form, 'off', null);

                if (error.response.status == 422) {
                    this.errors = error.response.data.errors;
                } else {
                    var action = 'error';
                    var title = 'Ops error !!';
                    var message = 'No se pudo conectar con el servidor, por favor actualice la página.';

                    this.Alert2(action, title, message);
                }
            });
        },
    }
});