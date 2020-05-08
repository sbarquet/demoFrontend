/* eslint-disable react/display-name */
// ---Dependencys
import React from 'react';
// ---Components
import { Button, Table } from 'antd';
// ---Others
// import { getALLLaptops } from 'Others/peticiones';

const CharacterList = props => {
  const { currentList, confirmDelete, onOpenEditCh, openDetalles } = props;

  function handleDelete(e) {
    confirmDelete(e.target.value);
  }
  const editOpen = e => {
    onOpenEditCh(e.target.value);
  };

  function handleDetails(e) {
    openDetalles(e.target.value);
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Especie',
      dataIndex: 'species',
      key: 'species'
    },
    {
      title: 'Detalles',
      dataIndex: 'id',
      key: 'id',
      render: id => (
        <Button onClick={handleDetails} value={id} type="dashed">
          Ver Detalles
        </Button>
      )
    },
    {
      title: 'Borrar',
      dataIndex: 'id',
      key: 'id',
      render: id => (
        <Button onClick={handleDelete} value={id} type="danger">
          Borrar
        </Button>
      )
    },
    {
      title: 'Editar',
      dataIndex: 'id',
      key: 'id',
      render: id => (
        <Button onClick={editOpen} value={id} type="primary">
          Editar
        </Button>
      )
    },
    {
      title: 'Foto',
      dataIndex: 'image',
      key: 'image',
      render: image => (
        <span>
          <img src={image} alt="Demo" width="100px" />
        </span>
      )
    }
  ];
  return (
    <React.Fragment>
      <Table
        pagination={{
          current: 1,
          pageSize: 40
        }}
        dataSource={currentList}
        columns={columns}
      />
    </React.Fragment>
  );
};

export default CharacterList;
