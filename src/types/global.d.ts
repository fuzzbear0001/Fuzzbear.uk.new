interface siteConfig {
    name: string;
    description: string;
    links: {
        github: string;
        tiktok: string;
        discord: string;
        donate: string;
    };
    navItems: NavItem[];
}

interface NavItem {
    key: string;
    label: string;
    goto: string;
}

declare global {
    interface Window {
        siteConfig: siteConfig;
    }
}