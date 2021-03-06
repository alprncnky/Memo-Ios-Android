import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TouchableHighlight, Dimensions, Image } from 'react-native';
import data from '../../../words.json';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider } from 'react-native-elements';
import LangModal from '../ui-items/LangModal';
import Icon from '../icons';

const width_ = Math.round(Dimensions.get('window').width)
const labelHeight = Math.round(width_/6)
const iconSize_ = Math.round(labelHeight/3.7)
const fontSize_ = Math.round(labelHeight/3.5)

const imagePath = [require('../../../images/en512.png'), require('../../../images/es512.png'), require('../../../images/ar512.png'), require('../../../images/fr512.png'), require('../../../images/gr512.png'), require('../../../images/id512.png'), require('../../../images/in512.png'), require('../../../images/it512.png'), require('../../../images/pr512.png'), require('../../../images/rs512.png'), require('../../../images/tr512.png')]

class WordList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: "Click on Words...",
      showTextNo: null,
      translateNo: this.props.navigation.state.params.id,
      visibleModal: false
    };
    console.disableYellowBox = true;
  }

  openModal() {
    this.setState({ visibleModal: true })
   }

  modalTrigger = () => {
    this.setState({ visibleModal: false })
  }

  getInput = async (trlno) => {
    this.modalTrigger()
    await this.setState({ translateNo: trlno })
    if(this.state.showTextNo != null){
       this.translateWord(this.state.showTextNo)
    }
  }

  translateWord(no){
    this.setState({ showText: data.list[this.state.translateNo][no], showTextNo: no })
  }

  render() {

    return (
      <View>
            <View>
                <View style={{ height: labelHeight, flexDirection:'row' }}>
                    <View style={{ flex:5, justifyContent:'center', backgroundColor:'#e6e6e6', marginTop:10, marginLeft:10, marginBottom:10, borderRadius:15 }}>
                      <Text style={{ marginLeft:10, marginRight:10, fontWeight:'800', color:'#333333', fontSize: fontSize_ }}>{this.state.showText}</Text>
                    </View>
                    <View style={{ flex:2, marginTop:10, marginRight:10, marginBottom:10, flexDirection:'row' }}>
                        <View style={{ justifyContent: 'center'}}>
                            <Icon.AntDesign name='swap' color='#000' size={iconSize_} />
                        </View>
                        <TouchableOpacity onPress={() => this.openModal()} style={{ flexDirection:'row' }}>
                          <View style={{ flexDirection:'row', borderRadius: 10, borderWidth:1, borderColor:'gray' }}>
                              <View>
                                  <Image style={{flex:1 , resizeMode:'contain', width: labelHeight, height: labelHeight }}
                                      source={imagePath[this.state.translateNo]}
                                    />
                              </View>
                              <View style={{ justifyContent: 'center'}}>
                                  <Icon.AntDesign name='caretdown' color='#000' size={iconSize_} />
                              </View>
                          </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView
                  scrollEventThrottle={400}>
                  <FlatList
                    data={data.list[this.props.navigation.state.params.id]}
                    renderItem={({item, index}) => 
                      <React.Fragment>
                        <Divider style={{marginLeft:20, marginRight:20, height:1, backgroundColor: '#e6e6e6' }} />
                        <TouchableHighlight underlayColor="#e6e6e6" onPress={() => this.translateWord(index)}>
                            <Text style={{color:'#404040', marginLeft:25, marginRight:25, marginTop:15, marginBottom:15, fontSize:20}}>{index+1+". "}{item}</Text>
                        </TouchableHighlight>
                      </React.Fragment>
                      }
                  />
                </ScrollView>
            </View>

            <LangModal 
                  data = {data}
                  display = { this.state.visibleModal }
                  function = {this.modalTrigger}
                  input = {this.getInput}
                />

      </View>
    );
  }
}

export default WordList;


/*
onPress={() =>
    ActionSheet.show(
      {
        options: BUTTONS,
        title: "Choose Language"
      },
      buttonIndex => {
        this.setState({ clicked: BUTTONS[buttonIndex] });
      }
)} >
*/