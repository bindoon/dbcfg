import React,{PropTypes} from 'react'
import { connect } from 'react-redux'

import { Icon , Col, Row, Menu, Breadcrumb, notification } from 'antd';
const SubMenu = Menu.SubMenu;

import * as Actions from '../actions/index'

class Sider extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            current: '1'
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(Actions.getSider()).then(json=>{
            if(!json.success) {
                notification.error({
                    message:json.message
                })
            }
        });;
    }
    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
    }
    _renderMenu(item) {

        if (item.items && item.items.length) {
            return <SubMenu title={item.title} >
                {  item.items.map((subitem,idx) => {
                    return this._renderMenu(subitem)
                })}
            </SubMenu>
        } else {
            return <Menu.Item key={item.id} ><a href={item.link} >{item.title}</a></Menu.Item>
        }
    }
    render() {
        return <div>
            <div className="header">
                <Menu theme="dark" mode="horizontal"
                      defaultSelectedKeys={['2']} style={{lineHeight: '64px'}}>
                    <Menu.Item key="1">导航一</Menu.Item>
                    <Menu.Item key="2">导航二</Menu.Item>
                    <Menu.Item key="3">导航三</Menu.Item>
                </Menu>
            </div>
            <div className="container" >
                <Row>
                    <Col span="4">
                        <Menu  mode="inline" >
                            {  this.props.sider.list.map((item) => {
                                return this._renderMenu(item)
                            })}
                        </Menu>
                    </Col>
                    <Col span="20">
                        <div style={{background: "#ececec",padding:"10px 20px 30px 20px"}}>
                            <div style={{margin: "10px"}} >
                                <Breadcrumb  >
                                    <Breadcrumb.Item>首页</Breadcrumb.Item>
                                    <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
                                    <Breadcrumb.Item href="">应用列表</Breadcrumb.Item>
                                    <Breadcrumb.Item>某应用</Breadcrumb.Item>
                                </Breadcrumb>
                            </div>
                            {this.props.children}
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="footer">
            </div>
        </div>;
    }
}

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
