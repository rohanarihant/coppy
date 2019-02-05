
export default {
    // Top Tab Navbar
    navbarProps: {
        navigationBarStyle: { backgroundColor: 'white' },
        titleStyle: {
            color: "#000",
            alignSelf: 'center',
            letterSpacing: 2,
            fontSize: 15,
        },
        backButtonTintColor: "#000",
    },

    // Single Tab
    tabProps: {
        swipeEnabled: false,
        tabBarStyle: { backgroundColor: '#ffffff' },
    },

    // Icons
    icons: {
        style: { color: 'purple', height: 30, width: 30 },
    },

    selectedIcon: {
        color: '#3C4858', height: 30, width: 30,
    },

    unselectedIcon: {
        color: '#C0CCDA', height: 30, width: 30,
    },
};
