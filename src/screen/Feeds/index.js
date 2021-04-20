import React from 'react';
import { FlatList, View} from 'react-native';
import { Header } from 'react-native-elements';
import DrawerLayout from 'react-native-drawer-layout';

import Icon from 'react-native-vector-icons/AntDesign';
import feedsEstaticos from '../../assets/dicionarios/feeds.json';
import FeedCard from '../../components/FeedCard';

import { EntradaNomeProduto, CentralizadoNaMesmaLinha } from '../../assets/styles';
import Menu from '../../components/Menu';

const FEEDS_POR_PAGINA = 4;

export default class Feeds extends React.Component{
    
    constructor(props) {
        super(props);

        this.filtarPorEmpresa = this.filtarPorEmpresa.bind(this);

        this.state = {
            proximaPagina: 0,
            feeds: [],

            empresaEscolhida: null,
            nomeProduto: null,
            atualizando: false,
            carregando: false
        };
    }

    carregarFeeds = () => {
        const { proximaPagina, feeds, nomeProduto, empresaEscolhida } = this.state;

        //avisa que está carregando
        this.setState({
            carregando: true
        });

        //filtragem pela empresa
        if(empresaEscolhida){
            const maisFeeds = feedsEstaticos.feeds.filter((feed) => 
                feed.company._id == empresaEscolhida._id);
           
            this.setState({
                feeds: maisFeeds,

                atualizando: false,
                carregando: false
            });
        }else if(nomeProduto){
            const maisFeeds = feedsEstaticos.feeds.filter((feed) => 
                feed.product.name.toLowerCase().includes(nomeProduto.toLowerCase()));
           
            this.setState({
                feeds: maisFeeds,

                atualizando: false,
                carregando: false
            });
        } else{  
            //carregar o total de feeds por pagina da atual
            const idInicial = proximaPagina * FEEDS_POR_PAGINA + 1;
            const idFinal = idInicial + FEEDS_POR_PAGINA - 1;
            const maisFeeds = feedsEstaticos.feeds.filter((feed) => feed._id >= idInicial && 
                feed._id <= idFinal);
            if(maisFeeds.length){
                console.log("adicionando " + maisFeeds.length + " feeds");

                //incrementar a pagina e guardar os feeds
                this.setState({
                    proximaPagina: proximaPagina + 1,
                    feeds: [...feeds, ...maisFeeds],
                    atualizando: false,
                    carregando: false
                });
            } else{
                this.setState({
                    atualizando: false,
                    carregando: false
                });
            } 
        }
    }

    componentDidMount = () => {
        this.carregarMaisFeeds();       
    }

    carregarMaisFeeds = () => {
        const { carregando } = this.state;
        if(carregando){
            return;
        }
        this.carregarFeeds();
    }

    atualizar = () => {
        this.setState({ atualizando: true, feeds: [], proximaPagina: 0, nomeProduto: null},
            () => {
                this.carregarFeeds();
            });
        
    }

    mostrarFeed = (feed) => {
        return(
            <FeedCard feed={feed} navegador={this.props.navigation}/>
        );
    }

    atualizarNomeProduto = (nome) => {
        this.setState({
            nomeProduto: nome
        })
    }

    mostrarBarraPesquisa = () => {
        const { nomeProduto } = this.state;

        return(
            <CentralizadoNaMesmaLinha>
                <EntradaNomeProduto
                    onChangeText={(nome) => {this.atualizarNomeProduto(nome)}}
                    value={nomeProduto}>                     
                </EntradaNomeProduto>
                <Icon style={{padding: 10}} size={20} name="search1"
                    onPress={
                        () => {
                            this.carregarFeeds()
                        }}>
                </Icon>
            </CentralizadoNaMesmaLinha>
        )
    }

    mostrarMenu = () => {
        this.menu.openDrawer();
    }

    filtarPorEmpresa = (empresa) => {
        this.setState({
            empresaEscolhida: empresa
        }, () => {
            this.carregarFeeds();
        })

        this.menu.closeDrawer();
    }

    mostrarFeeds = (feeds) => {
        const { atualizando } = this.state;

        return(
            <DrawerLayout 
                drawerWidth={250}
                drawerPosition={DrawerLayout.positions.Left}

                ref={drawerElement => {this.menu = drawerElement}}

                renderNavigationView = {() => <Menu filtragem={this.filtarPorEmpresa}/>}
            >
                <Header
                   leftComponent={
                    <Icon style={{}} size={28} name="menuunfold" onPress={() => {
                        this.mostrarMenu();
                    }}/>
                   } 
                   centerComponent={
                    this.mostrarBarraPesquisa()
                   }
                   rightComponent={
                       <></>
                   }
                ></Header>
                <FlatList
                    data={feeds}
                    numColumns={1}

                    onEndReached={() => this.carregarMaisFeeds()}
                    onEndReachedThreshold={0.1}
                    onRefresh={() => this.atualizar()}
                    refreshing={atualizando}

                    keyExtractor={(item) => String(item._id)}
                    renderItem={({item}) => {
                        return(
                            <View style={{width: '100%'}}>
                                {this.mostrarFeed(item)}
                            </View> 
                        )
                    }}  
                >
                </FlatList>
            </DrawerLayout>            
        );
    }

    render = () => {
        const { feeds } = this.state;

        if(feeds.length){
            console.log("exibindo " + feeds.length + " feeds");

            return(
                this.mostrarFeeds(feeds)
            );
        }else{
            return(null);            
        }
        
    }
}