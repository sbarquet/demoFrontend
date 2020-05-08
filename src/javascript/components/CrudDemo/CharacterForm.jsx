// ---Dependencys
import React from 'react';
import { Card, Row, Col, Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const genderOptions = [
  {
    label: 'Male',
    value: 'Male'
  },
  {
    label: 'Female',
    value: 'Female'
  },
  {
    label: 'Unknown',
    value: 'unknown'
  }
];

const statusOptions = [
  {
    label: 'Dead',
    value: 'Dead'
  },
  {
    label: 'Alive',
    value: 'Alive'
  },
  {
    label: 'Unknown',
    value: 'unknown'
  }
];

const mapOptions = options => {
  return options.map((element, i) => {
    return (
      <Option key={i} value={element.value}>
        {element.label}
      </Option>
    );
  });
};

const shortLabelItem = {
  labelCol: {
    sm: { span: 24 },
    md: { span: 4 }
  },
  wrapperCol: {
    sm: { span: 24 },
    md: { span: 19 }
  }
};

// ------------------------------------------ COMPONENT-----------------------------------------
const ShipmentForm = props => {
  const {
    handleForm,
    validation,
    defaultValue,
    onCloseForm,
    onSubmitForm,
    isEdit,
    editFlagChange,
    isDisabled
  } = props;

  function onChangeForm(objValue) {
    // console.log('onChangeForm', values);
    handleForm(objValue);
  }

  function onClose() {
    editFlagChange();
    onCloseForm();
  }

  const { name, status, gender, species, image, url } = validation;
  return (
    <>
      <Card className="form-card" title="Datos del personaje">
        <Form
          {...shortLabelItem}
          initialValues={defaultValue}
          onValuesChange={onChangeForm}
          onFinish={onSubmitForm}
        >
          <Row gutter={[0, 10]}>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                label="Name"
                name="name"
                validateStatus={name.status}
                help={name.status === 'error' ? name.message : null}
                rules={[{ required: true, message: name.message }]}
              >
                <Input disabled={isDisabled} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item
                label="Estado"
                name="status"
                validateStatus={status.status}
                help={status.status === 'error' ? status.message : null}
                rules={[{ required: true, message: status.message }]}
              >
                <Select disabled={isDisabled}>
                  {mapOptions(statusOptions)}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item
                label="Género"
                name="gender"
                validateStatus={gender.status}
                help={gender.status === 'error' ? gender.message : null}
                rules={[{ required: true, message: gender.message }]}
              >
                <Select disabled={isDisabled}>
                  {mapOptions(genderOptions)}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item label="Tipo" name="type">
                <Input disabled={isDisabled} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={12}>
              <Form.Item
                label="Especie"
                name="species"
                validateStatus={species.status}
                help={species.status === 'error' ? species.message : null}
                rules={[{ required: true, message: species.message }]}
              >
                <Input disabled={isDisabled} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                label="url Imagen"
                name="image"
                validateStatus={image.status}
                help={image.status === 'error' ? image.message : null}
                rules={[{ required: true, message: image.message }]}
              >
                <Input disabled={isDisabled} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} lg={24}>
              <Form.Item
                label="URL directa"
                name="url"
                validateStatus={url.status}
                help={url.status === 'error' ? url.message : null}
                rules={[{ required: true, message: url.message }]}
              >
                <Input disabled={isDisabled} />
              </Form.Item>
            </Col>
          </Row>
          {/* ------------------- Butons ------------------ */}
          <Row>
            <Col xs={24} sm={24} lg={8}>
              <div className="center-block">
                <Button type="danger" block onClick={onClose}>
                  Cancelar
                </Button>
              </div>
            </Col>
            {!isDisabled && (
              <Col xs={24} sm={24} lg={{ span: 8, offset: 8 }}>
                <div className="center-block">
                  <Button type="primary" htmlType="submit" block>
                    {isEdit ? 'Actualizar' : 'Agregar'}
                  </Button>
                </div>
              </Col>
            )}
          </Row>
        </Form>
      </Card>
      {/* Another close button */}
      <div
        onClick={onClose}
        role="button"
        tabIndex={0}
        className="close-transparent"
      />
    </>
  );
};

export default ShipmentForm;
