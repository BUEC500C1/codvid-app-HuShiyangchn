import { StyleSheet, TouchableOpacity, Text, View, styles} from 'react-native'
import React,{ Component }from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker, Callout  } from 'react-native-maps';

export default class Map extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "jsondata":{},
            "CountryList" :[],

        };
    }
    componentDidMount() {
        const data=[];
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        return fetch("https://api.covid19api.com/country/united-states?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z", requestOptions)
            .then(response => response.json())
            //.then(result => console.log(result))
            .then(json =>{
                this.setState(
                    data.push(json)
                );
            })
            .catch(error => {console.log('error', error)});
    }

render(){
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
                <Marker
                    coordinate = {{latitude: 47, longitude: 8}}
                >
                    <Callout>
                        <Text style = {styles.text}>Switzerland</Text>
                        <Text style = {styles.text}>Total Confirmed:{this.state.totalCHCases}</Text>
                        <Text style = {styles.text}>Total Recovered:{this.state.totalCHRecovered}</Text>
                        <Text style = {styles.text}>Total Deaths:{this.state.totalCHDeaths}</Text>
                    </Callout>
                </Marker>
            </MapView>
        </View>
    );
 }
}
