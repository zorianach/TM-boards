import css from './Layout.module.css'
import { Outlet } from 'react-router-dom'


export const Layout = () => {
    return (
        <div className={css.layout_box}>
					<Outlet />
        </div>
    )
};