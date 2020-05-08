// ---Dependencys
import React, { useEffect, useReducer } from 'react';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// ---Components
import CharacterList from 'Comp/CrudDemo/CharacterList';
import CharacterForm from 'Comp/CrudDemo/CharacterForm';
// ---ComonComponents
import LoadingScreen from 'CommonComps/LoadingScreen';
// ---Others
import {
  getAll,
  deleteOne,
  insertOne,
  getOne,
  editOne
} from 'Others/peticiones';
import { formValidSchema, formValidate } from 'Others/data-model-forms';

const { confirm } = Modal;

const typesR = {
  GET_ALL: 'GET_ALL',
  SET_LOADING: 'SET_LOADING',
  HANDLE_FORM: 'HANDLE_FORM',
  SET_VIEW_FORM: 'SET_VIEW_FORM',
  SET_ERROR_FORM: 'SET_ERROR_FORM',
  SET_VALID_FORM: 'SET_VALID_FORM',
  OPEN_EDIT: 'OPEN_EDIT',
  NOT_EDIT: 'NOT_EDIT',
  JUST_READ: 'JUST_READ'
};

function reducerCrudDemo(state, action) {
  switch (action.type) {
    case typesR.GET_ALL:
      return { ...state, currentList: action.payload, loading: false };
    case typesR.SET_LOADING:
      return { ...state, loading: true };
    case typesR.HANDLE_FORM:
      return { ...state, form: { ...state.form, ...action.payload } };
    case typesR.SET_VIEW_FORM:
      return { ...state, viewForm: !action.payload };
    case typesR.SET_ERROR_FORM:
      return { ...state, isValidForm: false, errorSchema: action.payload };
    case typesR.SET_VALID_FORM:
      return { ...state, isValidForm: true, errorSchema: formValidSchema };
    case typesR.OPEN_EDIT:
      return { ...state, form: action.payload, isEdit: true };
    case typesR.NOT_EDIT:
      return { ...state, form: {}, isEdit: false, isDisabled: false };
    case typesR.JUST_READ:
      return { ...state, isDisabled: true };
    default:
      return state;
  }
}

// ------------------------------------------ COMPONENT-----------------------------------------
const CrudDemo = () => {
  const [state, dispatch] = useReducer(reducerCrudDemo, {
    viewForm: false,
    currentList: [],
    isEdit: false,
    isValidForm: true,
    isDisabled: false,
    loading: false,
    form: {},
    errorSchema: formValidSchema
  });

  // get character list on render 1st time
  useEffect(() => {
    dispatch({ type: typesR.SET_LOADING });
    refreshList();
  }, []);

  function refreshList() {
    getAll().then(response => {
      dispatch({ type: typesR.GET_ALL, payload: response.data });
    });
  }

  function insertCharacter() {
    const { form } = state;
    dispatch({ type: typesR.SET_LOADING });
    insertOne(form).then(() => {
      refreshList();
      dispatch({ type: typesR.SET_VIEW_FORM, payload: state.viewForm });
    });
  }

  function editCharacter() {
    const { form } = state;
    dispatch({ type: typesR.SET_LOADING });
    editOne(form).then(response => {
      console.log('editCharacter response: ', response);
      refreshList();
      dispatch({ type: typesR.SET_VIEW_FORM, payload: state.viewForm });
    });
  }

  function handleForm(obj) {
    dispatch({ type: typesR.HANDLE_FORM, payload: obj });
    dispatch({ type: typesR.SET_VALID_FORM });
  }

  function onDeleteCh(id) {
    deleteOne(id).then(() => {
      refreshList();
    });
  }

  function onOpenEditCh(id) {
    getOne(id).then(response => {
      dispatch({ type: typesR.OPEN_EDIT, payload: response.data });
      dispatch({ type: typesR.SET_VIEW_FORM, payload: state.viewForm });
      window.scrollTo(0, -100000);
    });
  }

  function onCloseForm() {
    const { viewForm } = state;
    dispatch({ type: typesR.SET_VIEW_FORM, payload: viewForm });
  }

  function editFlagChange() {
    dispatch({ type: typesR.NOT_EDIT });
  }

  function openDetalles(id) {
    dispatch({ type: typesR.JUST_READ });
    onOpenEditCh(id);
  }

  function confirmDelete(idString) {
    confirm({
      title: '¿Quieres borrar el personaje?',
      icon: <ExclamationCircleOutlined />,
      content: 'Confirmación',
      onOk() {
        onDeleteCh(idString);
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  }

  function submitForm() {
    const { form, isEdit } = state;
    const validation = formValidate(form);
    if (validation.isValid) {
      dispatch({ type: typesR.SET_VALID_FORM });
      if (isEdit) {
        editCharacter();
        editFlagChange();
      } else {
        insertCharacter();
      }
    } else {
      console.log('LLegó aquí', isEdit);
      dispatch({
        type: typesR.SET_ERROR_FORM,
        payload: validation.errorStructure
      });
    }
  }

  return (
    <div className="app-container">
      <Button type="dashed" block onClick={onCloseForm}>
        Agregar Personaje
      </Button>
      {state.viewForm && (
        <CharacterForm
          defaultValue={state.form}
          isEdit={state.isEdit}
          isDisabled={state.isDisabled}
          editFlagChange={editFlagChange}
          handleForm={handleForm}
          validation={state.errorSchema}
          onCloseForm={onCloseForm}
          onSubmitForm={submitForm}
        />
      )}
      {state.loading ? (
        <LoadingScreen />
      ) : (
        <CharacterList
          currentList={state.currentList}
          confirmDelete={confirmDelete}
          refreshList={refreshList}
          onOpenEditCh={onOpenEditCh}
          openDetalles={openDetalles}
        />
      )}
    </div>
  );
};

export default CrudDemo;
