export const MainNav = [
    {
        icon: 'pe-7s-graph2',
        label: 'Graficas',
        to: '#/dashboards/crm',
    },
    
];
export const InventarioNav = [
    {
        icon: 'pe-7s-shopbag',
        label: 'Productos',
        content: [
            {
                label: 'Productos',
                to: '#/productos',
            },
            {
                label: 'Categorias de Productos',
                to: '#/Categoria',

            },
            {
                label: 'Unidades de Medida',
                to: '#/UnidadesMedida',

            }
        ],
    },
    {
        icon: 'pe-7s-note2',
        label: 'Inventario',
        to: '#/Inventario',
    }

]
export const ComprasNav = [
    {
        icon: 'pe-7s-display2',
        label: 'Factura',
        to: '#/FacturaCompras',
    },
    {
        icon: 'pe-7s-box2',
        label: 'Proveedor',
        to: '#/Proveedor',
    }

]
export const VentasNav = [
    {
        icon: 'pe-7s-display2',
        label: 'Factura',
        to: '#/tables/regular-tables',
    },
    {
        icon: 'pe-7s-display2',
        label: 'Cliente',
        to: '#/tables/regular-tables',
    }

]
export const GeneralNav = [
    {
        icon: 'pe-7s-display2',
        label: 'Direcciones',
        to: '#/tables/regular-tables',
    },
    {
        icon: 'pe-7s-cash',
        label: 'Metodos de pagos',
        to: '#/MetodosPago',
    },
    {
        icon: 'pe-7s-albums',
        label: 'Catalogo de Impuestos',
        to: '#/Impuestos',
    }

]
export const AccesosNav = [
    {
        icon: 'pe-7s-display2',
        label: 'Usuarios',
        to: '#/tables/regular-tables',
    },
    {
        icon: 'pe-7s-display2',
        label: 'Accesos',
        to: '#/tables/regular-tables',
    }

]
export const ComponentsNav = [
    {
        icon: 'pe-7s-diamond',
        label: 'Elements',
        content: [
            {
                label: 'Standard Buttons',
                to: '#/elements/buttons-standard',
            },
            {
                label: 'Dropdowns',
                to: '#/elements/dropdowns',

            },
            {
                label: 'Icons',
                to: '#/elements/icons',
            },
            {
                label: 'Badges',
                to: '#/elements/badges-labels',
            },
            {
                label: 'Cards',
                to: '#/elements/cards',
            },
            {
                label: 'List Groups',
                to: '#/elements/list-group',
            },
            {
                label: 'Navigation Menus',
                to: '#/elements/navigation',
            },
            {
                label: 'Utilities',
                to: '#/elements/utilities',
            },
        ],
    },
    {
        icon: 'pe-7s-car',
        label: 'Components',
        content: [
            {
                label: 'Tabs',
                to: '#/components/tabs',
            },
            {
                label: 'Notifications',
                to: '#/components/notifications',
            },
            {
                label: 'Modals',
                to: '#/components/modals',
            },
            {
                label: 'Progress Bar',
                to: '#/components/progress-bar',
            },
            {
                label: 'Tooltips & Popovers',
                to: '#/components/tooltips-popovers',
            },
            {
                label: 'Carousel',
                to: '#/components/carousel',
            },
            {
                label: 'Maps',
                to: '#/components/maps',
            },
        ],
    },
    {
        icon: 'pe-7s-display2',
        label: 'Regular Tables',
        to: '#/tables/regular-tables',
    },
];
export const FormsNav = [
    {
        icon: 'pe-7s-light',
        label: 'Controls',
        to: '#/forms/controls',
    },
    {
        icon: 'pe-7s-eyedropper',
        label: 'Layouts',
        to: '#/forms/layouts',
    },
    {
        icon: 'pe-7s-pendrive',
        label: 'Validation',
        to: '#/forms/validation',
    },
    {
        icon: 'pe-7s-rocket',
        label: 'Prueba',
        to: '#/prueba',
    },
];
export const WidgetsNav = [
    {
        icon: 'pe-7s-graph2',
        label: 'Dashboard Boxes',
        to: '#/widgets/chart-boxes-3',
    },
];
export const ChartsNav = [
    {
        icon: 'pe-7s-graph2',
        label: 'ChartJS',
        to: '#/charts/chartjs',
    },
];