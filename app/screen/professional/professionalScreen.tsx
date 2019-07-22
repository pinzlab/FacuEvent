import React from 'react';
import { Container, Content, Button } from 'native-base';
import { Right, Body, Icon, Text, Spinner } from 'native-base';
import { Card, Thumbnail, List, ListItem } from 'native-base';
import  ProfessionalService  from '../../service/ProfessionalService';
import { color } from '../../util/config';


export default class ProfessionalScreen extends React.Component {

    public professional: any;
    public props: any
    public state: any = {
        // state of charge of events
        isLoading: true
    }

    componentDidMount() {
        let service: ProfessionalService = new ProfessionalService()
        service.getById(this.props.id)
            .then((res: any) => {
                this.professional = res.professional
                this.setState({
                    isLoading: false,
                }, () => {
                    this.state.isLoading = false;
                });
            })
            .catch((err: any) => {
                console.error(err);
            });
    }



    render() {
        let worksListView: any = [];
        if (this.professional !== undefined)
            this.professional.works.forEach((work: any, index: number) => {
                worksListView.push(
                    <ListItem key={index}>
                        <Body><Text>{work.name}</Text></Body>
                    </ListItem>
                )
            })
        return (
            <Container>
                {
                    !this.state.isLoading
                        ? (<Content>
                            <Card transparent style={{ alignItems: 'center' }}>
                                <Thumbnail style={{ width: 150, height: 150 }} source={{ uri: this.professional.image }} />
                            </Card>
                            <List>
                                <ListItem itemHeader first>
                                    <Text>Información personal</Text>
                                </ListItem>
                                <ListItem >
                                    <Body>
                                        <Text>Nombre Completo</Text>
                                        <Text note>{this.professional.lastName} {this.professional.firstName}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem >
                                    <Body>
                                        <Text>Educación</Text>
                                        <Text note>{this.professional.education}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem >
                                    <Body>
                                        <Text>Título</Text>
                                        <Text note>{this.professional.collegeDegree}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem >
                                    <Body>
                                        <Text>Especialización</Text>
                                        <Text note>{this.professional.specialization}</Text>
                                    </Body>
                                </ListItem>
                                <ListItem >
                                    <Body>
                                        <Text>Años de Experiencia</Text>
                                        <Text note>{this.professional.experience}</Text>
                                    </Body>
                                </ListItem>
                                {(this.professional.works.length > 0) ? (
                                    <ListItem itemHeader first>
                                        <Text>Experiencias</Text>
                                    </ListItem>
                                ) : null}
                                {worksListView}
                            </List>
                        </Content>
                        )
                        : (
                            <Content>
                                <Spinner />
                            </Content>
                        )
                }

            </Container>
        );
    }
}
