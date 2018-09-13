import styled from 'styled-components';

const BaseColor = {
    color_apptheme: '#1890ff',
    tag_color_1: '#f50',
    tag_color_2: '#2db7f5',
    tag_color_3: '#87d068',
    tag_color_4: '#108ee9',
    lightGray: '#ddd',
    red: '#f00',
    gray: '#666',
    black: '#000',
};

const FONT_FAMILY = "'Chela One', cursive";

const BaseAppThemeButton = styled.button`
    border: none;
    color: white !important;
    background: ${BaseColor.color_apptheme} !important;
    &:focus {
        border: none;
        outline: none;
    }
    &:hover {
        opacity: 0.8;
        cursor: pointer;
        transform: translateY(-1px);
        box-shadow: 0 7px 14px rgba(50, 50, 93, .1), 0 3px 6px rgba(0, 0, 0, .08);
    }    
`;

const BaseHoverFloatDiv = styled.div`
    &:focus {
        border: none;
        outline: none;
    }
    &:hover {
        opacity: 0.8;
        cursor: pointer;
        transform: translateY(-1px);
        box-shadow: 0 7px 14px rgba(50, 50, 93, .1), 0 3px 6px rgba(0, 0, 0, .08);
    }
`;

const T1 = styled.h1`
    font-family: ${FONT_FAMILY};
    color: ${BaseColor.color_apptheme};
`;
export {
    BaseAppThemeButton,
    BaseColor,
    T1,
    BaseHoverFloatDiv
}