import { DatePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useLazyQuery, gql } from "@apollo/client";
import moment from "moment";
import Chart from 'chart.js/auto';

ChartJS.register(ArcElement, Tooltip, Legend);


const OBTENER_DATOS = gql`
  query generarReporte($desde: String, $hasta: String) {
    generarReporte(desde: $desde, hasta: $hasta) {
      nombres
      ventas
      ventasRealizadas
    }
  }
`;

const Reportes = () => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Reporte de las ventas realizadas',
      },
    },
  };

  const [obtener, { loading }] = useLazyQuery(OBTENER_DATOS, {
    onCompleted: (data) => {
      console.log(data)
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
        label: 'Cantidad total de ventas  $',
        data: resultados?.ventas || [],
        backgroundColor: 'rgba(75, 192, 192, 1)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="col-md-7">
            <Bar data={datos} options={options} />
          </div>
        </div>
      </div>

    </>
  )
}

export default Reportes