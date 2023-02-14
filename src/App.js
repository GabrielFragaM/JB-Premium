import React, {useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLayout from './pages/PageLayout';
import LoginPage from './pages/auth/LoginPage';
import UsersPage from './pages/users/UsersPage';
import UsersDetailsPage from './pages/users/UsersDetailsPage';
import { initializeApp } from "firebase/app";

export default function App() {

    const [authConfirm, setAuthConfirm] = useState(false);

    const firebaseConfig = {
        apiKey: 'AIzaSyBBrL5wC7VJjIKYtZHKIyMLCx1bdpZgwh4',
        authDomain: 'o-bicho-b9eb5.firebaseapp.com',
        projectId: 'o-bicho-b9eb5',
        storageBucket: 'o-bicho-b9eb5.appspot.com',
        messagingSenderId: '222742091404',
        appId: '1:222742091404:web:3af29d7e840074fbaa8da9'
    };

    initializeApp(firebaseConfig);

    function checkAuth(){
        const auth = JSON.parse(sessionStorage.getItem('auth'));
        if(auth){
            setAuthConfirm(true);
        }else{
            setAuthConfirm(false);
        }
    }

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <React.Fragment>
            {
                authConfirm === true ?
                    <Routes>
                        <Route path="/" element={<PageLayout/>}>
                            <Route path="/allusers" element={<UsersPage />}/>
                            <Route path="/allusers/user" element={<UsersDetailsPage />}/>
                        </Route>
                    </Routes> :
                    <LoginPage/>
            }
        </React.Fragment>
    );
}
