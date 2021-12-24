import React from 'react';
import { Icon } from '@chakra-ui/icons';


export const HomeIcon = (props) => (
    <Icon viewBox='0 0 30 30' {...props}>
        <path d="M12.5 25V17.5H17.5V25H23.75V15H27.5L15 3.75L2.5 15H6.25V25H12.5Z" fill="black"/>
    </Icon>
);

export const AccountIcon = (props) => (
    <Icon viewBox='0 0 30 30' {...props}>
        <path d="M15 2.5C8.1 2.5 2.5 8.1 2.5 15C2.5 21.9 8.1 27.5 15 27.5C21.9 27.5 27.5 21.9 27.5 15C27.5 8.1 21.9 2.5 15 2.5ZM15 6.25C17.075 6.25 18.75 7.925 18.75 10C18.75 12.075 17.075 13.75 15 13.75C12.925 13.75 11.25 12.075 11.25 10C11.25 7.925 12.925 6.25 15 6.25ZM15 24C11.875 24 9.1125 22.4 7.5 19.975C7.5375 17.4875 12.5 16.125 15 16.125C17.4875 16.125 22.4625 17.4875 22.5 19.975C20.8875 22.4 18.125 24 15 24Z" fill="black"/>
    </Icon>
);

export const ExitIcon = (props) => (
    <Icon viewBox='0 0 30 30' {...props}>
        <path d="M23.75 23.75H6.25V6.25H15V3.75H6.25C4.8625 3.75 3.75 4.875 3.75 6.25V23.75C3.75 25.125 4.8625 26.25 6.25 26.25H23.75C25.125 26.25 26.25 25.125 26.25 23.75V15H23.75V23.75ZM17.5 3.75V6.25H21.9875L9.7 18.5375L11.4625 20.3L23.75 8.0125V12.5H26.25V3.75H17.5Z" fill="black"/>
    </Icon>
);

export const HeadsetIcon = (props) => (
    <Icon viewBox='0 0 30 30' {...props}>
        <path d="M15 1.25C8.7875 1.25 3.75 6.2875 3.75 12.5V21.25C3.75 23.325 5.425 25 7.5 25H11.25V15H6.25V12.5C6.25 7.6625 10.1625 3.75 15 3.75C19.8375 3.75 23.75 7.6625 23.75 12.5V15H18.75V25H22.5C24.575 25 26.25 23.325 26.25 21.25V12.5C26.25 6.2875 21.2125 1.25 15 1.25Z" fill="black"/>
    </Icon>
)

export const LinkedinIcon = (props) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path d="M22.071 0H1.929C0.864 0 0 0.864 0 1.929V22.071C0 23.136 0.864 24 1.929 24H22.071C23.136 24 24 23.136 24 22.071V1.929C24 0.864 23.136 0 22.071 0ZM22.071 22.08C8.637 22.077 1.92 22.074 1.92 22.071C1.923 8.637 1.926 1.92 1.929 1.92C15.363 1.923 22.08 1.926 22.08 1.929C22.077 15.363 22.074 22.08 22.071 22.08ZM3.558 8.997H7.119V20.451H3.558V8.997ZM5.34 7.431C6.477 7.431 7.404 6.507 7.404 5.367C7.404 5.09595 7.35061 4.82756 7.24689 4.57714C7.14316 4.32673 6.99113 4.09919 6.79947 3.90753C6.60781 3.71587 6.38027 3.56384 6.12986 3.46011C5.87944 3.35639 5.61105 3.303 5.34 3.303C5.06895 3.303 4.80056 3.35639 4.55014 3.46011C4.29973 3.56384 4.07219 3.71587 3.88053 3.90753C3.68887 4.09919 3.53684 4.32673 3.43311 4.57714C3.32939 4.82756 3.276 5.09595 3.276 5.367C3.273 6.507 4.197 7.431 5.34 7.431ZM12.909 14.784C12.909 13.29 13.194 11.844 15.045 11.844C16.869 11.844 16.896 13.551 16.896 14.88V20.451H20.454V14.169C20.454 11.085 19.788 8.712 16.185 8.712C14.454 8.712 13.293 9.663 12.816 10.563H12.768V8.997H9.351V20.451H12.909V14.784Z" fill="#393939"/>
    </Icon>
)

export const SpotifyIcon = (props) => (
    <Icon viewBox="0 0 24 24" {...props}>
        <path d="M12 0C5.4 0 0 5.4 0 12C0 18.6 5.4 24 12 24C18.6 24 24 18.6 24 12C24 5.4 18.66 0 12 0ZM17.521 17.34C17.281 17.699 16.861 17.82 16.5 17.58C13.68 15.84 10.14 15.479 5.939 16.439C5.521 16.561 5.16 16.26 5.04 15.9C4.92 15.479 5.22 15.12 5.58 15C10.14 13.979 14.1 14.4 17.22 16.32C17.64 16.5 17.699 16.979 17.521 17.34V17.34ZM18.961 14.04C18.66 14.46 18.12 14.64 17.699 14.34C14.46 12.36 9.54 11.76 5.76 12.96C5.281 13.08 4.74 12.84 4.62 12.36C4.5 11.88 4.74 11.339 5.22 11.219C9.6 9.9 15 10.561 18.72 12.84C19.081 13.021 19.26 13.62 18.961 14.04V14.04ZM19.081 10.68C15.24 8.4 8.82 8.16 5.16 9.301C4.56 9.48 3.96 9.12 3.78 8.58C3.6 7.979 3.96 7.38 4.5 7.199C8.76 5.939 15.78 6.179 20.221 8.82C20.76 9.12 20.94 9.84 20.64 10.38C20.341 10.801 19.62 10.979 19.081 10.68V10.68Z" fill="#04C35C"/>
    </Icon>
)