// 'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Dimensions,
} from 'react-native';

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const ROWWIDTH = WIDTH/3;
const ROWHEIGHT = WIDTH/3;
const FOOTERHEIGHT = 44;

var getSectionData = (dataBlob, sectionID) => {

    console.log(JSON.stringify(dataBlob) + '_________' + sectionID);
    return dataBlob[sectionID];
};
var getRowData = (dataBlob, sectionID, rowID) => {
    console.log(JSON.stringify(dataBlob) + '______' + sectionID + '_____' + JSON.stringify(rowID));
    return dataBlob[rowID];
};
var ds = new ListView.DataSource({
    getRowData:getRowData,
    getSectionHeaderData:getSectionData,
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});

export default  class CollectionView extends Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.renderSectionHeader = this.renderSectionHeader.bind(this);
        this.renderFooterView = this.renderFooterView.bind(this);
        var SectionArray = ['1','2','3','4'];
        var DataSource = [
            [{'text':'1'},{'text':'2'}],
            [{'text':'1'},{'text':'2'},{'text':'3'},{'text':'4'}],
            [{'text':'1'},{'text':'2'},{'text':'3'},{'text':'4'},{'text':'5'}],
            [{'text':'1'},{'text':'2'},{'text':'3'},{'text':'4'},{'text':'5'},{'text':'6'},{'text':'7'}]
        ];
        // var DataSource = [{'1月':['1','2']},{'2月':['1','2','3','4']},{'3月':['1','2','3','4','5']},{'4月':['1','2','3','4','5','6','7']}];
        this.state = {
            SectionArray: SectionArray,
            dataSource: ds.cloneWithRowsAndSections({},SectionArray,DataSource),
        };
    }
    renderSectionHeader(sectionData, sectionID) {
        console.log('__' + sectionID);
        console.log('--' + sectionData);
        return(
            <View style={styles.sectionHeaderStyle}>
                <Text style={styles.textStyle}>
                    {sectionID}
                </Text>
            </View>
        );
    }
    renderRow(rowData, sectionID, rowID) {
        console.log('+' + rowData);
        console.log('++' + sectionID);
        console.log('+++' + rowID);
        if (rowID % 2 == 0){
            return(
                <View style={styles.rowStyleBlue}>
                    <Text style={styles.textStyle}>
                        {rowID}
                    </Text>
                </View>
            );
        }else {
            return(
                <View style={styles.rowStyleRed}>
                    <Text style={styles.textStyle}>
                        {rowData}
                    </Text>
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
        height: 44,
        backgroundColor: 'green',
    },
    rowStyleBlue: {
        width: ROWWIDTH,
        height: ROWHEIGHT,
        backgroundColor: 'blue',
    },
    rowStyleRed: {
        width: ROWWIDTH,
        height: ROWHEIGHT,
        backgroundColor: 'red',
    },
    footerStyle: {
        width: WIDTH,
        height: 44,
        backgroundColor: 'yellow',
    },
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});