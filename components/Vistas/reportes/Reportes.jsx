import { DatePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useLazyQuery, gql } from "@apollo/client";
import moment from "moment";



ChartJS.register(ArcElement, Tooltip, Legend);

const fondos = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)',
];

const bordes = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)',
];

const OBTENER_DATOS = gql`
  query generarReporte($desde: String, $hasta: String) {
    generarReporte(desde: $desde, hasta: $hasta) {
      nombres
      ventas
    }
  }
`;

const Reportes = () => {

  const [obtener, { loading }] = useLazyQuery(OBTENER_DATOS, {
    onCompleted: (data) => {
      if (data) {
        setResultados(data.generarReporte);
      }
    }
  });

  const [resultados, setResultados] = useState(null);

  const [desde, setDesde] = useState(moment());
  const [hasta, setHasta] = useState(moment());

  

  useEffect(() => {
    obtener({
      variables: {
        desde: desde.format('YYYY-MM-DD'),
        hasta: hasta.format('YYYY-MM-DD')
      }
    })
  }, [desde, hasta]);


  const datos = {
    labels: resultados?.nombres || [],
    datasets: [
      {
        label: 'Repartidores',
        data: resultados?.ventas || [],
        backgroundColor: fondos,
        borderColor: bordes,
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h5 className='text-muted'>Ventas por repartidor</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="form-group">
            <label>Desde</label>
            <DatePicker className='w-100' value={desde} onChange={(e) => setDesde(e)} allowClear={false} />
          </div>
        </div>

        <div className="col-md-3">
          <div className="form-group">
            <label>Hasta</label>
            <DatePicker className='w-100' value={hasta} onChange={(e) => setHasta(e)} allowClear={false} />
          </div>
        </div>
      </div>

      <div className="row mt-5 ">
        <div style={{display: 'flex',  justifyContent: 'center' }}>
          <div className="col-md-4">
            <Pie data={datos} />
          </div>
        </div>
      </div>

    </>
  )
}

export default Reportes