@php
    $config_cache = Cache::get('config_cache');
    $menus = Cache::get('menu_rol_'.Auth::user()->rol_id);
@endphp

<aside class="aside aside-fixed">
    <div class="aside-header">
        <a href="{{ url('/') }}" class="aside-logo">
            @if ($config_cache->logo)
                <img src="{{ 'storage/'.$config_cache->logo }}" alt="Logo Sistema" style="max-width: 170px; max-height: 45px;">
            @else
                ORAS-<span>APP</span>
            @endif
        </a>
        <a href="" class="aside-menu-link">
            <i data-feather="menu"></i>
            <i data-feather="x"></i>
        </a>
    </div>
    <div class="aside-body">
        <div class="aside-loggedin">
            <div class="d-flex align-items-center justify-content-start">
                <a href="#" class="avatar"><img src="{{asset('auth.svg')}}" class="rounded-circle" alt="User"></a>
                <div class="aside-alert-link">
                    {{-- <a href="" class="new" data-bs-toggle="tooltip" title="You have 2 unread messages"><i data-feather="message-square"></i></a>
                    <a href="" class="new" data-bs-toggle="tooltip" title="You have 4 new notifications"><i data-feather="bell"></i></a> --}}
                    <a href="{{ route('logout') }}" data-bs-toggle="tooltip" title="Cerrar Sesión" onclick="event.preventDefault();
                    document.getElementById('logout-form').submit();"><i class="text-danger" data-feather="log-out"></i></a>

                    <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                        @csrf
                    </form>
                </div>
            </div>
            <div class="aside-loggedin-user">
                <a href="#loggedinMenu" class="d-flex align-items-center justify-content-between mg-b-2" data-bs-toggle="collapse">
                    <h6 class="tx-semibold text_recortar mg-b-0">{{ Auth::user()->nombres }}</h6>
                    <i data-feather="chevron-down"></i>
                </a>
                <p class="tx-color-03 tx-12 mg-b-0">{{ Auth::user()->rol->nombre }}</p>
            </div>
            <div class="collapse" id="loggedinMenu">
                <ul class="nav nav-aside mg-b-0">
                    <li class="nav-item"><a href="{{ route('perfil') }}" class="nav-link"><i data-feather="edit"></i> <span>Editar Perfil</span></a></li>
                    <li class="nav-item"><a href="{{ route('logout') }}" onclick="event.preventDefault();document.getElementById('logout-form').submit();" 
                        class="nav-link text-danger"><i class="text-danger" data-feather="log-out"></i> <span>Cerrar Sesión</span></a></li>
                </ul>
            </div>
        </div>
        <ul class="nav nav-aside">
            <li class="nav-item {{(request()->is('home')) ? 'active' : ''}}"><a href="{{ url('home') }}" class="nav-link"><i class="far fa-home-lg"></i> <span>Inicio</span></a></li>
            <li class="nav-item"><a href="{{ url('/') }}" class="nav-link"><i class="fas fa-desktop"></i> <span>Web</span></a></li>
            
            @if ( count($menus['administrativos']) > 0 )
                <li class="nav-label mg-t-25">MENU DE ADMINISTRATIVO</li>
                @foreach ($menus['administrativos'] as $item)
                    <li class="nav-item {{(request()->is($item->url)) ? 'active' : ''}}"><a href="{{ route($item->route) }}" class="nav-link"><i class="{{$item->icono}}"></i> <span>{{$item->nombre}}</span></a></li>
                @endforeach
            @endif
            {{-- <li class="nav-item {{(request()->is('paises')) ? 'active' : ''}}"><a href="{{ route('paises') }}" class="nav-link"><i class="fas fa-globe-americas"></i> <span>Paises</span></a></li> --}}
            {{-- <li class="nav-item {{(request()->is('laboratorios')) ? 'active' : ''}}"><a href="{{ route('laboratorios') }}" class="nav-link"><i class="fas fa-flask"></i> <span>Laboratorios</span></a></li>
            <li class="nav-item {{(request()->is('centros')) ? 'active' : ''}}"><a href="{{ route('centros') }}" class="nav-link"><i class="fas fa-university"></i> <span>Centros de Información</span></a></li>
            <li class="nav-item {{(request()->is('muestreos')) ? 'active' : ''}}"><a href="{{ route('muestreos') }}" class="nav-link"><i class="fas fa-layer-group"></i> <span>Tipos de Muestreo</span></a></li>
            <li class="nav-item {{(request()->is('recursos')) ? 'active' : ''}}"><a href="{{ route('recursos') }}" class="nav-link"><i class="far fa-file-alt"></i> <span>Recursos</span></a></li> --}}
            
            @if ( count($menus['operativos']) > 0 )
                <li class="nav-label mg-t-25">MENU OPERATIVO</li>
                @foreach ($menus['operativos'] as $item)
                    <li class="nav-item {{(request()->is($item->url)) ? 'active' : ''}}"><a href="{{ route($item->route) }}" class="nav-link"><i class="{{$item->icono}}"></i> <span>{{$item->nombre}}</span></a></li>
                @endforeach
            @endif
            {{-- <li class="nav-item {{(request()->is('virus')) ? 'active' : ''}}"><a href="{{ route('virus') }}" class="nav-link"><i class="fas fa-virus"></i> <span>Virus</span></a></li>
            <li class="nav-item {{(request()->is('linajes')) ? 'active' : ''}}"><a href="{{ route('linajes') }}" class="nav-link"><i class="fas fa-bezier-curve"></i> <span>Linajes</span></a></li>
            <li class="nav-item {{(request()->is('cargas')) ? 'active' : ''}}"><a href="{{ route('cargas') }}" class="nav-link"><i class="fas fa-file-upload"></i> <span>Carga de Datos</span></a></li> --}}

            @if ( count($menus['sistemas']) > 0 )
                <li class="nav-label mg-t-25">MENU DE SISTEMA</li>
                @foreach ($menus['sistemas'] as $item)
                    <li class="nav-item {{(request()->is($item->url)) ? 'active' : ''}}"><a href="{{ route($item->route) }}" class="nav-link"><i class="{{$item->icono}}"></i> <span>{{$item->nombre}}</span></a></li>
                @endforeach
            @endif
            {{-- <li class="nav-item {{(request()->is('menus')) ? 'active' : ''}}"><a href="{{ route('menus') }}" class="nav-link"><i class="fas fa-th-list"></i> <span>Menus</span></a></li>
            <li class="nav-item {{(request()->is('roles')) ? 'active' : ''}}"><a href="{{ route('roles') }}" class="nav-link"><i class="fas fa-tasks"></i> <span>Roles</span></a></li>
            <li class="nav-item {{(request()->is('users')) ? 'active' : ''}}"><a href="{{ route('users') }}" class="nav-link"><i class="fas fa-users"></i> <span>Usuarios</span></a></li>
            <li class="nav-item {{(request()->is('avisos')) ? 'active' : ''}}"><a href="{{ route('avisos') }}" class="nav-link"><i class="far fa-comment-alt"></i> <span>Avisos</span></a></li>
            <li class="nav-item {{(request()->is('config')) ? 'active' : ''}}"><a href="{{ route('config') }}" class="nav-link"><i class="fas fa-cog"></i> <span>Datos de configuración</span></a></li> --}}
            {{-- <li class="nav-item with-sub">
                <a href="" class="nav-link"><i data-feather="user"></i> <span>Usuarios</span></a>
                <ul>
                    <li><a href="page-profile-view.html">View Profile</a></li>
                    <li><a href="page-connections.html">Connections</a></li>
                    <li><a href="page-groups.html">Groups</a></li>
                    <li><a href="page-events.html">Events</a></li>
                </ul>
            </li> --}}
        </ul>
    </div>
</aside>