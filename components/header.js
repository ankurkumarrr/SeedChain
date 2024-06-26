import React from "react";
import { Menu,Header } from "semantic-ui-react";

export default () => {
    return(
        <Menu>
            
            <Menu.Item>
            <Header as='h3' icon='block layout' content='SeedChain' />
            </Menu.Item>

        <Menu.Menu position="right">

            <Menu.Item>
            <Header as='h3' content='Campaigns' />
            </Menu.Item>

            <Menu.Item>
            <Header as='h3' icon='add' content='' />
            </Menu.Item>

        </Menu.Menu>
        </Menu>
    );
};