import { AuthPageData } from '../../core/layout/auth-layout/interfaces/auth-page-data';

export const authConfig: {
    login: AuthPageData;
    register: AuthPageData;
    forgotPassword: Record<number, AuthPageData>;
} = {
    login: {
        title: 'AUTH.LOGIN.TITLE',
        footerText: 'AUTH.LOGIN.FOOTER_TEXT',
        footerLinkText: 'AUTH.LOGIN.FOOTER_LINK',
        footerLinkRoute: '/auth/register',
    },
    register: {
        title: 'AUTH.REGISTER.TITLE',
        footerText: 'AUTH.REGISTER.FOOTER_TEXT',
        footerLinkText: 'AUTH.REGISTER.FOOTER_LINK',
        footerLinkRoute: '/auth/login',
    },
    forgotPassword: {
        1: {
            title: 'AUTH.FORGOT_PASSWORD.TITLE',
            description: 'AUTH.FORGOT_PASSWORD.DESCRIPTION',
            footerText: 'AUTH.FORGOT_PASSWORD.FOOTER_TEXT',
            footerLinkText: 'AUTH.FORGOT_PASSWORD.FOOTER_LINK',
            footerLinkRoute: '/auth/login',
            titleStyle: 'simple',
        },
        2: {
            title: '',
            description: '',
            titleStyle: 'simple',
        },
        3: {
            title: 'AUTH.RESET_PASSWORD.TITLE',
            description: 'AUTH.RESET_PASSWORD.SUBTITLE',
            footerText: 'AUTH.RESET_PASSWORD.FOOTER_TEXT',
            footerLinkText: 'AUTH.RESET_PASSWORD.FOOTER_LINK',
            footerLinkRoute: '/contact',
        },
    },
};
