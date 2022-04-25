import React from "react"
import Swal from "sweetalert2";



const FetchAPI = async (servidor1, servidor2) => {
    const datos = fetch(servidor1)
        .then(res => res.json())
        .then(obj => {
            // console.log(obj)
            return obj
        })
        .catch(err => {
            if (err) return FetchAPI(servidor2, servidor1);
        })
    return datos

}
const POSTAPI = async (obj, servidor1, servidor2) => {


    const datos = fetch(servidor1, obj)
        .then(res => res.json())
        .then(obj => {
            return obj
        })
        .catch(err => {
            if (err) return POSTAPI(obj, servidor2, servidor1);
        })
    return datos

}


const Vista = () => {
    const [nombre, setNombre] = React.useState();
    const [resultados, setResultados] = React.useState();
    const actualizar = async () => {
        FetchAPI("http://localhost:5000/", "http://192.168.96.249:5000/").then((datos) => {
            console.log(datos)
            setResultados(datos.reverse())
        })
    }

    const ingresar = (e) => {
        e.preventDefault()

        const obj = {
            nombre: nombre,
        }

        const data = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }

        POSTAPI(data, "http://localhost:5000/", "http://192.168.96.249:5000/").then((datos) => {
            Swal.fire('Agregado');
            actualizar();
            setNombre('');

        })
            .catch((err) => {
                Swal.fire('No se pudo agregar, intentalo más tarde');
            })
    }
    return (
        <>
            <center><h1 class="mt-3">CONEXION BASE DE DATOS</h1></center>
            <div class="container">
                <div class="row">
                    <div class="col-4">
                        <form onSubmit={ingresar}>
                            <input type="text" onChange={e => setNombre(e.target.value)} class="form-control mt-3" placeholder="Nombre" value={nombre} />
                            <button type="submit" class="btn btn-outline-primary mt-3 form-control">Enviar</button>
                        </form>
                    </div>

                    <div class="col-8">
                        <table class="table table-dark mt-4">
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">name</th>
                                    <th scope="col">Last Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!resultados ? <tr>
                                </tr> : resultados.map((obj => {
                                    return (
                                        <tr>
                                            <th scope="row">{obj.language_id}</th>
                                            <td>{obj.name}</td>
                                            <td>{obj.last_update}</td>
                                        </tr>
                                    )
                                }))}
                            </tbody>
                        </table>
                        <button onClick={actualizar} class="btn btn-outline-success form-control">Refrescar</button>
                    </div>
                </div>
            </div>

        </>

    )
}
export default Vista