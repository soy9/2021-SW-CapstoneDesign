import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import RankingLogo from './RankingLogo';
import { background, backgroundColor } from 'styled-system';

const FinancialConsultItem = (props) => {
    console.log('하하', props);
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => props.navigation.navigate('FinancialCounselorDetail', {consultNumber: props.consultNumber})}
        >
            <View style={styles.itemContainer}>
                <View style={styles.rankingLogoContainer}>
                    <RankingLogo rank={props.counselorRank}/>
                </View>


                <View style={styles.item2}>
                    <View style={{width: 75, alignItems: 'center'}}> 
                        <Text>{props.consultPart}</Text> 
                    </View>
                    
                    <View style={{width: 105, alignItems: 'center'}}> 
                        <Text> {props.counselorCorp}</Text> 
                    </View>

                    <View style={{width: 70, alignItems: 'center'}}> 
                        <Text>{props.counselorName}</Text> 
                    </View>

                    <View style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 5,}}>
                        <Image source={require('../../assets/redHeart.png')} style={styles.likeLogo}/>
                        <Text style={{marginLeft: 5, fontSize: 10, }}>{props.counselorLike/*.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")*/}</Text>
                    </View>
                </View>

                <View>
                    <Icon name={'chevron-forward-outline'} size={20} color={'#8EB3EE'}/>
                </View>

            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    itemContainer: {
      flexDirection: 'row',
      paddingHorizontal: 3, 
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    rankingLogoContainer: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
      },
    item2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 300,
        paddingVertical: 20,
    },
    likeLogo: {
        width: 10,
        height:10,
    },
  });

export default FinancialConsultItem;