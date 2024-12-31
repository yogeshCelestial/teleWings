export const verifyAuth = async (): Promise<boolean> => {
    try {
        const response = await fetch('http://localhost:9000/api/auth/verify', {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        });

        if (response.status === 200) {
            const data = await response.json();
            localStorage.setItem('userInfo', JSON.stringify(data?.user)); // Store user info
            return true; // User is authenticated
        } else {
            return false; // Not authenticated
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        localStorage.removeItem('userInfo');
        return false; // In case of an error, treat it as unauthenticated
    }
};

export const logOut = (setIsAuthenticated: (isAuth: boolean) => void) => {
    fetch('http://localhost:9000/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
    })
        .then((response) => {
            if (response.status === 200) {
                setIsAuthenticated(false);
                return response.json();
            } else {
                console.log('Not able to logout');
            }
        })
        .then(() => {
            localStorage.removeItem('userInfo');
        });
};