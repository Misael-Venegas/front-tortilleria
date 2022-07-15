import { message } from 'antd'
import jwt_token from 'jwt-decode'

export const ObtnerDatosUsuario = () => {
    const obtnerDatosUsuario = () => {
        try {
            const token = localStorage.getItem('token');
            var datosUsuario = jwt_token(token)
            return datosUsuario.nombre+" "+datosUsuario.apellidoP+" "+ " "+ datosUsuario.apellidoM
        } catch (error) {
            message.error("Error al decodificar el token")
        }
    }

    return { obtnerDatosUsuario }
}
