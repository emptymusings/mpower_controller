import { Grid, InputLabel, Paper, Typography, CircularProgress } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Device } from '../dto/device';
import { makeStyles } from '@material-ui/core/styles';
import { getDeviceDetails } from '../services/device.service';
import { Relay } from '../dto/relay';

export interface Props {
    device?: Device;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '90%'
    },
    paper: {
        flexGrow: 1,
        margin: theme.spacing(1),
        padding: theme.spacing(2),
        borderRadius: '2',
        border: '2px solid',
        borderColor: 'darkblue',
        backgroundColor: 'lightblue'
    },
    host: {
        textAlign: 'right'
    }
}));

export default function DeviceDisplay(props: Props): JSX.Element {
    const [deviceDetails, setDeviceDetails] = useState<Device>();
    const [initialized, setInitialized] = useState(false);
    const classes = useStyles();

    function getDeviceDetailsFromService() {
        try {
            if (props.device) {
                getDeviceDetails(props.device?.host ?? '')
                    .then((result) => {
                        setDeviceDetails(result as Device);
                        setInitialized(true);
                    });
            }
        } catch (error) {
            console.error(error);
        }
    }

    function displayRelays() {
        if (initialized) {
            if (deviceDetails) {
                if (deviceDetails.relays.length > 0) {
                    return deviceDetails.relays.map((item: Relay) => (
                        <Grid container item>
                            <Grid item>
                                {item.label}
                            </Grid>
                        </Grid>
                    ))
                } else {
                    return <Grid item>No relays found</Grid>
                }
            } else {
                return <Grid item>Device details not found</Grid>
            }
        } else {
            return (
                <div>
                    <div>
                        <CircularProgress variant="indeterminate" color="secondary" />
                    </div>
                    <div>
                        Loading relays...
                    </div>
                </div>
            )
        }
    }

    useEffect(() => {
        if (!initialized) {
            getDeviceDetailsFromService();
        }
    })

    return (
        <Grid className={classes.root} container item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Paper className={classes.paper}>
                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid 
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                    >
                        <Typography variant="h5">
                            {props.device ? props.device.name : 'Not Set'}
                        </Typography>
                    </Grid>
                    <Grid 
                        item
                        xs={6}
                        sm={6}
                        md={6}
                        lg={6}
                    >
                        <Typography variant="overline">
                            <div className={classes.host}>{props.device ? props.device.host : 'Not Set'}</div>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} alignContent="flex-end">
                    <Grid item alignItems="flex-end">
                        {displayRelays()}
                    </Grid>
                </Grid>                    
            </Paper>
        </Grid>
    )
}