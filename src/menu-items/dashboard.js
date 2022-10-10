// assets
import { DashboardOutlined, FormOutlined } from '@ant-design/icons';

// icons
const icons = {
    DashboardOutlined,
    FormOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'group-dashboard',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.DashboardOutlined,
            breadcrumbs: false
        },
        {
            id: 'form',
            title: 'Form',
            type: 'item',
            url: '/dashboard/form',
            icon: icons.FormOutlined,
            breadcrumbs: false
        }
    ]
};

export default dashboard;
