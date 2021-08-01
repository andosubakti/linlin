import React from 'react'
import "./topbar.css"
import { NotificationsNone, Settings } from '@material-ui/icons';

export default function Topbar() {
    return (
        <div className="topbar">
            <div className="topbarWrapper">
                <div className="topLeft">
                    <span className="logo">BlueBird Admin</span>
                </div>
                <div className="topRight">
                    <div className="topbarIconContainer">
                        <NotificationsNone/>
                        <span className="topIconBadge">2</span>
                    </div>
                    <div className="topbarIconContainer">
                        <Settings/>
                    </div>
                    <img src="https://ichef.bbci.co.uk/news/640/cpsprodpb/C023/production/_96878194_000933468-1.jpg" alt="" className="topAvatar" />
                </div>
            </div>
        </div>
    )
}
