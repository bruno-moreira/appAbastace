import React from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import CardView from 'react-native-cardview';
import Icon from 'react-native-vector-icons/AntDesign';

import feedsEstaticos from '../../assets/dicionarios/feeds.json';
import { 
        DescricaoProduto, 
        Likes, 
        NomeProduto, 
        PrecoProduto
     } from '../../assets/styles';

import slide1 from '../../assets/img/slide1.jpg';
import slide2 from '../../assets/img/slide2.jpg';
import slide3 from '../../assets/img/slide3.jpg';

export default class Detalhes extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            feedId: this.props.navigation.state.params.feedId,
            feed: null
        }
    }

    carregarFeed = () => {
        const { feedId } = this.state;

        const feeds = feedsEstaticos.feeds;
        const feedsFiltrados = feeds.filter((feed) => feed._id === feedId);

        if(feedsFiltrados.length){
            this.setState({
                feed: feedsFiltrados[0]
            });
        }
    }

    componentDidMount = () => {
        this.carregarFeed();
    }

    mostrarSlides = () => {
        const slides = [slide1, slide2, slide3];

        return(
            <SliderBox 
                dotColor={"#ffad05"}
                inactiveDotColor={"#5995ed"}
                
                resizeMethod={"resize"}
                resizeMode={"cover"}
               
                dotStyle={{
                    width: 15,
                    height: 15,
                    borderRadius: 15,
                    marginHorizontal: 5
                }}
             images={slides}/>
        );
    }

    render = () => {
        const { feed } = this.state;

        if(feed){
            return(
                <CardView 
                    cardElevation={2} 
                    cornerRadius={0}>
                    {this.mostrarSlides()}
                    <NomeProduto>{feed.gasolina.name}</NomeProduto>
                    <DescricaoProduto>{feed.gasolina.description}</DescricaoProduto>
                    <PrecoProduto> R$ {feed.gasolina.price}</PrecoProduto>
                    <Icon name="heart" size={18}>
                        <Likes>{feed.likes}</Likes>
                    </Icon>

                    <NomeProduto>{feed.etanol.name}</NomeProduto>
                    <DescricaoProduto>{feed.etanol.description}</DescricaoProduto>
                    <PrecoProduto> R$ {feed.etanol.price}</PrecoProduto>
                    <Icon name="heart" size={18}>
                        <Likes>{feed.likes}</Likes>
                    </Icon>

                    <NomeProduto>{feed.diesel.name}</NomeProduto>
                    <DescricaoProduto>{feed.diesel.description}</DescricaoProduto>
                    <PrecoProduto> R$ {feed.diesel.price}</PrecoProduto>
                    <Icon name="heart" size={18}>
                        <Likes>{feed.likes}</Likes>
                    </Icon>
                </CardView>
            );
        }else{
            return(null);
        }        
    }
}