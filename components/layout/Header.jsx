import React from 'react'
import { Layout } from 'antd'
import { Button } from 'antd';
import { useRouter } from 'next/router'
const Header = () => {
    const { Header } = Layout;
    const router = useRouter();

    const cerrarSesion = () => {
        localStorage.removeItem("token")
        router.push("/")
    }
    return (
        <Header style={{ backgroundColor: "white" }} size="small" className="shadow-sm">
            <img src='../img/logo.jpeg'
                style={{ width: "60px" }}
                alt="logo"
                className='float-left'
            />
            <Button danger className='float-right mt-3' size='small' onClick={cerrarSesion}  > Cerrar sesión </Button>
        </Header>
    )
}

export default Header