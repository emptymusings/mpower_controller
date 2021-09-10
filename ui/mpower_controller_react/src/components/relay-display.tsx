import React, { useState, useEffect } from 'react';
import { Relay } from '../dto/relay';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Switch, CircularProgress } from '@material-ui/core';
import { yellow } from '@material-ui/core/colors';
import { getRelayDetails, setRelayState } from '../services/device.service';

export interface Props {
    host: string;
    relay?: Relay;
    handlePowerChange?: () => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: theme.spacing(2)
    },
    details: {
        alignItems: 'center'
    },
    powerSwitch: {      
        textAlign: 'right',
        marginLeft: theme.spacing(5),  
        marginRight: theme.spacing(2),
        alignContent: 'right',
        color: yellow[300],
        '&$checked': {
            color: yellow[500]
        }
    },
    progress: {
        marginLeft: theme.spacing(7),
        marginRight: theme.spacing(2)
    },
    divider: {
        color: 'white'
    }
}));

export default function RelayDisplay(props: Props): JSX.Element {
    const classes = useStyles();
    const [relay, setRelay] = useState<Relay | undefined>(undefined);
    const [initialized, setInitialized] = useState(false);
    const [isPowerOn, setIsPowerOn] = useState(false);
    const [isPowerChanging, setIsPowerChanging] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [switchElement, setSwitchElement] = useState(<div></div>);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    if (props.relay &&
        props.relay.relay < 10 &&
        initialized === false) {
        setRelay(props.relay);
        setIsPowerOn(true);
        setInitialized(true);
    }

    function displayRelaySummary() {
        if (relay) {
            return (
                <Grid container className={classes.details}>
                    <Grid 
                        item 
                        xs={12} 
                        sm={12} 
                        md={12} 
                        lg={12} 
                        xl={12}>
                        {(relay.label.length > 0) ? relay.label : 'Label not set' }
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sm={6}
                        md={4}
                        lg={4}
                        xl={4}
                    >
                        {(parseFloat(relay.power.toString()).toFixed(2) ?? '0')} Watts
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        sm={6}
                        md={4}
                        lg={4}
                        xl={4}
                    >
                        {(parseFloat(relay.voltage.toString()).toFixed(2) ?? '0')} Volts
                    </Grid>
                    <Grid
                        container
                        item
                        xs={12}
                        sm={12}
                        md={4}
                        lg={4}
                        xl={4}
                        alignItems='flex-end'
                        alignContent='flex-end'
                    >
                        {switchElement}
                    </Grid>
                </Grid>
            )
        } else {
            return <div>Relay not set</div>
        }
    }
    
    useEffect(() => {
        const newDate = new Date();

        if (lastUpdated !== newDate) {
            getRelayDetails(props.host, (relay?.port ?? 0))
                .then((result) => {
                    setRelay(result as Relay);
                });

            setTimeout(() => setLastUpdated(new Date()), 30000);
        }
    }, [lastUpdated, props, relay])
    
    useEffect(() => {     
        function sendPowerChangeToService() {
            if (relay?.port) {
                setRelayState(props.host, relay.port, (isPowerOn ? 0 : 1))
                    .then((result) => {  
                        if (result) {
                            setIsPowerOn((result as Relay).relay === 1);
                            setIsPowerChanging(false);
                        }
                        
                        return result as Relay;
                    })
                    .then((r) => {
                        getRelayDetails(props.host, r.port)
                        .then((relayResult) => {
                            setRelay(relayResult as Relay)
                        });
                    });
            }
        }

        if (isPowerChanging === true) {
            setIsLoading(true);
            sendPowerChangeToService();
        } else {
            setIsLoading(false);
        }
    }, [isPowerChanging, props, isPowerOn, relay]);

    useEffect(() => {        
        function handlePowerChange(event: React.ChangeEvent) {
            if (props.handlePowerChange) {
                props.handlePowerChange();
            } else {
                setIsPowerChanging(true);
            }
        }

        function updateSwitch() {
            if (isLoading === true) {
                setSwitchElement(
                    <CircularProgress 
                        variant="indeterminate" 
                        className={classes.progress} 
                        size={35}
                    />
                );
            } else {
                setSwitchElement(<Switch
                    checked={isPowerOn}
                    onChange={handlePowerChange}
                    className={classes.powerSwitch}
                    color='primary'
                />);
            }
        }
        updateSwitch();
    }, [isLoading, classes, props, isPowerOn]);

    return (
       <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Grid container item>
                {displayRelaySummary()}            
            </Grid>
            <Grid container item>
                <small>Last updated: {lastUpdated.toLocaleString()}</small>
            </Grid>        
       </Grid>
    )
}