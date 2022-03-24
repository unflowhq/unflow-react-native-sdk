import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const LightningIcon = (props) => (
  <Svg {...props} viewBox="0 0 32 32" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.9565 1.70961C19.3782 1.83731 19.6667 2.22604 19.6667 2.6667V12.3334H25.3333C25.7021 12.3334 26.041 12.5364 26.215 12.8615C26.389 13.1867 26.37 13.5812 26.1654 13.8881L15.4987 29.8881C15.2543 30.2547 14.7986 30.4182 14.3769 30.2905C13.9551 30.1628 13.6667 29.774 13.6667 29.3334V19.6667H8C7.63121 19.6667 7.29235 19.4637 7.11833 19.1386C6.94431 18.8134 6.96338 18.4189 7.16795 18.112L17.8346 2.112C18.0791 1.74535 18.5347 1.58191 18.9565 1.70961ZM9.86852 17.6667H14.6667C15.219 17.6667 15.6667 18.1144 15.6667 18.6667V26.0306L23.4648 14.3334H18.6667C18.1144 14.3334 17.6667 13.8857 17.6667 13.3334V5.96948L9.86852 17.6667Z"
      fill="currentColor"
    />
  </Svg>
);

export const DetailsIcon = (props) => (
  <Svg {...props} viewBox="0 0 32 32" fill="none">
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 5C9.92487 5 5 9.92487 5 16C5 22.0751 9.92487 27 16 27C22.0751 27 27 22.0751 27 16C27 9.92487 22.0751 5 16 5ZM3 16C3 8.8203 8.8203 3 16 3C23.1797 3 29 8.8203 29 16C29 23.1797 23.1797 29 16 29C8.8203 29 3 23.1797 3 16ZM16 13.6667C16.5523 13.6667 17 14.1144 17 14.6667V21.3333C17 21.8856 16.5523 22.3333 16 22.3333C15.4477 22.3333 15 21.8856 15 21.3333V14.6667C15 14.1144 15.4477 13.6667 16 13.6667ZM16 12C16.7364 12 17.3333 11.403 17.3333 10.6667C17.3333 9.93029 16.7364 9.33333 16 9.33333C15.2636 9.33333 14.6667 9.93029 14.6667 10.6667C14.6667 11.403 15.2636 12 16 12Z"
      fill="currentColor"
    />
  </Svg>
);

export const PlusCircleIcon = (props) => (
  <Svg
    {...props}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.25 10C3.25 6.27208 6.27208 3.25 10 3.25C13.7279 3.25 16.75 6.27208 16.75 10C16.75 13.7279 13.7279 16.75 10 16.75C6.27208 16.75 3.25 13.7279 3.25 10ZM10 1.75C5.44365 1.75 1.75 5.44365 1.75 10C1.75 14.5563 5.44365 18.25 10 18.25C14.5563 18.25 18.25 14.5564 18.25 10C18.25 5.44365 14.5563 1.75 10 1.75ZM10.75 6.66667C10.75 6.25245 10.4142 5.91667 9.99998 5.91667C9.58576 5.91667 9.24998 6.25245 9.24998 6.66667L9.24998 9.25L6.66664 9.25C6.25243 9.25 5.91664 9.58579 5.91664 10C5.91664 10.4142 6.25243 10.75 6.66664 10.75L9.24998 10.75L9.24998 13.3333C9.24998 13.7475 9.58576 14.0833 9.99998 14.0833C10.4142 14.0833 10.75 13.7475 10.75 13.3333L10.75 10.75L13.3333 10.75C13.7475 10.75 14.0833 10.4142 14.0833 10C14.0833 9.58579 13.7475 9.25 13.3333 9.25L10.75 9.25L10.75 6.66667Z"
      fill="currentColor"
    />
  </Svg>
);

