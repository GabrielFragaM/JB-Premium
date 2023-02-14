import React, {useState} from 'react';
import {Form, Input, Button, Typography} from 'antd';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './LoginPageCss.css';

export default function LoginPage() {

    const { Title, Text } = Typography;
    const [loading, setLoading] = useState(false);

    async function authLogin(values){
        setLoading(true);
        const auth = getAuth();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            console.log(userCredential.user);
            sessionStorage.setItem('auth', JSON.stringify(true));
            window.location.reload();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div className='bodyLoginPage'>
            <div className="login-page">
                <div className="FormLogin">
                    <Form onFinish={(values) => authLogin(values)} className="login-form">
                        <Title level={2}>{'Entrar'}</Title>
                        <Text className='textInfo' type="secondary">{'Painel do Administrador JB Premium'}</Text>
                        <br></br>
                        <Text className='textInfo2' >.</Text>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Obrigatório',
                                },
                            ]}
                        >
                            <Input disabled={loading} type="text" className='InputForm'  placeholder={'Email'}/>
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Obrigatório',
                                },
                            ]}
                        >
                            <Input.Password disabled={loading} type="password" className='InputForm'  placeholder={'Senha'}/>
                        </Form.Item>
                        <Button loading={loading} type='primary' htmlType="submit" >{'Acessar'}</Button>'
                    </Form>
                </div>
            </div>
        </div>
    );
}
