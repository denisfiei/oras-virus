new Vue({
    el: '#form_linajes',
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

        linajes: [],
        carga: {
            'archivo': null,
            'file': null
        },

        // UPLOAD
        visible: true,
        importar: {
            'rows': 0,
            'rows_error': 0,
            'errors': [],
        },
        finished: false,
        total_rows: 0,
    },
    created() {
        this.Buscar();
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
            }
        },
        Buscar(page) {
            urlBuscar = 'linajes/buscar?page=' + page;
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
                    this.modal.title = 'CARGA DE LINAJES';
                    break;

                case 'delete':
                    this.modal.title = 'ELIMINAR CARGA DE LINAJES';
                    this.carga.archivo = seleccion.archivo;
                    break;
                    
                default:
                    this.modal.title = 'LISTA DE LINAJES';
                    this.carga.archivo = seleccion.archivo;
                    this.Carga(metodo);
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

            this.linajes = [];
            this.linaje = {
                'codigo': null,
                'nombre': null,
                'clade': null
            };
        },
        Delete(form) {
            this.Load(form, 'on', 'Eliminando Registro ...');

            this.errors = [];
            axios.post('linajes/delete', {
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
        Carga(form) {
            if ( $.fn.DataTable.isDataTable('#table_linajes') ) {
                $('#table_linajes').DataTable().clear().destroy();
            }
            this.Load(form, 'on', 'Cargando datos ...');

            axios.post('linajes/carga', {
                id: this.id
            }).then(response => {
                this.linajes = response.data;
                setTimeout(() => {
                    $('#table_linajes').DataTable(); 
                    this.Load(form, 'off', null);
                }, 300);
            }).catch(error => {
                console.log(error)
                this.Load(form, 'off', null);
                let action = 'error';
                let title = 'Error !!';
                let message = 'No se pudo conectar con el servidor, por favor actualice la página.';
                this.Alert2(action, title, message);
            });
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
            this.Load(form, 'on', 'Cargando archivo ...');
            var file = event.target.files[0];

            var formData  = new FormData();
            formData.append('file', file);
            axios.post('linajes/rows', formData).then(response=>{
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
            });
        },
        Importar(form) {
            this.errors = [];
            this.Load(form, 'on', 'Importando datos espere ...');
            this.visible = false;

            var formData  = new FormData();
            formData.append('file', this.carga.file);
            formData.append('cantidad', this.total_rows);

            axios.post('linajes/import', formData).then(response=>{
                this.Load(form, 'off', null);
                var action = response.data.action;
                var title = response.data.title;
                var message = response.data.message;
                
                if (action == 'success') {
                    this.finished = true;
                    this.importar.rows = response.data.import.total;
                    this.importar.rows_error = response.data.import.total_error;
                    this.importar.errors = response.data.import.errors;
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
    }
});

//var searchBox_3 = document.getElementById("search_linaje");

/*searchBox_3.addEventListener("keyup",function(){
    var keyword = this.value;
    if (keyword.length >= 3) {
        $(".a_load").show();

        keyword = keyword.toUpperCase();
        var table_3 = document.getElementById("table_linajes");
        var all_tr = table_3.getElementsByTagName("tr");
        for(var i=0; i<all_tr.length; i++){
            var code_column = all_tr[i].getElementsByTagName("td")[1];
            var name_column = all_tr[i].getElementsByTagName("td")[2];
            var clade_column = all_tr[i].getElementsByTagName("td")[3];
            if(code_column && name_column && clade_column){
                var code_value = code_column.textContent || code_column.innerText;
                var name_value = name_column.textContent || name_column.innerText;
                var clade_value = clade_column.textContent || clade_column.innerText;
                code_value = code_value.toUpperCase();
                name_value = name_value.toUpperCase();
                clade_value = clade_value.toUpperCase();
                if((name_value.indexOf(keyword) > -1) || (code_value.indexOf(keyword) > -1)  || (clade_value.indexOf(keyword) > -1)){
                    all_tr[i].style.display = ""; // show
                }else{
                    all_tr[i].style.display = "none"; // hide
                }
            }
            if(i === (all_tr.length-1)) {
                $(".a_load").hide();
            }
        }
    }
});*/