export const Twitter = (props) => (
  <Svg
    {...props}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M6.90967 16.8755C13.1974 16.8755 16.6375 11.6649 16.6375 7.14765C16.6375 7.00116 16.6343 6.85142 16.6278 6.70494C17.297 6.22098 17.8745 5.62153 18.3332 4.93476C17.7099 5.21205 17.0482 5.39315 16.3706 5.47187C17.0841 5.04421 17.6183 4.37238 17.8742 3.58092C17.203 3.97869 16.469 4.25928 15.7036 4.41067C15.1879 3.86272 14.5061 3.49991 13.7635 3.37833C13.0209 3.25676 12.259 3.38319 11.5955 3.73809C10.932 4.09298 10.4039 4.65657 10.0928 5.34171C9.78171 6.02685 9.705 6.79539 9.87451 7.5285C8.51546 7.4603 7.1859 7.10726 5.97205 6.49225C4.75819 5.87725 3.68712 5.01402 2.82829 3.95852C2.39178 4.7111 2.25821 5.60166 2.45472 6.44919C2.65123 7.29672 3.16307 8.03763 3.88623 8.52134C3.34333 8.50411 2.81232 8.35793 2.33708 8.09491L2.33708 8.13723C2.33659 8.92701 2.60963 9.69259 3.10977 10.3038C3.60992 10.9151 4.30631 11.3342 5.08056 11.4901C4.57765 11.6277 4.04982 11.6477 3.53792 11.5487C3.7564 12.2279 4.18148 12.822 4.75384 13.248C5.3262 13.674 6.01728 13.9107 6.73063 13.925C5.51957 14.8763 4.02357 15.3923 2.48356 15.3898C2.21045 15.3894 1.93761 15.3727 1.6665 15.3397C3.23099 16.3434 5.0509 16.8765 6.90967 16.8755Z"
      fill="currentColor"
    />
  </Svg>
);

export const LinkedIn = (props) => (
  <Svg
    {...props}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M17.0994 1.66666L2.89697 1.66666C2.21663 1.66666 1.6665 2.20377 1.6665 2.86783L1.6665 17.1289C1.6665 17.793 2.21663 18.3333 2.89697 18.3333L17.0994 18.3333C17.7798 18.3333 18.3332 17.793 18.3332 17.1322L18.3332 2.86783C18.3332 2.20377 17.7798 1.66666 17.0994 1.66666ZM6.61116 15.8691L4.1372 15.8691L4.13721 7.9134L6.61116 7.9134L6.61116 15.8691ZM5.37419 6.82942C4.57991 6.82942 3.93864 6.18814 3.93864 5.39713C3.93864 4.60611 4.57992 3.96483 5.37419 3.96483C6.1652 3.96483 6.80648 4.60611 6.80648 5.39713C6.80648 6.18489 6.1652 6.82942 5.37419 6.82942ZM15.869 15.8691L13.3983 15.8691L13.3983 12.0019C13.3983 11.0807 13.382 9.89257 12.1125 9.89257C10.8267 9.89257 10.6313 10.8984 10.6313 11.9368L10.6313 15.8691L8.1639 15.8691L8.1639 7.9134L10.5337 7.9134L10.5337 9.00064L10.5662 9.00064C10.895 8.37564 11.7023 7.71484 12.9035 7.71484C15.4067 7.71484 15.869 9.36197 15.869 11.5039L15.869 15.8691V15.8691Z"
      fill="currentColor"
    />
  </Svg>
);

export const UnflowMark = (props) => (
  <Svg
    {...props}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 2.5C10 1.11929 8.88071 1.55275e-06 7.5 1.31134e-06L2.5 4.37114e-07C1.11929 1.95703e-07 -1.95703e-07 1.11929 -4.37114e-07 2.5L-3.0598e-06 17.5C-3.30121e-06 18.8807 1.11929 20 2.5 20L7.5 20C8.88071 20 10 18.8807 10 17.5L10 16.2497C12.8625 16.2495 15.4039 14.8735 16.9983 12.7508C17.3093 12.3368 17.2257 11.7492 16.8117 11.4382C16.3978 11.1272 15.8101 11.2108 15.4991 11.6247C14.2436 13.2962 12.2479 14.3745 10 14.3747L10 2.5ZM3.18701 11.4382C3.601 11.1272 4.18869 11.2108 4.49965 11.6247C5.75523 13.2963 7.75187 14.3747 10 14.3747L10 16.2497C7.13723 16.2497 4.59494 14.8736 3.00046 12.7508C2.6895 12.3368 2.77302 11.7491 3.18701 11.4382Z"
      fill="currentColor"
    />
    <Path
      d="M11.875 6.875C11.875 7.91054 12.7145 8.75 13.75 8.75C14.7855 8.75 15.625 7.91054 15.625 6.875C15.625 5.83947 14.7855 5 13.75 5C12.7145 5 11.875 5.83947 11.875 6.875Z"
      fill="currentColor"
    />
  </Svg>
);

