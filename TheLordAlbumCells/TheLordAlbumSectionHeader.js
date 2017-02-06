/**
 * 使用示例:
 *
 *  <CollectionSectionHeader
 *  sectionText={this.state.SectionArray[sectionID]}//传入一个字符串 例如:2016年11月
 *  />
 */
import React, {Component, PropTypes} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Dimensions,
} from 'react-native';

const DEBUG = false;//true 将显示所有布局颜色 false显示正常颜色
const WIDTH = Dimensions.get('window').width;
const SECTIONTEXTMARGIN = 11;//sectionHeader text margin
const SECTIONLINEWIDTH = 25;//sectionHeader line width
const SECTIONLINEHEIGHT = 1;//sectionHeader line height
const SECTIONHEADERHEIGHT = 44;//sectionHeader height
const RELEASECOLOR = '#FFFFFF';//默认背景色

export default class TheLordAlbumSectionHeader extends Component {
    static propTypes = {
        sectionText: React.PropTypes.string,
    };
    constructor(props) {
        super(props);
        this.state = {
            sectionText: this.props.sectionText,
        }
    }
    render() {
        // return(
        //     <View style={{width: WIDTH, height: 40, backgroundColor: 'green'}}/>
        // );
        return(
            <View style={styles.sectionHeaderStyle}>
                <View style={styles.sectionHeaderLine}/>
                <Text style={styles.sectionHeaderTextStyle}>
                    {this.state.sectionText}
                </Text>
                <View style={styles.sectionHeaderLine}/>
            </View>
        );
    }

}
const styles = StyleSheet.create({
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
    sectionHeaderTextStyle: {
        fontSize: 13,
        textAlign: 'center',
        marginLeft: SECTIONTEXTMARGIN,
        marginRight: SECTIONTEXTMARGIN,
        color: '#999999',
    },
});