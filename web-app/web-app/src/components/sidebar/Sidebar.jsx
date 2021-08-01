import "./sidebar.css"
import { LineStyle, Timeline, DataUsage } from '@material-ui/icons';
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTittle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <li className="sidebarListItem">
                                <LineStyle className="sidebarIcon"/>
                                Home
                            </li>
                        </Link>
                        <Link to="/analytics" style={{ textDecoration: 'none' }}>
                        <li className="sidebarListItem">
                            <Timeline className="sidebarIcon"/>
                            Analytics
                        </li>
                        </Link>
                        <Link to="/datalist" style={{ textDecoration: 'none' }}>
                        <li className="sidebarListItem">
                            <DataUsage className="sidebarIcon"/>
                            Data
                        </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    )
}