export const Bug = (props) => (
  <Svg
    {...props}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 1.75C8.20511 1.75 6.75003 3.20507 6.75003 5L6.75003 5.25593C6.00956 5.76417 5.39406 6.44127 4.95906 7.2317L4.43625 6.70889C3.89215 6.16479 3.70995 5.97577 3.58159 5.76631C3.45823 5.565 3.36732 5.34553 3.3122 5.11594C3.25485 4.87707 3.25003 4.61458 3.25003 3.84511L3.25003 3.33333C3.25003 2.91912 2.91425 2.58333 2.50003 2.58333C2.08582 2.58333 1.75003 2.91912 1.75003 3.33333L1.75003 3.84511L1.75002 3.93057C1.74983 4.58213 1.7497 5.03314 1.85364 5.46611C1.94551 5.84875 2.09702 6.21454 2.30263 6.55006C2.53529 6.92972 2.85428 7.24853 3.31513 7.70912L3.31514 7.70912L3.31514 7.70913L3.31515 7.70913L3.37559 7.76955L4.38084 8.7748C4.29516 9.16961 4.25003 9.57953 4.25003 10L4.25003 12.5C4.25003 12.6688 4.25731 12.836 4.27157 13.0011L3.37559 13.8971L3.31514 13.9575C2.85429 14.4181 2.53529 14.7369 2.30263 15.1166C2.09702 15.4521 1.94551 15.8179 1.85364 16.2006C1.74969 16.6335 1.74982 17.0845 1.75001 17.7361L1.75003 17.8216L1.75003 18.3333C1.75003 18.7475 2.08582 19.0833 2.50003 19.0833C2.91424 19.0833 3.25003 18.7475 3.25003 18.3333L3.25003 17.8216C3.25003 17.0521 3.25485 16.7896 3.3122 16.5507C3.36731 16.3211 3.45822 16.1017 3.58159 15.9004C3.70995 15.6909 3.89215 15.5019 4.43625 14.9578L4.68829 14.7057C5.55343 16.7867 7.60584 18.25 10 18.25C12.3942 18.25 14.4466 16.7867 15.3118 14.7057L15.5638 14.9578C16.1079 15.5019 16.2901 15.6909 16.4185 15.9004C16.5418 16.1017 16.6327 16.3211 16.6879 16.5507C16.7452 16.7896 16.75 17.0521 16.75 17.8216L16.75 18.3333C16.75 18.7475 17.0858 19.0833 17.5 19.0833C17.9142 19.0833 18.25 18.7475 18.25 18.3333L18.25 17.8216L18.25 17.7361C18.2502 17.0845 18.2504 16.6335 18.1464 16.2006C18.0546 15.8179 17.903 15.4521 17.6974 15.1166C17.4648 14.7369 17.1458 14.4181 16.6849 13.9575L16.6245 13.8971L15.7285 13.0011C15.7428 12.836 15.75 12.6688 15.75 12.5L15.75 10C15.75 9.57954 15.7049 9.16961 15.6192 8.77481L16.6245 7.76955L16.6849 7.70914C17.1458 7.24855 17.4648 6.92973 17.6974 6.55006C17.903 6.21454 18.0546 5.84875 18.1464 5.46612C18.2504 5.03314 18.2502 4.58213 18.25 3.93057L18.25 3.84511L18.25 3.33334C18.25 2.91912 17.9142 2.58334 17.5 2.58334C17.0858 2.58334 16.75 2.91912 16.75 3.33334L16.75 3.84511C16.75 4.61458 16.7452 4.87708 16.6879 5.11595C16.6327 5.34553 16.5418 5.565 16.4185 5.76632C16.2901 5.97577 16.1079 6.1648 15.5638 6.70889L15.041 7.23171C14.606 6.44128 13.9905 5.76417 13.25 5.25593L13.25 5C13.25 3.20508 11.795 1.75 10 1.75ZM11.6771 4.49841C11.4614 3.77636 10.7922 3.25 10 3.25C9.20786 3.25 8.53862 3.77636 8.32297 4.49841C8.85355 4.33688 9.41664 4.25 10 4.25C10.5834 4.25 11.1465 4.33688 11.6771 4.49841ZM10.75 12.5L10.75 16.684C12.7395 16.3298 14.25 14.5913 14.25 12.5L14.25 10C14.25 7.65279 12.3472 5.75 10 5.75C7.65282 5.75 5.75003 7.65279 5.75003 10L5.75003 12.5C5.75003 14.5913 7.26052 16.3298 9.25003 16.684L9.25003 12.5C9.25003 12.0858 9.58582 11.75 10 11.75C10.4142 11.75 10.75 12.0858 10.75 12.5Z"
      fill="currentColor"
    />
  </Svg>
);

