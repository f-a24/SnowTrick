import React, { Component } from 'react';
import { Switch, Alert } from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Body,
  Title,
  Picker,
  Icon,
  Right,
  Button,
  Text
} from 'native-base';
import { stances, grabs, tricks } from './conf/trick';

export default class Jump extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stance: {
        name: stances[0],
        fix: false
      },
      trick: {
        name: tricks[0],
        fix: false
      },
      grab: {
        name: grabs[0],
        fix: false
      },
      buttonText: "Let's Try!!",
      interval: {}
    };
  }
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title>SnowTrick</Title>
          </Body>
        </Header>
        <Content>
          <Card>
            {['stance', 'trick', 'grab'].map((t, i) => (
              <CardItem key={t}>
              <Picker
                mode="dropdown"
                iosHeader="Select your SIM"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                selectedValue={this.state[t].name}
                onValueChange={e => { this.setState({ [t]: { name: e, fix: this.state[t].fix } }) }}
                >
                  { [stances, tricks, grabs][i].map(v => <Picker.Item key={v} label={v} value={v} />) }
                </Picker>
                <Right>
                  <Switch
                    value={this.state[t].fix}
                    onValueChange={ e => { this.setState({ [t]: { name: this.state[t].name, fix: e } }) } } />
                </Right>
              </CardItem>
            ))}
          </Card>
          <Button
            full
            dark
            onPress={() => {
              if(this.state.buttonText === "Let's Try!!"){
                this.setState({buttonText: 'STOP'});
                this.setState({
                  interval: setInterval(() => {
                    !this.state.stance.fix && this.setState({ stance: {name: stances[Math.floor(Math.random()*2)], fix: this.state.stance.fix}});
                    !this.state.grab.fix && this.setState({ grab: {name: grabs[Math.floor(Math.random()*6)], fix: this.state.grab.fix}});
                    !this.state.trick.fix && this.setState({ trick: {name: tricks[Math.floor(Math.random()*8)], fix: this.state.trick.fix}});
                  },50)
                });
              } else {
                this.setState({buttonText: "Let's Try!!"});
                clearInterval(this.state.interval);
                Alert.alert(Object.keys(this.state).filter(k => k !== 'buttonText').map(k => this.state[k].name).join(''));
              }
            }}
          >
            <Text>{this.state.buttonText}</Text>
          </Button>      
        </Content>
      </Container>
    );
  }
}
