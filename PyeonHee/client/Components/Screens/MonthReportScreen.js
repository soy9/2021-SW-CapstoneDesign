import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import config from '../../config'
import { StackedBarChart } from 'react-native-chart-kit';
import { SafeAreaView, StyleSheet, Text, View, Button, ScrollView, } from 'react-native';

const url = config.url;
const AssetCounseling = ({navigation}) => {
    const [userID, setUserID] = useState('');

    const [currentRent, setCurrentRent] = useState(200000);
    const [currentInsurance, setCurrentInsurance] = useState(100000);
    const [currentCommunication, setCurrentCommunication] = useState(100000);
    const [currentSubscribe, setCurrentSubscribe] = useState(50000);

    const [currentTraffic, setCurrentTraffic] = useState(100000);
    const [currentMedical, setCurrentMedical] = useState(120000);
    const [currentEducation, setCurrentEducation] = useState(100000);

    const [currentShopping, setCurrentShopping] = useState(300000);
    const [currentHobby, setCurrentHobby] = useState(150000);
    const [currentEvent, setCurrentEvent] = useState(210000);
    const [currentEct, setCurrentEct] = useState(100000);

    const [lastRent, setLastRent] = useState(200000);
    const [lastInsurance, setLastInsurance] = useState(100000);
    const [lastCommunication, setLastCommunication] = useState(120000);
    const [lastSubscribe, setLastSubscribe] = useState(40000);

    const [lastTraffic, setLastTraffic] = useState(130000);
    const [lastMedical, setLastMedical] = useState(150000);
    const [lastEducation, setLastEducation] = useState(90000);

    const [lastShopping, setLastShopping] = useState(210000);
    const [lastHobby, setLastHobby] = useState(150000);
    const [lastEvent, setLastEvent] = useState(280000);
    const [lastEct, setLastEct] = useState(60000);

    const currentFixTotal = currentRent+currentInsurance+currentCommunication+currentSubscribe;
    const lastFixTotal = lastRent+lastInsurance+lastCommunication+lastSubscribe;

    const currentVariableTotal1 = currentTraffic+currentMedical+currentEducation;
    const lastVariableTotal1 = lastTraffic+lastMedical+lastEducation;

    const currentVariableTotal2 = currentShopping+currentHobby+currentEvent+currentEct;
    const lastVariableTotal2 = lastShopping+lastHobby+lastEvent+lastEct;

    const currentTotal = currentFixTotal+currentVariableTotal1+currentVariableTotal2;
    const lastTotal = lastFixTotal+lastVariableTotal1+lastVariableTotal2;

    const fixData = {
        labels: ["10월", "11월"],
        legend: ["월세", "보험", "통신", "구독"],
        data: [[lastRent, lastInsurance, lastCommunication, lastSubscribe], [currentRent, currentInsurance, currentCommunication, currentSubscribe]],
        barColors: ["#dfe4ea", "#ced6e0", "#a4b0be", "#9494a4"]
      };
    const fixConfig = {
        backgroundColor: "#ffffff",
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`
    };
    const variable1Data = {
        labels: ["10월", "11월"],
        legend: ["의료", "교통", "교육"],
        data: [[lastMedical, lastTraffic, lastEducation], [currentMedical, currentTraffic, currentEducation]],
        barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
    }
    const variable2Data = {
        labels: ["10월", "11월"],
        legend: ["기타", "쇼핑", "취미", "경조사"],
        data: [[lastEct, lastShopping, lastHobby, lastEvent], [currentEct, currentShopping, currentHobby, currentEvent]],
        barColors: ["#dfe4ea", "#ced6e0", "#a4b0be", "#9494a4"]
    }
    const totalData = {
        labels: ["10월", "11월"],
        legend: ["총액"],
        data: [[lastTotal], [currentTotal]],
        barColors: ["#ced6e0"]
    }
    useEffect(()=>{
        AsyncStorage.getItem('userID', (err, result) => {
            const tempID = result;
            if(tempID!= null){
                setUserID(tempID);
            }
        })
    })

    return (
        <ScrollView style={styles.appSize}>
            <View style={styles.appTopBar}>
                <Text style={styles.topFont}>11월 소비 분석 리포트</Text>
            </View>
            <View style={styles.fixDiv}>
                <Text style={styles.cateFont}>고정지출</Text>
                <View style={styles.tempRow}>
                    <StackedBarChart
                    data={fixData}
                    width={350}
                    height={250}
                    chartConfig={fixConfig}
                    withHorizontalLabels={false}
                />
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>이번달(11월)</Text>
                    <Text style={styles.priceFont}>{currentFixTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>저번달(10월)</Text>
                    <Text style={styles.priceFont}>{lastFixTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text>지난달 대비</Text>
                    {currentFixTotal - lastFixTotal > 0 ?
                        <Text style={styles.upFont}>+{Math.abs(currentFixTotal - lastFixTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> :
                        <Text style={styles.downFont}>-{Math.abs(currentFixTotal - lastFixTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    }
                </View>
            </View>
            <View style={styles.fixDiv}>
                <Text style={styles.cateFont}>계획지출1</Text>
                <View style={styles.tempRow}>
                    <StackedBarChart
                    data={variable1Data}
                    width={350}
                    height={250}
                    chartConfig={fixConfig}
                    withHorizontalLabels={false}
                />
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>이번달(11월)</Text>
                    <Text style={styles.priceFont}>{currentVariableTotal1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>저번달(10월)</Text>
                    <Text style={styles.priceFont}>{lastVariableTotal1.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text>지난달 대비</Text>
                    {currentVariableTotal1 - lastVariableTotal1 > 0 ?
                        <Text style={styles.upFont}>+{Math.abs(currentVariableTotal1 - lastVariableTotal1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> :
                        <Text style={styles.downFont}>-{Math.abs(currentVariableTotal1 - lastVariableTotal1).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    }
                </View>
            </View>
            <View style={styles.fixDiv}>
                <Text style={styles.cateFont}>계획지출2</Text>
                <View style={styles.tempRow}>
                    <StackedBarChart
                    data={variable2Data}
                    width={350}
                    height={250}
                    chartConfig={fixConfig}
                    withHorizontalLabels={false}
                />
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>이번달(11월)</Text>
                    <Text style={styles.priceFont}>{currentVariableTotal2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>저번달(10월)</Text>
                    <Text style={styles.priceFont}>{lastVariableTotal2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text>지난달 대비</Text>
                    {currentVariableTotal2 - lastVariableTotal2 > 0 ?
                        <Text style={styles.upFont}>+{Math.abs(currentVariableTotal2 - lastVariableTotal2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> :
                        <Text style={styles.downFont}>-{Math.abs(currentVariableTotal2 - lastVariableTotal2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    }
                </View>
            </View>
            <View style={styles.fixDiv}>
                <Text style={styles.cateFont}>총지출</Text>
                <View style={styles.tempRow}>
                    <StackedBarChart
                    data={totalData}
                    width={350}
                    height={250}
                    chartConfig={fixConfig}
                    withHorizontalLabels={false}
                />
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>이번달(11월)</Text>
                    <Text style={styles.priceFont}>{currentTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text style={styles.monthFont}>저번달(10월)</Text>
                    <Text style={styles.priceFont}>{lastTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                    <Text>원</Text>
                </View>
                <View style={styles.monthRow}>
                    <Text>지난달 대비</Text>
                    {currentTotal - lastTotal >= 0 ?
                        <Text style={styles.upFont}>+{Math.abs(currentTotal - lastTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text> :
                        <Text style={styles.downFont}>-{Math.abs(currentTotal - lastTotal).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</Text>
                    }
                </View>
            </View>
        </ScrollView>
    )
}

export default AssetCounseling;

const styles = StyleSheet.create({
    appSize: {
        flex: 1,
    },
    appTopBar: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
    },
    topFont: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cateFont: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 10,
    },
    tempRow: {
        alignItems: 'center',
    },
    fixDiv: {
        marginTop: 20,
        margin: 5,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    monthRow: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    monthFont: {
        width: 90,
    },
    priceFont:{
        width: 140,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'right',
    },
    upFont:{
        color: 'red',
        fontSize: 14,
        fontWeight: 'bold',
        width: 130,
        textAlign: 'right',
    },
    downFont:{
        color: 'blue',
        fontSize: 14,
        fontWeight: 'bold',
        width: 130,
        textAlign: 'right',
    },
});