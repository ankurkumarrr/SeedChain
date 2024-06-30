import React from "react";
import { Menu,Header } from "semantic-ui-react";
import { Link } from '../routes';

export default () => {
    return(
        <Menu style={{marginTop: '10px'}}>
            
            <Link href="/" className="item">
                SeedChain
            </Link>

        <Menu.Menu position="right">

            <Link href="/" className="item">
                Campaigns
            </Link>

            <Link href="/campaigns/new" className="item">
                +
            </Link>

        </Menu.Menu>
        </Menu>
    );
};