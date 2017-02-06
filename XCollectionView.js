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

import TheLordAlbumCell from './TheLordAlbumCells/TheLordAlbumCell';
import TheLordAlbumSectionHeader from './TheLordAlbumCells/TheLordAlbumSectionHeader';

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

export default  class XCollectionView extends Component {
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
        return(
            <TheLordAlbumSectionHeader
                sectionText={this.state.SectionArray[sectionID]}
            />
        );
    }
    /**
     * renderRow
     */
    renderRow(rowData, sectionID, rowID) {
        return(
            <TheLordAlbumCell
                rowStyle={rowID}
                rowData={rowData}
                rowCellClick={()=>this.imageClick(rowData,sectionID,rowID)}
            />
        );
    }
    /**
     * 加载更多的View
     *
     * 建议用一个state属性，来纪录是否正在加载的状态，来更新footer的UI
     */
    renderFooterView() {
        return(
          <View style={{width: WIDTH, height: 40, backgroundColor: 'red'}}/>
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
});