export const Bulb = (props) => (
  <Svg
    {...props}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4.9165 7.50001C4.9165 4.69256 7.19239 2.41667 9.99984 2.41667C12.8073 2.41667 15.0832 4.69256 15.0832 7.50001C15.0832 8.85543 14.5537 10.0856 13.6887 10.9975C13.0281 11.694 12.32 12.5726 11.9707 13.6121C11.9532 13.6224 11.9339 13.6337 11.9129 13.6457C11.7934 13.714 11.6208 13.8061 11.414 13.898C10.9872 14.0877 10.4737 14.25 9.99997 14.25C9.52621 14.25 9.01263 14.0877 8.58578 13.898C8.37892 13.806 8.20633 13.714 8.08677 13.6457C8.06574 13.6337 8.04643 13.6224 8.02896 13.6121C7.67969 12.5726 6.97153 11.694 6.31093 10.9975C5.446 10.0856 4.9165 8.85543 4.9165 7.50001ZM8.24984 15.3831C8.73388 15.5734 9.35317 15.75 9.99997 15.75C10.6467 15.75 11.2659 15.5734 11.7498 15.3832L11.7498 15.8333C11.7498 16.7998 10.9663 17.5833 9.99983 17.5833C9.03334 17.5833 8.24984 16.7998 8.24984 15.8333L8.24984 15.3831ZM9.99984 0.916673C6.36396 0.916672 3.4165 3.86413 3.4165 7.5C3.4165 9.25461 4.10391 10.8503 5.2226 12.0297C6.11012 12.9655 6.74984 13.9211 6.74984 14.9258L6.74984 15.8333C6.74983 17.6283 8.20491 19.0833 9.99983 19.0833C11.7948 19.0833 13.2498 17.6283 13.2498 15.8333L13.2498 14.9258C13.2498 13.9211 13.8896 12.9655 14.7771 12.0297C15.8958 10.8503 16.5832 9.25461 16.5832 7.50001C16.5832 3.86413 13.6357 0.916674 9.99984 0.916673Z"
      fill="currentColor"
    />
  </Svg>
);

