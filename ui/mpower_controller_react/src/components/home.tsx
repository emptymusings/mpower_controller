import React, { SyntheticEvent, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { Device } from '../dto/device';
import { getDeviceList } from '../services/device.service';
import { useEffect } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar, CircularProgress, Typography } from '@material-ui/core';
import DeviceDisplay from './device-display';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    }
}));

export default function Home() {
    const classes = useStyles();
    const [deviceList, setDeviceList] = useState<Device[] | undefined>([]);
    const [initialized, setInitialized] = useState(false);
    const [toastSuccessOpen, setToastSuccessOpen] = useState(false);
    const [toastErrorMessage, setToastErrorMessage] = useState(<div>Operation Failed!</div>);
    const [toastErrorOpen, setToastErrorOpen] = useState(false);
    const [showLoading, setShowLoading] = useState(true);

    function handleToastSuccessClose(event?: SyntheticEvent, reason?: string) {
        if (reason === 'clickaway') {
            return;
        }

        setToastSuccessOpen(false);
    }

    function handleToastErrorClose(event?: SyntheticEvent, reason?: string) {
        if (reason === 'clickaway') {
            return;
        }

        setToastErrorOpen(false);
    }

    function getDeviceListFromService() {
        try {
            getDeviceList()
                .then((results) => {
                    setDeviceList(results as Device[]);
                    setInitialized(true); 
                })
                .catch((error) => {
                    setToastErrorMessage(<div>{error}</div>);
                    setToastErrorOpen(true);
                });
        } catch {
            setToastErrorMessage(<div>Failed to load Devices</div>);
            setToastErrorOpen(true);
        }
    }

    function displayDevices() {
        if (deviceList !== undefined && initialized) {            
            if (deviceList.length > 0) {
                return deviceList.map((item: Device) => (
                    <Grid
                        key={item.host}
                        container
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={3}
                        xl={3}
                    >
                        <DeviceDisplay device={item} />
                    </Grid>
                ));
            } else {
                return <Grid item>No devices found</Grid>
            }
        }
        
        return (
            <div>
                <div>
                    <CircularProgress variant="indeterminate" />
                </div>
                <div>                
                    Loading devices...
                </div>
            </div>
        )
    }

    useEffect(() => {
        if (!initialized) {
            getDeviceListFromService();
        }
    });

    useEffect(() => {        
        if (deviceList !== undefined) {
            setShowLoading(false);
        }
    }, [deviceList]);

    return (
        <Grid container className={classes.root} item xs={12} md={12} lg={12} xl={12}>
            <Grid container item xs={12} sm={12} md={12} lg={10} xl={10}>
                <Typography variant="h4">
                    Devices
                </Typography>
                <Grid container item>
                    <Grid container item>
                        {displayDevices()}
                    </Grid>                    
                </Grid>
            </Grid>
            <Snackbar
                open={toastErrorOpen}
                autoHideDuration={6000}
                onClose={handleToastErrorClose}                
            >
                <MuiAlert
                    severity="success"
                    onClose={handleToastErrorClose}
                >
                    {toastErrorMessage}
                </MuiAlert>
            </Snackbar>
        </Grid>
    )
}