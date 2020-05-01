import React,{ Component }from 'react';
import { StyleSheet, Text, View} from 'react-native'
import MapView, { Marker,Callout } from 'react-native-maps';

export default class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "MarkerList": [],
            "CountryList": []
        }
    }
    rendermarker(){
        this.showmarker();
    }

    async showmarker() {
        let countryList =['germany', 'niger', 'saint-lucia', 'benin', 'libya', 'zambia', 'dominica', 'netherlands-antilles', 'réunion', 'wallis-and-futuna-islands', 'zimbabwe', 'bulgaria', 'russia', 'sri-lanka', 'american-samoa', 'tunisia', 'comoros', 'cook-islands', 'greenland', 'iraq', 'paraguay', 'albania', 'antigua-and-barbuda', 'brunei', 'mauritania', 'aruba', 'egypt', 'israel', 'liechtenstein', 'venezuela', 'bahamas', 'botswana', 'costa-rica', 'kiribati', 'hungary', 'isle-of-man', 'mongolia', 'sao-tome-and-principe', 'british-virgin-islands', 'singapore', 'martinique', 'togo', 'ukraine', 'malta', 'new-caledonia', 'saint-vincent-and-the-grenadines', 'yemen', 'bouvet-island', 'cayman-islands', 'liberia', 'luxembourg', 'saint-pierre-and-miquelon', 'united-kingdom', 'french-guiana', 'heard-and-mcdonald-islands', 'oman', 'tajikistan', 'france', 'iceland', 'micronesia', 'syria', 'finland', 'gambia', 'honduras', 'kyrgyzstan', 'kosovo', 'congo-kinshasa', 'fiji', 'sudan', 'china', 'kenya', 'holy-see-vatican-city-state', 'lebanon', 'saint-helena', 'sweden', 'equatorial-guinea', 'macao-sar-china', 'poland', 'vietnam', 'burundi', 'el-salvador', 'portugal', 'solomon-islands', 'trinidad-and-tobago', 'bhutan', 'french-polynesia', 'guernsey', 'latvia', 'malawi', 'turkmenistan', 'australia', 'bolivia', 'brazil', 'gabon', 'afghanistan', 'djibouti', 'ghana', 'serbia', 'united-states', 'colombia', 'seychelles', 'swaziland', 'ireland', 'lao-pdr', 'moldova', 'argentina', 'cambodia', 'french-southern-territories', 'guam', 'lithuania', 'mali', 'tokelau', 'algeria', 'denmark', 'japan', 'kazakhstan', 'slovakia', 'christmas-island', 'papua-new-guinea', 'tanzania', 'antarctica', 'bermuda', 'gibraltar', 'haiti', 'india', 'montenegro', 'korea-south', 'macedonia', 'british-indian-ocean-territory', 'malaysia', 'mauritius', 'pitcairn', 'uruguay', 'vanuatu', 'belgium', 'guinea-bissau', 'monaco', 'nepal', 'azerbaijan', 'guinea', 'korea-north', 'netherlands', 'philippines', 'belarus', 'jamaica', 'peru', 'switzerland', 'bangladesh', 'guyana', 'marshall-islands', 'montserrat', 'namibia', 'rwanda', 'turkey', 'united-arab-emirates', 'western-sahara', 'belize', 'saudi-arabia', 'suriname', 'cyprus', 'palestine', 'saint-barthélemy', 'tonga', 'central-african-republic', 'estonia', 'new-zealand', 'panama', 'sierra-leone', 'cape-verde', 'grenada', 'madagascar', 'mozambique', 'norway', 'angola', 'anguilla', 'czech-republic', 'puerto-rico', 'senegal', 'spain', 'turks-and-caicos-islands', 'dominican-republic', 'ethiopia', 'maldives', 'mexico', 'morocco', 'pakistan', 'palau', 'samoa', 'ecuador', 'iran', 'nicaragua', 'somalia', 'bosnia-and-herzegovina', 'hong-kong-sar-china', 'indonesia', 'uganda', 'uzbekistan', 'croatia', 'guatemala', 'svalbard-and-jan-mayen-islands', 'barbados', 'lesotho', 'georgia', 'nauru', 'northern-mariana-islands', 'burkina-faso', 'kuwait', 'eritrea', 'greece', 'cameroon', 'italy', 'south-sudan', 'romania', 'guadeloupe', 'norfolk-island', 'slovenia', 'thailand', 'niue', 'jersey', 'jordan', 'taiwan', 'timor-leste', 'us-minor-outlying-islands', 'chile', 'faroe-islands', 'tuvalu', 'ala-aland-islands', 'cocos-keeling-islands', 'congo-brazzaville', 'cuba', 'qatar', 'saint-kitts-and-nevis', 'south-georgia-and-the-south-sandwich-islands', 'bahrain', 'myanmar', 'saint-martin-french-part', 'san-marino', 'south-africa', 'armenia', 'falkland-islands-malvinas', 'nigeria', 'andorra', 'austria', 'canada', 'chad', 'cote-divoire', 'mayotte', 'virgin-islands'];
        //console.log(typeof(countryList));
        var data =[];
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

                    .then(json => {
                        //this.setState(
                        if(json.length != 0) {

                            var last = json.length - 1;
                            //console.log(json[last]);
                            //console.log(url);
                            //console.log(Number(json[last]["Lat"]));
                            data.push(
                                <Marker
                                    coordinate={{
                                        latitude: Number(json[last]["Lat"]),
                                        longitude: Number(json[last]["Lon"])
                                    }}
                                >
                                    <Callout>
                                        <Text style={styles.textBold}>{json[last]["Country"]} Current Situation</Text>
                                        <Text style={styles.text}>Confirmed:<Text
                                            style={styles.number}> {json[last]["Confirmed"]}</Text></Text>
                                        <Text style={styles.text}>Deaths:<Text
                                            style={styles.number}> {json[last]["Deaths"]}</Text></Text>
                                        <Text style={styles.text}>Recovered:<Text
                                            style={styles.number}> {json[last]["Recovered"]}</Text></Text>
                                        <Text style={styles.text}>Active:<Text
                                            style={styles.number}> {json[last]["Active"]}</Text></Text>
                                    </Callout>
                                </Marker>
                            );
                        }
                    });
            } catch (error) {
                console.log( error);
            }
        }
        //console.log(data);
        this.setState({
            MarkerList: data
        });
    }
    componentDidMount()
    {
        this.rendermarker();
    }

    render() {
        const marker = this.state.MarkerList;
        console.log(marker);
        return (
        <View>
                <MapView
                    style={styles.map}
                    region={{
                        zoom: 2,
                        latitude: 33.86,
                        longitude: -80.95,
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
    textBold:{
        fontWeight: "bold",
        color: '#000000',
    },
    text:{
        color: '#000000',
    },
    number:{
        color: '#000000',
    },

})