export const Book = (props) => (
  <Svg
    {...props}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.69666 1.97043C7.82171 2.17499 8.84898 2.56458 10 3.27536C11.151 2.56458 12.1783 2.17499 13.3033 1.97043C14.516 1.74995 15.8245 1.74998 17.4459 1.75L17.5 1.75C17.9142 1.75 18.25 2.08579 18.25 2.5L18.25 12.5C18.25 12.9142 17.9142 13.25 17.5 13.25C15.8131 13.25 14.6372 13.2525 13.5717 13.4462C12.5388 13.634 11.5918 14.0069 10.416 14.7907C10.1641 14.9587 9.8359 14.9587 9.58397 14.7907C8.40821 14.0069 7.46123 13.634 6.42833 13.4462C5.36277 13.2525 4.18691 13.25 2.5 13.25C2.08578 13.25 1.75 12.9142 1.75 12.5L1.75 2.5C1.75 2.30109 1.82902 2.11032 1.96967 1.96967C2.11032 1.82902 2.30109 1.75 2.5 1.75L2.55412 1.75C4.17549 1.74997 5.48403 1.74995 6.69666 1.97043ZM6.42834 3.44624C7.36165 3.61593 8.22482 3.9367 9.25 4.57525L9.25 12.8483C8.3885 12.4009 7.57219 12.1296 6.69666 11.9704C5.6624 11.7824 4.55838 11.7547 3.25 11.7507L3.25 3.25089C4.54924 3.25538 5.52815 3.28257 6.42834 3.44624ZM13.3033 11.9704C12.4278 12.1296 11.6115 12.4009 10.75 12.8483L10.75 4.57525C11.7752 3.9367 12.6383 3.61593 13.5717 3.44624C14.4719 3.28257 15.4508 3.25538 16.75 3.25089L16.75 11.7507C15.4416 11.7547 14.3376 11.7824 13.3033 11.9704ZM2.5 14.6667C2.08578 14.6667 1.75 15.0025 1.75 15.4167C1.75 15.8309 2.08578 16.1667 2.5 16.1667C4.14043 16.1667 5.31353 16.2701 6.36516 16.5569C7.40889 16.8416 8.37622 17.3189 9.58397 18.124C9.8359 18.292 10.1641 18.292 10.416 18.124C11.6238 17.3189 12.5911 16.8416 13.6348 16.5569C14.6865 16.2701 15.8596 16.1667 17.5 16.1667C17.9142 16.1667 18.25 15.8309 18.25 15.4167C18.25 15.0025 17.9142 14.6667 17.5 14.6667C15.8071 14.6667 14.4802 14.7716 13.2402 15.1098C12.128 15.4131 11.1207 15.8943 10 16.6052C8.87931 15.8943 7.87197 15.4131 6.75984 15.1098C5.51979 14.7716 4.1929 14.6667 2.5 14.6667Z"
      fill="currentColor"
    />
  </Svg>
);

export const Comment = (props) => (
  <Svg
    {...props}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.25 10C3.25 6.27208 6.27208 3.25 10 3.25C13.7279 3.25 16.75 6.27208 16.75 10C16.75 13.7279 13.7279 16.75 10 16.75L3.87279 16.75C3.96922 16.5802 4.04524 16.4263 4.10076 16.2799C4.2082 15.9967 4.29293 15.7485 4.33147 15.4736C4.37 15.1987 4.35678 14.9367 4.33134 14.6349C4.3098 14.3793 4.22485 14.0528 4.11294 13.6722C3.99647 13.2761 3.82869 12.7514 3.61069 12.0697L3.60732 12.0591C3.39554 11.3968 3.25 10.6879 3.25 10ZM1.75 17.5C1.75 17.3424 1.79861 17.1961 1.88166 17.0754C2.42416 16.2616 2.6164 15.9637 2.69829 15.7479C2.79994 15.4799 2.83219 15.3638 2.84599 15.2654C2.85979 15.1669 2.8607 15.0464 2.83664 14.7609C2.82966 14.6781 2.78994 14.4901 2.67387 14.0954C2.56298 13.7183 2.40063 13.2104 2.17858 12.5159C1.93619 11.7579 1.75 10.8894 1.75 10C1.75 5.44365 5.44365 1.75 10 1.75C14.5563 1.75 18.25 5.44365 18.25 10C18.25 14.5564 14.5563 18.25 10 18.25L2.5 18.25C2.08578 18.25 1.75 17.9142 1.75 17.5ZM6.66666 10.8333C7.1269 10.8333 7.5 10.4602 7.5 10C7.5 9.53976 7.1269 9.16667 6.66666 9.16667C6.20643 9.16667 5.83333 9.53976 5.83333 10C5.83333 10.4602 6.20643 10.8333 6.66666 10.8333ZM10.8333 10C10.8333 10.4602 10.4602 10.8333 10 10.8333C9.53976 10.8333 9.16666 10.4602 9.16666 10C9.16666 9.53976 9.53976 9.16667 10 9.16667C10.4602 9.16667 10.8333 9.53976 10.8333 10ZM13.3333 10.8333C13.7936 10.8333 14.1667 10.4602 14.1667 10C14.1667 9.53976 13.7936 9.16667 13.3333 9.16667C12.8731 9.16667 12.5 9.53976 12.5 10C12.5 10.4602 12.8731 10.8333 13.3333 10.8333Z"
      fill="currentColor"
    />
  </Svg>
);

