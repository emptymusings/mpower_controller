import { makeStyles } from "@material-ui/core";
import React from 'react';

export const commonStyles = () => makeStyles((theme) => ({
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