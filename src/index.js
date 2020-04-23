
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default class App extends Component {
    state={
        data:[]
    }
    componentWillMount(){
        this.fetchData();
    }
    fetchData =async()=>{
        const response = await fetch("https://api.covid19api.com/country/united-states/status/confirmed");
        const json = await response.json();
        this.setState(({data:json.result}))
    }

    render() {
        return (
            <View style={style.container}>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(x,i)=>i}
                    renderItem ={({item})=>
                <Text>
                    {'${item.name.first} ${item.name.last}'}
                </Text>
                    }
             />
            </View>
        );
    }
}
const style = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#F5FCFF"
    }
});

