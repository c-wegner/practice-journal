import React, { Fragment } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { Panel } from '../components/panels/panel'
import { PivotPage, PivotProvider } from '../components/pivot/pivot.main'
import { Dropdown, TextArea, TextBox } from '../controls'
import { FormProvider } from '../controls/forms.context'
import { Col, Row } from '../globals/styles'
import { Client, ClientsContext } from '../models'
import { ClientForm } from '../forms/client.forms'
import { ProjectForm } from '../forms/project.forms'
import { useContext } from 'react'
import { ClientCard } from '../components/card/client.card'



const BS = styled.div`
  width: 50%;
`


export const Practice = () => {
  const [panelTest, setPanelTest] = useState('Hi')
  const [currentClient, setCurrentClient] = useState(new Client())

  const book = useContext(ClientsContext)

  const handleClientSelect=(client)=>{
    if(currentClient.id === client.id){
      setCurrentClient(new Client())
    }else{
      setCurrentClient(client)
    }
  }

  return (
<Fragment>
<Row>
      <Col>
        {
          book._clients.map(x=>{
            return(
              <ClientCard client={x} currentClient={currentClient} onSelectClient={()=>handleClientSelect(x)}/>
            )
          })
        }
      </Col>
<Col>

</Col>
      <Col>
      
      </Col>
    </Row>

    <Row>
      <ClientForm obj={currentClient}/>
    </Row>
</Fragment>
  )
}