export const Share = (props) => (
  <Svg
    {...props}
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.75 2.5C11.75 2.91421 12.0858 3.25 12.5 3.25H15.6893L9.46967 9.46967C9.17678 9.76256 9.17678 10.2374 9.46967 10.5303C9.76256 10.8232 10.2374 10.8232 10.5303 10.5303L16.75 4.31066V7.5C16.75 7.91421 17.0858 8.25 17.5 8.25C17.9142 8.25 18.25 7.91421 18.25 7.5V2.5C18.25 2.08579 17.9142 1.75 17.5 1.75H12.5C12.0858 1.75 11.75 2.08579 11.75 2.5ZM7.3 4.25L7.2679 4.25C6.45506 4.24999 5.79944 4.24999 5.26853 4.29336C4.7219 4.33803 4.24175 4.43238 3.79754 4.65873C3.09193 5.01825 2.51825 5.59193 2.15873 6.29754C1.93239 6.74175 1.83803 7.2219 1.79336 7.76853C1.74999 8.29944 1.74999 8.95506 1.75 9.76789L1.75 9.8V12.7L1.75 12.7321C1.74999 13.5449 1.74999 14.2006 1.79336 14.7315C1.83803 15.2781 1.93239 15.7582 2.15873 16.2025C2.51825 16.9081 3.09193 17.4817 3.79754 17.8413C4.24175 18.0676 4.7219 18.162 5.26853 18.2066C5.79944 18.25 6.45505 18.25 7.26788 18.25H7.3H10.2H10.2321C11.045 18.25 11.7006 18.25 12.2315 18.2066C12.7781 18.162 13.2582 18.0676 13.7025 17.8413C14.4081 17.4817 14.9817 16.9081 15.3413 16.2025C15.5676 15.7582 15.662 15.2781 15.7066 14.7315C15.75 14.2006 15.75 13.545 15.75 12.7321V12.7V11.6667C15.75 11.2525 15.4142 10.9167 15 10.9167C14.5858 10.9167 14.25 11.2525 14.25 11.6667V12.7C14.25 13.5525 14.2494 14.1467 14.2116 14.6093C14.1745 15.0632 14.1054 15.324 14.0048 15.5215C13.789 15.9448 13.4448 16.289 13.0215 16.5048C12.824 16.6054 12.5632 16.6745 12.1093 16.7116C11.6467 16.7494 11.0525 16.75 10.2 16.75H7.3C6.44755 16.75 5.85331 16.7494 5.39068 16.7116C4.9368 16.6745 4.67604 16.6054 4.47852 16.5048C4.05516 16.289 3.71095 15.9448 3.49524 15.5215C3.3946 15.324 3.32547 15.0632 3.28838 14.6093C3.25058 14.1467 3.25 13.5525 3.25 12.7V9.8C3.25 8.94755 3.25058 8.35331 3.28838 7.89068C3.32547 7.4368 3.3946 7.17604 3.49524 6.97852C3.71095 6.55516 4.05516 6.21095 4.47852 5.99524C4.67604 5.8946 4.9368 5.82546 5.39068 5.78838C5.85331 5.75058 6.44755 5.75 7.3 5.75H8.33333C8.74755 5.75 9.08333 5.41421 9.08333 5C9.08333 4.58579 8.74755 4.25 8.33333 4.25H7.3Z"
      fill="currentColor"
    />
  </Svg>
);
