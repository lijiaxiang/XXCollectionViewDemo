// 'use strict';
/**
 * 暂时没有加下拉刷新功能
 *
 * 数据源传两个数组进来  类似于SectionArray DataSource 结构的数组包字典形式
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
    Image,
    TouchableHighlight,
} from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const MARGINLEFTANDRIGHT = 5;//距离屏幕两边的宽度
const ROWWIDTH = (WIDTH - MARGINLEFTANDRIGHT * 2)/3;//cell宽度
const ROWHEIGHT = ROWWIDTH;//cell高度
const MARGINIMAGE = 2;//图片距离cell边的宽度
const BORDERRADIUS = 2;//图片的切圆角
const SECTIONTEXTMARGIN = 11;//sectionHeader text margin
const SECTIONLINEWIDTH = 25;//sectionHeader line width
const SECTIONLINEHEIGHT = 1;//sectionHeader line height
const SECTIONHEADERHEIGHT = 44;//sectionHeader height
const FOOTERHEIGHT = 44;//footer高度

const DEBUG = true;//true 将显示所有布局颜色 false显示正常颜色
const RELEASECOLOR = '#fff';//默认背景色


var ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

export default  class XXCollectionView extends Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.renderSectionHeader = this.renderSectionHeader.bind(this);
        this.renderFooterView = this.renderFooterView.bind(this);
        //SectionArray and DataSource lenght must be same
        var SectionArray = ['12月','2016年11月','10月','2016年9月'];
        var DataSource = [['1','2'],['1','2','3','4'],['1','2','3','4','5'],['1','2','3','4','5','6','7']];
        this.state = {
            SectionArray: SectionArray,
            allArray: DataSource,//暂时没用到，做纪录，传给图片浏览器可能需要
            dataSource: ds.cloneWithRowsAndSections(DataSource),
        };
    }
    /**
     * 图片被电击所调用的方法
     */
    imageClick(rowData,sectionID,rowID) {
        console.log('rowData:'+rowData+'_sectionID:'+sectionID+'_rowID:'+rowID)
    }
    /**
     * 返回一个sectionHeader
     */
    renderSectionHeader(sectionData, sectionID) {
        console.log(sectionID);
        return(
            <View style={styles.sectionHeaderStyle}>
                <View style={styles.sectionHeaderLine}/>
                <Text style={styles.sectionHeaderTextStyle}>
                    {this.state.SectionArray[sectionID]}
                </Text>
                <View style={styles.sectionHeaderLine}/>
            </View>
        );
    }
    /**
     * renderRow
     */
    renderRow(rowData, sectionID, rowID) {
        if (rowID % 3 == 0){
            return(
                <View style={styles.rowStyleBlue}>
                    <View style={styles.rowStyleBlueSun}>
                        <TouchableHighlight underlayColor='#f3f3f3' onPress={()=>this.imageClick(rowData,sectionID,rowID)}>
                            <View>
                                <Image  style={styles.defaultUserImage}
                                        source={require('./img/default_square.png')}
                                />
                                <Image  style={styles.userImage}
                                        source={require('./img/abc.png')}
                                />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }else if (rowID % 3 == 1) {
            return(
                <View style={styles.rowStyleRed}>
                    <View style={styles.rowStyleRedSun}>
                        <TouchableHighlight underlayColor="#f3f3f3" onPress={()=>this.imageClick(rowData,sectionID,rowID)}>
                            <View>
                                <Image  style={styles.defaultUserImage}
                                        source={require('./img/default_square.png')}
                                />
                                <Image  style={styles.userImage}
                                        source={require('./img/abc.png')}
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
                        <TouchableHighlight underlayColor="#f3f3f3" onPress={()=>this.imageClick(rowData,sectionID,rowID)}>
                            <View>
                                <Image  style={styles.defaultUserImage}
                                        source={require('./img/default_square.png')}
                                />
                                <Image  style={styles.userImage}
                                        source={require('./img/abc.png')}
                                />
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            );
        }
    }
    /**
     * 加载更多的View
     *
     * 建议用一个state属性，来纪录是否正在加载的状态，来更新footer的UI
     */
    renderFooterView() {
        return(
            <View style={styles.footerStyle}/>
        );
    }
    /**
     * 加载更多
     *
     * 可能会调用多次，建议用一个state属性，来纪录是否正在加载的状态
     */
    onEndReached() {
        console.log('到了底部开始加载更多');
    }
    /**
     * render
     */
    render() {
        return(
            <View style={styles.container}>
                <ListView
                    contentContainerStyle={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                    renderFooter={this.renderFooterView}
                    onEndReached={this.onEndReached.bind(this)}
                    onEndReachedThreshold={FOOTERHEIGHT}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    list: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    sectionHeaderStyle: {
        width: WIDTH,
        height: SECTIONHEADERHEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: DEBUG ? 'green' : RELEASECOLOR,
    },
    sectionHeaderLine: {
        width: SECTIONLINEWIDTH,
        height: SECTIONLINEHEIGHT,
        backgroundColor: '#999999',
    },
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
    footerStyle: {
        width: WIDTH,
        height: 44,
        backgroundColor: 'pink',
    },
    sectionHeaderTextStyle: {
        fontSize: 13,
        textAlign: 'center',
        marginLeft: SECTIONTEXTMARGIN,
        marginRight: SECTIONTEXTMARGIN,
        color: '#999999',
    },
});