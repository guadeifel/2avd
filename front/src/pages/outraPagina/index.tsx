import axios, { AxiosResponse, AxiosError } from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';

interface IEvent {
  id: string;
  nomeevento: string;
  local: string;
  diasemana: string;
  horario: string;
  like: number;
  dislike: number;
}

const Dashboard: React.FC = () => {
  const [eventos, setEventos] = useState<IEvent[]>([]);
  const [objLocal, setObjLocal] = useState({});
  const [objDiadasemana, setObjDiadasemana] = useState({});

  /* tirar na funcao pra nãõ ficar igual */
  function getAllEvents() {
    axios({
      method: 'get',
      url: 'http://localhost:3333/events'
    })
      .then((res: AxiosResponse<IEvent[]>) => {
        setEventos(res.data);
        let objLocal: { [key: string]: number } = {};
        let objDiadasemana: { [key: string]: number } = {};

        res.data.forEach(evento => {
          if (!objLocal.hasOwnProperty(evento.local)) {
            objLocal[evento.local] = 1;
          } else {
            objLocal[evento.local]++;
          }

          if (!objDiadasemana.hasOwnProperty(evento.diasemana)) {
            objDiadasemana[evento.diasemana] = 1;
          } else {
            objDiadasemana[evento.diasemana]++;
          }

        });
        setObjLocal(objLocal);
        setObjDiadasemana(objDiadasemana);
      })
      .catch((err: AxiosError) => {
        console.log(err)
      });
  }


  useEffect(() => {
    getAllEvents();
  }, [])

  return (
    <div>
      total de eventos: {eventos.length}
      {Object.entries(objLocal).map((entries: [string, any]) => {
        return (
          <p key={entries[0]} >
            <span>{entries[0]}</span> / <span>{entries[1]}</span>
          </p>
        )
      })}

      {Object.entries(objDiadasemana).map((entries: [string, any]) => {
        return (
          <p key={entries[0]} >
            <span>{entries[0]}</span> / <span>{entries[1]}</span>
          </p>
        )
      })}
    </div>
  )
}

export default Dashboard



