import React from 'react';
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Actions } from 'react-native-router-flux';
import { Container, Content, Button } from 'native-base';
import { Right, Body, Left, Icon, Text, Spinner } from 'native-base';
import { Card, Thumbnail, List, ListItem } from 'native-base';
import { View, Form, Item, Label, Input } from 'native-base';
import ToolBar from '../../component/ToolBar'
import { color } from '../../util/config';
import UserService from '../../service/UserService';


export default class EditProfileScreen extends React.Component {

    public props: any
    public state: any = {}

    async componentDidMount() {
        this.setState({
            emailAddress: this.props.user.emailAddress,
            firstName: this.props.user.firstName,
            id: this.props.user.id,
            image: this.props.user.image,
            lastName: this.props.user.lastName,
            telephone: this.props.user.telephone,
        })
    }


    private async getPermission() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        return status;
    }
    private async changeAvatar() {
        if (await this.getPermission() === 'granted') {
            let result: any = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
            });

            if (!result.cancelled) {
                const image: any = {
                    uri: result.uri,
                    type: 'image/jpeg',
                    name: 'testPhotoName'
                }
                const formData = new FormData()
                formData.append('image', image)
                const service: UserService = new UserService()
                service.updateAvatar(formData)
                    .then((res: any) => this.setState({ image: res.url }))
                    .catch((err: any) => { console.log(err) })
            }
        }
    }

    private isValid(): boolean {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //email validator
        let isValid: boolean = false;
        this.setState({
            lastNameError: (this.state.lastName === undefined || this.state.lastName === '') ? true : false,
            firstNameError: (this.state.firstName === undefined || this.state.firstName === '') ? true : false,
            emailError: (this.state.emailAddress === undefined || reg.test(this.state.emailAddress) === false || this.state.emailAddress === '') ? true : false,
            // telephoneError: (this.state.password === undefined) ? true : false,
        })
        isValid = (
            (this.state.lastName !== undefined && this.state.lastName !== '') &&
            (this.state.firstName !== undefined && this.state.firstName !== '') &&
            (this.state.emailAddress !== undefined && this.state.emailAddress !== '') &&
            reg.test(this.state.emailAddress)  //if is a valid email
        )
        return isValid;
    }



    public async update() {
        const service: UserService = new UserService()
        if (this.isValid())
            service.updateProfile(
                this.state.lastName,
                this.state.firstName,
                this.state.telephone)
                .then((res: any) => {
                    Actions.replace('settingsScreen')
                })
                .catch((err: any) => { console.log(err) })

    }


    render() {

        return (
            <Container>
                <ToolBar title="Mi Perfil" subtitle="Información Personal" />
                <Content>
                    <List>
                        <ListItem avatar onPress={() => this.changeAvatar()}>
                            <Left>
                                <Thumbnail source={(this.state.image) ? { uri: this.state.image } : require('../../../assets/user.png')} />
                            </Left>
                            <Body>
                                <Text>Mi cuenta</Text>
                                <Text note>{this.props.user.lastName} {this.props.user.firstName}</Text>
                            </Body>
                            <Right>
                                <Button transparent>
                                    <Icon name='camera' style={{ color: color.secondary }} />
                                </Button>
                            </Right>
                        </ListItem>
                    </List>
                    <Form>
                        <Item floatingLabel error={this.state.lastNameError}>
                            <Label>Apellidos</Label>
                            <Input onChangeText={(lastName) => this.setState({ lastName })} value={this.state.lastName} />
                            {(this.state.lastNameError) ? (
                                <Icon name='close-circle' />
                            ) : null}
                        </Item>
                        <Item floatingLabel last error={this.state.firstNameError}>
                            <Label>Nombres</Label>
                            <Input onChangeText={(firstName) => this.setState({ firstName })} value={this.state.firstName} />
                            {(this.state.firstNameError) ? (
                                <Icon name='close-circle' />
                            ) : null}
                        </Item>
                        <Item floatingLabel last error={this.state.telephoneError}>
                            <Label>Teléfono</Label>
                            <Input onChangeText={(telephone) => this.setState({ telephone })} value={this.state.telephone} />
                            {(this.state.telephoneError) ? (
                                <Icon name='close-circle' />
                            ) : null}
                        </Item>
                        <Item floatingLabel last error={this.state.emailError}>
                            <Label>Correo Electrónico</Label>
                            <Input disabled onChangeText={(emailAddress) => this.setState({ emailAddress })} value={this.state.emailAddress} />
                            {(this.state.emailError) ? (
                                <Icon name='close-circle' />
                            ) : null}
                        </Item>
                    </Form>
                    <View style={{ alignItems: 'center', marginHorizontal: 10, marginTop: 50 }}>
                        <Button full rounded style={{ backgroundColor: color.primary }} onPress={() => this.update()}>
                            <Text>Guardar</Text>
                        </Button>
                    </View>
                </Content>
            </Container>
        );
    }
}
