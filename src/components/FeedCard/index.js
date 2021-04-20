import React from 'react';
import { Card, CardContent, CardImage } from 'react-native-cards';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
    Avatar,
    NomeEmpresa,
    PrecoProduto,
    Likes,
    EsquerdaDaMesmaLinha
} from '../../assets/styles';

import gasolina from '../../assets/img/gasolina.jpg';
import etanol from '../../assets/img/etanol.jpg';
import diesel from '../../assets/img/diesel.jpg';
import produto from '../../assets/img/PostoBrasil.jpg';

export default class FeedCard extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            feed: this.props.feed,
            navegador: this.props.navegador
        }
    }

    render = () => {
        const { feed, navegador } = this.state;

        return(
            <TouchableOpacity onPress={
                () => {
                    navegador.navigate('Detalhes', { feedId: feed._id })
                }
            }>
                <Card>
                    
                    <CardContent>  
                        <CardImage source={produto}/>                      
                        <NomeEmpresa>{feed.company.name}</NomeEmpresa>                        
                    </CardContent>
                    <CardContent>
                        <EsquerdaDaMesmaLinha>
                            <Avatar source={gasolina}/>
                            <PrecoProduto>{"R$" + feed.gasolina.price}</PrecoProduto>
                        </EsquerdaDaMesmaLinha>
                    </CardContent>
                    <CardContent>
                        <EsquerdaDaMesmaLinha>
                            <Avatar source={etanol}/>
                            <PrecoProduto>{"R$" + feed.etanol.price}</PrecoProduto>
                        </EsquerdaDaMesmaLinha>
                    </CardContent>
                    <CardContent>
                        <EsquerdaDaMesmaLinha>
                            <Avatar source={diesel}/>
                            <PrecoProduto>{"R$" + feed.diesel.price}</PrecoProduto>
                        </EsquerdaDaMesmaLinha>
                    </CardContent>
                    <CardContent>                        
                        <Icon name="heart" size={18}>
                            <Likes>{feed.likes}</Likes>
                        </Icon>
                    </CardContent>
                </Card>                
            </TouchableOpacity>
        );
    }
}