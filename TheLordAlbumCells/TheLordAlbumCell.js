/**
 * 使用示例:
 *
 *  <CollectionCell
 *  rowStyle={rowID}//这个里面判断  用来布局
 *  rowData={rowData}//内容字典，内容字段待接口
 *  rowCellClick={()=>this.imageClick(rowData,sectionID,rowID)} //点击触发方法，需要自己加后面的逻辑，传数据->浏览大图
 *  />
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    Image,
    StyleSheet,
    TouchableHighlight,
    Dimensions,
} from 'react-native';

const DEBUG = false;//true 将显示所有布局颜色 false显示正常颜色
const WIDTH = Dimensions.get('window').width;
const MARGINLEFTANDRIGHT = 5;//距离屏幕两边的宽度
const ROWWIDTH = (WIDTH - MARGINLEFTANDRIGHT * 2)/3;//cell宽度
const ROWHEIGHT = ROWWIDTH;//cell高度
const MARGINIMAGE = 2;//图片距离cell边的宽度
const BORDERRADIUS = 2;//图片的切圆角
const RELEASECOLOR = '#FFFFFF';//默认背景色

export default class TheLordAlbumCell extends Component {
    static propTypes = {
        rowStyle: React.PropTypes.number,
        rowData: React.PropTypes.object,
        rowCellClick: React.PropTypes.func,
    };
    constructor(props) {
        super(props);
        this.state = {
            rowStyle: this.props.rowStyle,
            rowData: this.props.rowData,
        }
    }
    render() {
        console.log('rowID' + this.state.rowStyle);
        if (this.state.rowStyle % 3 == 0){
            return(
                <View style={styles.rowStyleBlue}>
                    <View style={styles.rowStyleBlueSun}>
                        <TouchableHighlight underlayColor='#f3f3f3' onPress={()=>this.props.rowCellClick()}>
                            <View>
                                <Image  style={styles.defaultUserImage}
                                        source={require('../img/default_square.png')}
                                />
                                <Image  style={styles.userImage}
                                        source={require('../img/abc.png')}
                                />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }else if (this.state.rowStyle % 3 == 1){
            return(
                <View style={styles.rowStyleRed}>
                    <View style={styles.rowStyleRedSun}>
                        <TouchableHighlight underlayColor="#f3f3f3" onPress={()=>this.props.rowCellClick()}>
                            <View>
                                <Image  style={styles.defaultUserImage}
                                        source={require('../img/default_square.png')}
                                />
                                <Image  style={styles.userImage}
                                        source={{uri: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1015188862,2631989827&fm=170&s=EF6FA144D67225948153E9900300F09B&w=218&h=146&img.JPEG'}}
                                />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }else {
            return(
                <View style={styles.rowStyleYellow}>
                    <View style={styles.rowStyleYellowSun}>
                        <TouchableHighlight underlayColor="#f3f3f3" onPress={()=>this.props.rowCellClick()}>
                            <View>
                                <Image  style={styles.defaultUserImage}
                                        source={require('../img/default_square.png')}
                                />
                                <Image  style={styles.userImage}
                                        source={require('../img/abc.png')}
                                />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    rowStyleBlue: {
        width: ROWWIDTH + MARGINLEFTANDRIGHT,
        height: ROWHEIGHT,
        backgroundColor: DEBUG ? 'blue' : RELEASECOLOR,
    },
    rowStyleBlueSun: {
        top: MARGINIMAGE,
        left: MARGINIMAGE + MARGINLEFTANDRIGHT,
        width: ROWWIDTH - MARGINIMAGE*2,
        height: ROWHEIGHT - MARGINIMAGE*2,
        backgroundColor: DEBUG ? 'black' : RELEASECOLOR,
    },
    rowStyleRed: {
        width: ROWWIDTH,
        height: ROWHEIGHT,
        backgroundColor: DEBUG ? 'red' : RELEASECOLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowStyleRedSun: {
        width: ROWWIDTH - MARGINIMAGE*2,
        height: ROWHEIGHT - MARGINIMAGE*2,
        backgroundColor: DEBUG ? 'blue' : RELEASECOLOR,
    },
    rowStyleYellow: {
        width: ROWWIDTH + MARGINLEFTANDRIGHT,
        height: ROWHEIGHT,
        backgroundColor: DEBUG ? 'yellow' : RELEASECOLOR,
    },
    rowStyleYellowSun: {
        top: MARGINIMAGE,
        left: MARGINIMAGE,
        width: ROWWIDTH - MARGINIMAGE*2,
        height: ROWHEIGHT - MARGINIMAGE*2,
        backgroundColor: DEBUG ? 'black' : RELEASECOLOR,
    },
    defaultUserImage: {
        width: ROWWIDTH - MARGINIMAGE*2,
        height: ROWWIDTH - MARGINIMAGE*2,
        resizeMode: 'stretch',
        borderRadius: BORDERRADIUS,
    },
    userImage: {
        width: ROWWIDTH - MARGINIMAGE*2,
        height: ROWWIDTH - MARGINIMAGE*2,
        position: 'absolute',
        resizeMode: 'stretch',
        borderRadius: BORDERRADIUS,
    },
});