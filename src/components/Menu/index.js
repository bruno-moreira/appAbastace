import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import {
    Miniatura,
    NomeEmpresa,
    ContenedorMenu,
    EsquerdaDaMesmaLinha,
    DivisorMenu,
    Espacador
} from '../../assets/styles';
import avatar from '../../assets/img/avatar.jpg';
import empresasEstaticas from '../../assets/dicionarios/empresas.json';

export default class Menu extends React.Component{

    constructor(props){
        super(props)

        this.state = {
            filtrar: props.filtragem
        }
    }

    mostrarEmpresa = (empresa) => {
        const { filtrar } = this.state;

        return(
            <TouchableOpacity onPress={() => {
                filtrar(empresa)
            }}>
                <EsquerdaDaMesmaLinha>
                    <Miniatura source={avatar}/>
                    <NomeEmpresa>{empresa.name}</NomeEmpresa>
                </EsquerdaDaMesmaLinha>
                <DivisorMenu/>                
            </TouchableOpacity>
        );
    }

    render = () => {
        const empresas = empresasEstaticas.empresas;

        return(
            <ScrollView>
                <Espacador/>
                <ContenedorMenu>
                    {empresas.map((empresa) => this.mostrarEmpresa(empresa))}
                </ContenedorMenu>                
            </ScrollView>
        );
    }
}