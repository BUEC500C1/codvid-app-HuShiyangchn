import React,{ Component }from 'react';
import { StyleSheet, Text, View} from 'react-native'
import MapView, { Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import axios from 'axios';

export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            "MarkerList": [],
            "CountryList": [],
            position : {
                coords: {
                    latitude: 0,
                    longitude: 0
                }
            }
        };
    }


showmarker() {
    let countryList =['germany', 'niger', 'saint-lucia', 'benin', 'libya', 'zambia', 'dominica', 'netherlands-antilles', 'réunion', 'wallis-and-futuna-islands', 'zimbabwe', 'bulgaria', 'russia', 'sri-lanka', 'american-samoa', 'tunisia', 'comoros', 'cook-islands', 'greenland', 'iraq', 'paraguay', 'albania', 'antigua-and-barbuda', 'brunei', 'mauritania', 'aruba', 'egypt', 'israel', 'liechtenstein', 'venezuela', 'bahamas', 'botswana', 'costa-rica', 'kiribati', 'hungary', 'isle-of-man', 'mongolia', 'sao-tome-and-principe', 'british-virgin-islands', 'singapore', 'martinique', 'togo', 'ukraine', 'malta', 'new-caledonia', 'saint-vincent-and-the-grenadines', 'yemen', 'bouvet-island', 'cayman-islands', 'liberia', 'luxembourg', 'saint-pierre-and-miquelon', 'united-kingdom', 'french-guiana', 'heard-and-mcdonald-islands', 'oman', 'tajikistan', 'france', 'iceland', 'micronesia', 'syria', 'finland', 'gambia', 'honduras', 'kyrgyzstan', 'kosovo', 'congo-kinshasa', 'fiji', 'sudan', 'china', 'kenya', 'holy-see-vatican-city-state', 'lebanon', 'saint-helena', 'sweden', 'equatorial-guinea', 'macao-sar-china', 'poland', 'vietnam', 'burundi', 'el-salvador', 'portugal', 'solomon-islands', 'trinidad-and-tobago', 'bhutan', 'french-polynesia', 'guernsey', 'latvia', 'malawi', 'turkmenistan', 'australia', 'bolivia', 'brazil', 'gabon', 'afghanistan', 'djibouti', 'ghana', 'serbia', 'united-states', 'colombia', 'seychelles', 'swaziland', 'ireland', 'lao-pdr', 'moldova', 'argentina', 'cambodia', 'french-southern-territories', 'guam', 'lithuania', 'mali', 'tokelau', 'algeria', 'denmark', 'japan', 'kazakhstan', 'slovakia', 'christmas-island', 'papua-new-guinea', 'tanzania', 'antarctica', 'bermuda', 'gibraltar', 'haiti', 'india', 'montenegro', 'korea-south', 'macedonia', 'british-indian-ocean-territory', 'malaysia', 'mauritius', 'pitcairn', 'uruguay', 'vanuatu', 'belgium', 'guinea-bissau', 'monaco', 'nepal', 'azerbaijan', 'guinea', 'korea-north', 'netherlands', 'philippines', 'belarus', 'jamaica', 'peru', 'switzerland', 'bangladesh', 'guyana', 'marshall-islands', 'montserrat', 'namibia', 'rwanda', 'turkey', 'united-arab-emirates', 'western-sahara', 'belize', 'saudi-arabia', 'suriname', 'cyprus', 'palestine', 'saint-barthélemy', 'tonga', 'central-african-republic', 'estonia', 'new-zealand', 'panama', 'sierra-leone', 'cape-verde', 'grenada', 'madagascar', 'mozambique', 'norway', 'angola', 'anguilla', 'czech-republic', 'puerto-rico', 'senegal', 'spain', 'turks-and-caicos-islands', 'dominican-republic', 'ethiopia', 'maldives', 'mexico', 'morocco', 'pakistan', 'palau', 'samoa', 'ecuador', 'iran', 'nicaragua', 'somalia', 'bosnia-and-herzegovina', 'hong-kong-sar-china', 'indonesia', 'uganda', 'uzbekistan', 'croatia', 'guatemala', 'svalbard-and-jan-mayen-islands', 'barbados', 'lesotho', 'georgia', 'nauru', 'northern-mariana-islands', 'burkina-faso', 'kuwait', 'eritrea', 'greece', 'cameroon', 'italy', 'south-sudan', 'romania', 'guadeloupe', 'norfolk-island', 'slovenia', 'thailand', 'niue', 'jersey', 'jordan', 'taiwan', 'timor-leste', 'us-minor-outlying-islands', 'chile', 'faroe-islands', 'tuvalu', 'ala-aland-islands', 'cocos-keeling-islands', 'congo-brazzaville', 'cuba', 'qatar', 'saint-kitts-and-nevis', 'south-georgia-and-the-south-sandwich-islands', 'bahrain', 'myanmar', 'saint-martin-french-part', 'san-marino', 'south-africa', 'armenia', 'falkland-islands-malvinas', 'nigeria', 'andorra', 'austria', 'canada', 'chad', 'cote-divoire', 'mayotte', 'virgin-islands'];

    let countryList =this.state.CountryList;
    //console.log(typeof(countryList));
     for (var i = 0; i < countryList.length; i++) {
        try {
            var url = "https://api.covid19api.com/live/country/" + countryList[i];

            const requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            await fetch(url,requestOptions)
                .then(response =>response.json())
                //.then(result => console.log(result))

                .then(responseJson => {
                    //this.setState(
                    if(responseJson.length != 0) {

                        const last = responseJson.length - 1;
                        //console.log(responseJson[last]);
                        console.log(url);
                        console.log(Number(responseJson[last]["Lat"]));
                        data.push(
                            <Marker
                                coordinate={{
                                    latitude: Number(responseJson[last]["Lat"]),
                                    longitude: Number(responseJson[last]["Lon"])
                                }}
                            >
                            </Marker>
                        );
                    }
                });
        } catch (error) {
            console.log( error);
        }
    }

    this.setState({
        MarkerList: data
    });
}
componentDidMount()
{
    this.showmarker();
}

render()
{
    const marker = this.state.MarkerList;
    return (
        <View>
            <MapView
                style={styles.map}
                region={{
                    latitude: 42.3505,
                    longitude: -71.1054,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.042
                }}
            >
                {marker}
            </MapView>
        </View>
    );
}
}

const styles = StyleSheet.create ({
map:{
    width: "100%",
    height: "100%"
},
markerTextBold:{
    fontWeight: "bold",
    color: '#000000',
},
markerText:{
    color: '#000000',
},
markerNum:{
    color: '#000000',
},

})