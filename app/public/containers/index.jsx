import React,{PropTypes} from 'react'
import { connect } from 'react-redux'

import { Tree, Icon , Col, Row } from '@ali/sui';
import * as Actions from '../actions/index'

const TreeNode = Tree.TreeNode;

const Sider = React.createClass({
    getInitialState() {
        return {
            current: '1'
        };
    },
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(Actions.getSider());
    },
    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
    },

    _renderMenu(item) {

        if (item.items && item.items.length) {
            return <TreeNode title={item.title} >
                {  item.items.map((subitem,idx) => {
                    return this._renderMenu(subitem)
                })}
            </TreeNode>
        } else {
            return <TreeNode title={item.title} ></TreeNode>
        }
    },
    render() {

        return  <Row>
            <Col span="4">
                <Tree defaultExpandAll={false}>
                    {  this.props.sider.list.map((item,idx) => {
                        return this._renderMenu(item)
                    })}
                </Tree>
            </Col>
            <Col span="20">
            {this.props.children}
            </Col>
        </Row>;
    }
});

Sider.propTypes = {
    router: PropTypes.object.isRequired,
    sider: PropTypes.object.isRequired
}


function mapStateToProps(state) {
    return {
        router: state.router,
        sider: state.sider,
    };
}

export default connect(mapStateToProps)(Sider)
