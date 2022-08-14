import React, { useState } from 'react'
import { Layout } from 'antd'
import { Avatar, Dropdown, Menu } from 'antd';
import { useRouter } from 'next/router'
import { UserOutlined } from '@ant-design/icons';
import ModalEnvarContrasenhia from './ModalEnvarContrasenhia';

const Header = () => {
    const [openModal, setopenModal] = useState(false)
    const { Header } = Layout;
    const router = useRouter();

    const cerrarSesion = () => {
        localStorage.removeItem("token")
        router.push("/")
    }

    const menu = (
        <Menu
            items={[
                {
                    key: 1,
                    label: (
                        <span onClick={() => setopenModal(true)} >Cambiar contraseña</span>
                    )
                },
                {
                    key: 2,
                    label: (
                        <span onClick={() => cerrarSesion()} >Cerrar sesión</span>
                    )
                }
            ]}
        />

    )

    console.log(openModal)
    return (
        <>
            <Header style={{ backgroundColor: "white" }} size="small" className="shadow-sm">
                <img src='../img/logo.jpeg'
                    style={{ width: "60px" }}
                    alt="logo"
                    className='float-left'
                />
                {
                    //    <Button danger className='float-right mt-3' size='small' onClick={cerrarSesion}  > Cerrar sesión </Button>
                }
                <Dropdown overlay={menu} >
                    <Avatar className='float-right mt-3 seleccionarComponente' size='large' style={{ backgroundColor: "#40A9FF" }} icon={<UserOutlined />} />
                </Dropdown>

            </Header>
            <ModalEnvarContrasenhia openModal={openModal} setOpenModal={setopenModal} />
        </>
    )
}

export default Header