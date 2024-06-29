import React from "react";
import { Menu,Header } from "semantic-ui-react";

export default () => {
    return(
        <Menu style={{marginTop: '10px'}}>
            
            <Menu.Item>
            SeedChain
            </Menu.Item>

        <Menu.Menu position="right">

            <Menu.Item>
            Campaigns
            </Menu.Item>

            <Menu.Item>
            +
            </Menu.Item>

        </Menu.Menu>
        </Menu>
    );
};