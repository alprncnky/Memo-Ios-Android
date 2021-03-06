import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, StatusBar, FlatList, AsyncStorage, Dimensions} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Card from '../ui-items/card';
import { ScrollView } from 'react-native-gesture-handler';
import DisplayModal from '../ui-items/DisplayModal';
import { get, addList, deleteList } from '../Data';

const width_ = Math.round(Dimensions.get('window').width)
const listTextSize = Math.round(width_/11.7)

class Feed extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAny: null,
      parsed: [],
      visibleModal: null,
      modalName: null,
      index: null,
      listName: null,
      showOnceText: null
    }
    console.log("WIDTH:"+width_)
  }

  // Go List screen
  goListScreen(lstname, indx){
    this.props.navigation.navigate('List', {name: lstname, index: indx});
  }

  // delete list when pressed on delete modal
  deleteBtnAction = async () => {
    await deleteList(this.state.index)
    this.modalTrigger()
    this.loadData()
    this.setState({ index: null })
  }

  openDeleteModal(indx,name) {
    console.log(indx)
    console.log(name)
    this.setState({ modalName: false })
    this.setState({ index: indx })
    this.setState({ listName: name })
    this.setState({ visibleModal: true })
  }

   openAddModal() {
    this.setState({ modalName: true })
    this.setState({ visibleModal: true })
   }

   getInput = async (txt) => {
    if(txt.length<19 && txt.length > 0){
      this.modalTrigger()
      await addList(txt)
      this.loadData()
    }
  }

  modalTrigger = () => {
    this.setState({ visibleModal: false })
  }

 getColor(number){
    colors = ['#C2185B','#FF9800','#2196F3','#F44336','#673AB7','#009688','#3F51B5','#4CAF50','#E64A19','#607D8B']
    number = number%10
    return colors[number];
  }

  // showOnceText
  async showOnce(){
    var exist = await AsyncStorage.getItem('show');
    if(exist == null){
      console.log("showOnce():run*")
      this.setState({
        showOnceText: <View><Text style={{ margin:20, fontSize:30, alignSelf:'center' }}>Welcome!</Text><Text style={{ margin:10, fontSize:20, alignSelf:'center' }}>The above list is just a sample list. You can add more lists or delete(Long Press On List) lists. The Test screen is going to show your words from these lists.</Text></View>
      })
      await AsyncStorage.setItem('show',"itsNotNullAnymore");
    }
  }


  // when page load
  componentWillMount() {
    this.loadData();
    this.showOnce();
  }

  // refresh Flatlist  ( get data from local saved )
  async loadData() {
    this.setState({
      parsed: await get()
    })
  }

  // if cards exist or not render items
  _renderCards(){
    listExist = false
    try{
      if(this.state.parsed.list.length > 0){
        listExist = true
      }
    }catch{
      listExist = false
    }
    if(listExist){
        return(
          <FlatList
            data={this.state.parsed.list}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) =>
              <TouchableOpacity onPress={() => this.goListScreen(item.name, index) } onLongPress={() => this.openDeleteModal(index,item.name) } activeOpacity={.6} >
                <Card listName={item.name} id={this.getColor(index)} />
              </TouchableOpacity>
            }
            keyExtractor={item => item.name}
          />)
    } else {
      return (
        <View>
          <Text style={styles.noListText}>There is No list</Text>
        </View>
      )
    }
  }

    render() {    
      
      return (
        <View style={{ flex:1}}>
        <StatusBar
            backgroundColor="white"
            barStyle="dark-content"
          />
            <ScrollView> 
                <View style={styles.view1}>
                    <View style={styles.listTextContainer}>
                        <Text style={styles.listText}>Lists</Text>
                    </View>
                    <View style={styles.addContainer}>
                      <View>
                        <TouchableOpacity onPress={() => this.openAddModal()}>
                          <View style={styles.addView}>
                              <Icon name='md-add' color='#333333' size={38} />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                </View>      

                { this._renderCards() }
                { this.state.showOnceText }

            </ScrollView>

            <DisplayModal 
                  data = "Krunal"
                  display = { this.state.visibleModal }
                  function = {this.modalTrigger}
                  input = {this.getInput}
                  whichModal = {this.state.modalName}
                  deleteFunction = {this.deleteBtnAction}
                  listName = {this.state.listName}
                />

        </View>
      );
    }
  }

export default Feed;

const styles = StyleSheet.create({
  view1: {
    marginTop: 10,
    marginBottom: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: "flex-end"
  },

  addContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginRight: 20,
  },

  listTextContainer: {
    marginLeft: 20,
  },

  listText: {
    color: '#000',
    fontSize: listTextSize,
    fontWeight: 'bold',
  },

  addView: {
    borderColor: '#333333',
    borderWidth: 2,
    borderRadius: 10,
    width: 36,
    height: 36,
    justifyContent:'center',
    alignItems: 'center'
  },

  noListText: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 25
  }
})



/*
class Feed extends Component {
    render() {
      return (
        <View style={{ flex:1, alignItems:'center', justifyContent: 'center' }}>
          <Button title='Go To Detail Screen' onPress={ ()=>this.props.navigation.navigate('Details') } />
        </View>
      );
    }
  }
*/