import React, { ReactElement, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    AppBar, 
    Toolbar, 
    Typography, 
    MenuItem, 
    Divider, 
    IconButton, 
    Drawer
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

export interface Props {
    title: string;
    routes?: Route[];
}

export interface Route {
    id: string;
    url: string;
    icon: ReactElement;
    label: string;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minHeight: '48px'
    },
    title: {
        flexGrow: 1
    },
    divider: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
    },
    menuButton: {
        marginRight: theme.spacing(2)
    }
}));

export default function Header(props: Props) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const classes = useStyles();

    const drawerToggle = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')) {
                return;
            }

        setDrawerOpen(open);
    }

    const menuItems = props.routes?.map((route: Route) => {
        return (
            <MenuItem
                key={route.id}
                component={Link}
                to={route.url}
                onClick={drawerToggle(false)}
            >
                <IconButton
                     edge="start"
                     className={classes.menuButton}
                     color="inherit"
                     aria-label="menu"
                     onClick={drawerToggle(true)}
                >
                    {route.icon}
                </IconButton>
                {route.label}
            </MenuItem>
        )
    })

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" className={classes.title}>
                        {props.title}
                    </Typography>
                    <Divider
                        orientation="vertical"
                        flexItem
                        className={classes.divider}
                    />
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                        onClick={drawerToggle(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <Drawer
                            id="navigation-drawer"
                            anchor="right"
                            open={drawerOpen}
                            onClose={drawerToggle(false)}
                        >
                            <MenuItem
                                key="home-menu-item"
                                component={Link}
                                to="/"
                                onClick={drawerToggle(false)}
                            >
                                <IconButton
                                    edge="start"
                                    className={classes.menuButton}
                                    color="inherit"
                                    aria-label="menu"
                                    onClick={drawerToggle(true)}>                                
                                        <HomeIcon />
                                </IconButton>
                                Home
                            </MenuItem>
                            {menuItems}
                        </Drawer>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}