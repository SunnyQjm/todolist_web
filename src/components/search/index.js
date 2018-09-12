import React from 'react';
import styled from 'styled-components';
import Proptypes from 'prop-types';
import Icon from 'antd/lib/icon';
import TweenOne from 'rc-tween-one';

const SearchBody = styled.div`
    display: flex;
    margin: 0 20px;
    justify-content: center;
    align-items: center;
`;

const Search = styled.input`
    outline: none;
    border: none;
    padding: 5px 10px;
    width: 100%;
    flex-grow: 1;
    align-items: center;
`;

const SearchIcon = styled(Icon)`
    cursor: pointer;
    flex-grow: 0;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
`;

class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
        this.handleOnChange = this.handleOnChange.bind(this);
        this.handleInputOnBlur = this.handleInputOnBlur.bind(this);
        this.handleInputOnFocus = this.handleInputOnFocus.bind(this);
        this.state = {
            hover: false,
            inputFocus: false,
            searchValue: ''
        }
    }

    handleMouseEnter() {
        this.setState({
            hover: true,
        });
    }

    handleMouseLeave() {
        this.setState({
            hover: false,
        });
    }

    handleInputOnFocus(){
        this.setState({
            inputFocus: true
        });
    }

    handleInputOnBlur(){
        this.setState({
            inputFocus: false,
        })
    }

    handleOnKeyPress(e) {
        let {onSearch} = this.props;
        let {searchValue} = this.state;
        if (e.key === 'Enter') { //敲回车的时候调用搜索回调，并清空input
            onSearch && onSearch(searchValue);
            this.setState({
                searchValue: '',
            })
        }
    }

    handleOnChange(e) {
        this.setState({
            searchValue: e.target.value,
        });
    }

    render() {
        let {
            minWidth, height, borderRadius, backgroundColor,
            maxWidth, animationDuration, fontSize,
        } = this.props;
        let {searchValue} = this.state;
        let searchBodyStyle = {
            height,
            borderRadius: borderRadius,
            backgroundColor,
            minWidth: height,
            fontSize,
        };
        let searchStyle = {
            height,
            borderRadius: borderRadius,
            width: '100%',
            padding: '5px 10px',
        };
        return (
            <SearchBody style={searchBodyStyle} onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                        onKeyPress={this.handleOnKeyPress}
            >
                {
                    this.state.hover || this.state.inputFocus?
                        <TweenOne animation={{
                            width: maxWidth,
                            duration: animationDuration,
                        }} style={{
                            width: minWidth,
                        }}>
                            <Search {...this.props} style={searchStyle} type={'search'} autocomplete={true}
                                    value={searchValue}
                                    onChange={this.handleOnChange} onFocus={this.handleInputOnFocus} onBlur={this.handleInputOnBlur}/>
                        </TweenOne>
                        :
                        <TweenOne animation={{
                            width: minWidth,
                            duration: animationDuration,
                        }} style={{
                            width: minWidth,
                        }}>
                            <Search {...this.props} style={searchStyle} type={'search'} autocomplete={true}
                                    value={searchValue}
                                    onChange={this.handleOnChange}/>
                        </TweenOne>
                }
                <SearchIcon type={'search'} style={{}}/>
            </SearchBody>
        );
    }
}


SearchComponent.propTypes = {
    minWidth: Proptypes.number,
    maxWidth: Proptypes.number,
    height: Proptypes.number,
    borderRadius: Proptypes.number,
    backgroundColor: Proptypes.string,
    animationDuration: Proptypes.number,
    onSearch: Proptypes.func,
    fontSize: Proptypes.string,
};

SearchComponent.defaultProps = {
    minWidth: 0,
    maxWidth: 200,
    height: 30,
    borderRadius: 30,
    backgroundColor: 'white',
    animationDuration: 500,
    fontSize: '1em',
    onSearch: (value) => {
        console.log(value);
    }
};
export default SearchComponent;