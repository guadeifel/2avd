import axios, {AxiosResponse, AxiosError} from 'axios';
import React, {FormEvent, useState} from 'react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

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
  const [nomeevento, setNomeevento] = useState('');
  const [local, setLocal] = useState('');
  const [diasemana, setDiasemana] = useState('');
  const [horario, setHorario] = useState('');
  const [showLikeDislike, setShowLikeDislike] = useState({
    id: '',
    value: 0,
    type: ''
  });

  const [eventos, setEventos] = useState<IEvent[]>([]);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    axios({
      method: 'post',
      url: 'http://localhost:3333/events',
      data: {
        nomeevento,
        local,
        diasemana,
        horario
      }
    })
      .then((res: AxiosResponse<IEvent>)=>{
        setEventos([res.data, ...eventos]);
      })
      .catch((err: AxiosError) => {
        console.log(err)
      });
  }

  /* tirar na funcao pra nãõ ficar igual */
  function getAllEvents() {
    axios({
      method: 'get',
      url: 'http://localhost:3333/events'
    })
      .then((res: AxiosResponse<IEvent[]>)=>{
        setEventos(res.data);
      })
      .catch((err: AxiosError) => {
        console.log(err)
      });
  }

  function handleDelete(event: React.MouseEvent<HTMLButtonElement, MouseEvent> ,event_id: string) {
    axios({
      method: 'delete',
      url: 'http://localhost:3333/events/' + event_id
    })
      .then((res: AxiosResponse<string>)=>{
        /* altetar pra não ficar igual */
        const novos_eventos = eventos.filter((evento)=> evento.id !== event_id);
        setEventos(novos_eventos);
      })
      .catch((err: AxiosError) => {
        console.log(err)
      });
  }
  

  function handleLike(event: React.MouseEvent<HTMLButtonElement, MouseEvent> ,event_id: string) {
    axios({
      method: 'post',
      url: 'http://localhost:3333/events/like/' + event_id
    })
      .then((res: AxiosResponse<IEvent>)=>{
        setShowLikeDislike({
          id: res.data.id,
          value: res.data.like,
          type: 'like'
        });
      })
      .catch((err: AxiosError) => {
        console.log(err)
      });
  }

  function handleDislike(event: React.MouseEvent<HTMLButtonElement, MouseEvent> ,event_id: string) {
    axios({
      method: 'post',
      url: 'http://localhost:3333/events/dislike/' + event_id
    })
      .then((res: AxiosResponse<IEvent>)=>{
        setShowLikeDislike({
          id: res.data.id,
          value: res.data.dislike,
          type: 'dislike'
        });
      })
      .catch((err: AxiosError) => {
        console.log(err)
      });
  }

  useEffect(()=>{
    getAllEvents();
  },[])

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <input  type='text' name='nomeevento' onChange={(event) => setNomeevento(event.target.value) } placeholder='Nome do Evento' />
        <input  type='text' name='local' onChange={(event) => setLocal(event.target.value) } placeholder='Local do Evento' />
        <input  type='text' name='diasemana' onChange={(event) => setDiasemana(event.target.value) } placeholder='Dia da Semana' />
        <input  type='text' name="horario" onChange={(event) => setHorario(event.target.value) } placeholder="Horário" />
        <button type="submit">Salvar</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>nome do evento</th>
            <th>local</th>
            <th>diasemana</th>
            <th>horario</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <Link to="/total" >Total </Link>
        <tbody>
          {eventos.map((evento)=>{
            return (
              <tr key={evento.id} >
                <td>{evento.nomeevento}</td>
                <td>{evento.local}</td>
                <td>{evento.diasemana}</td>
                <td>{evento.horario}</td>
                <td>
                  <button onClick={(event)=> handleDelete(event,evento.id)} >Remover</button>
                  <button onClick={(event)=> handleLike(event,evento.id)} >Like</button>
                  <button onClick={(event)=> handleDislike(event,evento.id)} >Dislike</button>
                </td>
                <td>
                  {showLikeDislike.id === evento.id && (
                    <>
                      <p>{showLikeDislike.value}</p>
                      <p>{showLikeDislike.type}</p>
                    </>
                  )}
                </td>
              </tr>
              
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Dashboard



