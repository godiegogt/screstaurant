import { Dimensions } from 'react-native';
const { height, width } = Dimensions.get('screen');

const BASE = 16;

export default {
  colors: {
    DEFAULT: '#DCDCDC',
    primary: '#FFAf00',
    primary_light: '#85cff4',
    primary_dark: '#09988B',
    secondary: '#f46957',
    secondary_light: '#315DB3',
    secondary_dark: '#01153D',
    LABEL: '#FE2472',
    info: '#00BCD4',
    error: '#e63946',
    success: '#2B8000',
    warning: '#FF9800',
    muted: '#979797',
    INPUT: '#DCDCDC',
    active: '#9C26B0',
    BUTTON_COLOR: '#9C26B0',
    place_holder: '#9FA5AA',
    SWITCH_ON: '#9C26B0',
    SWITCH_OFF: '#D4D9DD',
    gradient_start: '#0DC7B6',
    gradient_end: '#09988B',
    PRICE_COLOR: '#EAD5FB',
    BORDER_COLOR: '#E7E7E7',
    BLOCK: '#E7E7E7',
    icon: '#4A4A4A',
    text: '#777777',
    text_light: '#f7f7f7',
    text_dark: '#555555',
    black: '#000000',
    block: '#808080',
    grey: '#777',
    grey_light: '#f7f7f7',
    grey_dark: '#555',
    //Backgrounds
    back_ground_screen: '#fdfdfd',
    rowShadowColorPrimary:'#fae6e6',
    back_ground_color:'#f7dccb'
  },
  sizes: {
    block_shadow_radius: 2,
    h1: 22,
    h2: 18,
    h3: 14,

    //Galio sizes
    BASE: BASE,
    FONT: BASE,
    OPACITY: 0.6,
    BORDER_RADIUS: 10,
    BORDER_WIDTH: 0.8,

    // Typography
    H1: BASE * 2.75,
    H2: BASE * 2.375,
    H3: BASE * 1.875,
    H4: BASE * 1.5,
    H5: BASE * 1.3125,
    H6: BASE * 1.125,
    BODY: BASE * 0.875,
    SMALL: BASE * 0.75,

    // Icons
    ICON: BASE,
    ICON_MEDIUM: BASE * 1.5,
    ICON_LARGE: BASE * 2,

    // Button styles
    BUTTON_WIDTH: BASE * 9,
    BUTTON_HEIGHT: BASE * 2.75,
    BUTTON_SHADOW_RADIUS: 3,

    // Block styles
    BLOCK_SHADOW_OPACITY: 0.15,
    BLOCK_SHADOW_RADIUS: 8,
    ANDROID_ELEVATION: 1,

    // Card styles
    CARD_BORDER_RADIUS: BASE * 0.4,
    CARD_BORDER_WIDTH: BASE * 0.05,
    CARD_WIDTH: width - BASE * 2,
    CARD_MARGIN_VERTICAL: BASE * 0.875,
    CARD_FOOTER_HORIZONTAL: BASE * 0.75,
    CARD_FOOTER_VERTICAL: BASE * 0.75,
    CARD_AVATAR_WIDTH: BASE * 2.5,
    CARD_AVATAR_HEIGHT: BASE * 2.5,
    CARD_AVATAR_RADIUS: BASE * 1.25,
    CARD_IMAGE_HEIGHT: BASE * 12.5,
    CARD_ROUND: BASE * 0.1875,
    CARD_ROUNDED: BASE * 0.5,

    // Input styles
    INPUT_BORDER_RADIUS: BASE * 0.5,
    INPUT_BORDER_WIDTH: BASE * 0.05,
    INPUT_HEIGHT: BASE * 2.75,
    INPUT_HORIZONTAL: BASE,
    INPUT_VERTICAL_TEXT: 14,
    INPUT_VERTICAL_LABEL: BASE / 2,
    INPUT_TEXT: BASE * 0.875,
    INPUT_ROUNDED: BASE * 1.5,

    // NavBar styles
    NAVBAR_HEIGHT: BASE * 4.125,
    NAVBAR_VERTICAL: BASE,
    NAVBAR_TITLE_FLEX: 2,
    NAVBAR_TITLE_HEIGHT: height * 0.07,
    NAVBAR_TITLE_TEXT: BASE * 0.875,
    NAVBAR_LEFT_FLEX: 0.5,
    NAVBAR_LEFT_HEIGHT: height * 0.07,
    NAVBAR_LEFT_MARGIN: BASE,
    NAVBAR_RIGHT_FLEX: 0.5,
    NAVBAR_RIGHT_HEIGHT: height * 0.07,
    NAVBAR_RIGHT_MARGIN: BASE,

    // Checkbox
    CHECKBOX_WIDTH: 20,
    CHECKBOX_HEIGHT: 20,

    // Slider
    TRACK_SIZE: 4,
    THUMB_SIZE: 25,

    // Radio Button
    RADIO_WIDTH: 24,
    RADIO_HEIGHT: 24,
    RADIO_THICKNESS: 2,

    //Screen
    padding_screen: BASE,
  },
  font: {
    font_family: 'Arial',
  },
};
