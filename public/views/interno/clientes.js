new Vue({
    el: '#form_clientes',
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
        },
        id: null,
        seleccion: [],
        errors: [],

        user: {
            'nombres': null,
            'telefono': null,
            'email': null,
            'password': null,
            'perfil': 6,
            'activo': 'S',
        },
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
            urlBuscar = 'clientes/buscar?page=' + page;
            axios.post(urlBuscar, {
                search: this.search.datos
            }).then(response => {
                this.listRequest = response.data.clientes.data;
                this.to_pagination = response.data.clientes.to;
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
                    break;

                case 'edit':
                    this.user.nombres = seleccion.nombres;
                    this.user.telefono = seleccion.telefono;
                    this.user.perfil = seleccion.perfil;
                    this.user.activo = seleccion.activo;
                    this.user.email = seleccion.email;
                    break;

                case 'delete':
                    this.user.nombres = seleccion.nombres;
                    break;
                    
                default:
                    this.user.nombres = seleccion.nombres;
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
            };
            this.id = null;
            this.seleccion = [];
            this.errors = [];

            this.user = {
                'nombres': null,
                'telefono': null,
                'email': null,
                'password': null,
                'perfil': 6,
                'activo': 'S',
            };
        },
        Store(form) {
            this.Load(form, 'on', 'Guardando Registro ...');

            this.errors = [];
            axios.post('clientes/store', {
                nombres: this.user.nombres,
                telefono: this.user.telefono,
                email: this.user.email,
                password: this.user.password,
                perfil: this.user.perfil,
                activo: this.user.activo
            }).then(response=> {
                this.Load(form, 'off', null);

                let action = response.data.action;
                let title = response.data.title;
                let message = response.data.message;
                this.Alert2(action, title, message)

                if (action == 'success') {
                    $('#formularioModal').modal('hide');
                    this.CloseModal();
                    this.Buscar(this.page);
                }
            }).catch(error => {
                console.log(error)
                this.Load(form, 'off', null);

                if (error.response.status == 422) {
                    this.errors = error.response.data.errors;
                } else {
                    let action = 'error';
                    let title = 'Ops error !!';
                    let message = 'No se pudo conectar con el servidor, por favor actualice la página.';

                    this.Alert2(action, title, message);
                }
            });
        },
        Update(form) {
            this.Load(form, 'on', 'Actualizando Registro ...');

            this.errors = [];
            axios.post('clientes/update', {
                id: this.id,
                nombres: this.user.nombres,
                telefono: this.user.telefono,
                email: this.user.email,
                password: this.user.password,
                perfil: this.user.perfil,
                activo: this.user.activo
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

                if (error.response.status == 422) {
                    this.errors = error.response.data.errors;
                } else {
                    let action = 'error';
                    let title = 'Ops error !!';
                    let message = 'No se pudo conectar con el servidor, por favor actualice la página.';

                    this.Alert2(action, title, message);
                }
            });
        },
        Delete(form) {
            this.Load(form, 'on', 'Eliminando Registro ...');

            this.errors = [];
            axios.post('clientes/delete', {
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
        Alta(form) {
            this.Load(form, 'on', 'Dando de Alta el Registro ...');

            this.errors = [];
            axios.post('clientes/alta', {
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
        Perfil(id) {
            switch (id) {
                case '6':
                    return "CLIENTE";
                    break;
                case '7':
                    return "MAYORISTA";
                    break;
            
                default:
                    return "OTROS";
                    break;
            }
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
    }
});