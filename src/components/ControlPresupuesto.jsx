import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({ gastos, setGastos, presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0)

    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0 ) // Reduce es un Array method que toma 2 valores. El primero es el acumulado y otro es la instancia de gastos, el elemento sobre el cual esta iterando. Luego le indicamos que ira acumulando de la propiedad cantidad (gasto.cantidad) en el parametro "total". Finalmente indicamos el valor donde inicia (cero)

        const totalDisponible = presupuesto - totalGastado;

        // calcular el porcentaje gastado
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);

        setDisponible(totalDisponible)
        setGastado(totalGastado)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1000);
    }, [gastos] )

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-CL',{
            style: 'currency',
            currency: 'CLP'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar la App?')

        if(resultado){
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }


  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar 
                styles={buildStyles({
                    pathColor: porcentaje > 100 ? '#fd2055' : '#08fdd8' ,
                    trailColor: '#2b2b2b',
                    textColor: porcentaje > 100 ? '#fd2055' : '#08fdd8'
                })}
                value={porcentaje}
                text={`${porcentaje}% Gastado`}
            
            />
        </div>

        <div className="contenido-presupuesto">
            <button
                className='reset-app'
                type='button'
                onClick={handleResetApp}
            >
                
                Resetear App


            </button>
            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>
            <p className={`${disponible < 0 ? 'negativo' : ''}`} >
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>
            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>

    </div>
  )
}

export default ControlPresupuesto