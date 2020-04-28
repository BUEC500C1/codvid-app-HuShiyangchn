import React,{ Component }from 'react';
import { StyleSheet, Text, View} from 'react-native'
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "MarkerList": [],
            "CountryList": [],

        };
    }

    async display_marker() {
        const data = [];
        for (var i = 0; i < 20; i++) {
            try {
                const requestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                };
                await fetch("https://api.covid19api.com/country/united-states", requestOptions)
                    .then(response => response.text())
                    //.then(result => console.log(result))
                    .then(json => {
                        //this.setState(
                        const last = json.length - 1;
                        console.log(json)
                        data.push(<Marker
                                coordinate={{
                                    latitude: Number(json[last]["Lat"]),
                                    longitude: Number(json[last]["Lon"])
                                }}
                            >
                            </Marker>
                        );
                    })
            } catch (error) {
                console.log('error', error);
            }
        }

        this.setState({
            MarkerList: data
        });
    }
    componentDidMount()
    {
        this.display_marker();

    }

    render()
    {
        const marker = this.state.MarkerList;
        return (
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                    style={styles.map}
                    region={{
                        latitude: 42.3505,
                        longitude: -71.1054,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.042
                    }}
                >
                    <View style={styles.container}>

                    </View>
                    {marker}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        //alignItems: 'center',
        marginTop: 50,
        padding: 20,
    },
    text: {
        fontWeight: "bold",
        marginTop: 70,
        color: '#0cbb48',
    },
    textBold: {
        fontWeight: "bold",
        fontSize:20,
        color: '#3036bb',

    },
    textNum: {
        fontWeight: "bold",
        color: '#bb251b',

    },
    map:{
        width: "100%",
        height: "100%"
    },
    markerTextBold:{
        fontWeight: "bold",
        color: '#3036bb',
    },
    markerText:{
        color: '#0cbb48',
    },
    markerNum:{
        color: '#bb251b',
    },

})