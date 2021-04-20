import styled from "styled-components/native";

export const Avatar = styled.Image`
    padding: 4px;
    width: 120px;
    height: 40px;
    border-radius: 18px;
`;

export const Miniatura = styled.Image`
    padding: 4px;
    width: 36px;
    height: 36px;
    border-radius: 18px;
`;

export const NomeEmpresa = styled.Text`
    padding: 8px;
    font-weight: bold;
    text-align: center;
    font-size: 16px;
    color: #59594a;
`;

export const NomeProduto = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #59594a;
`;

export const DescricaoProduto = styled.Text`
    font-size: 16px;
    color: #59594a;
`;

export const PrecoProduto = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #59594a;
`;

export const Likes = styled.Text`
    font-size: 16px;
    color: #59594a;
`;

export const EntradaNomeProduto = styled.TextInput`
    height: 40px;
    width: 100%;
    background-color: #fff;
    border-color: #c7c7c7;
    border-width: 1;
    border-radius: 8px;
`;

export const CentralizadoNaMesmaLinha = styled.View`
    flexDirection: row;
    justify-content: center;
    align-items: center;
`;

export const EsquerdaDaMesmaLinha = styled.View`
    flexDirection: row;
    justify-content: flex-start;
    align-items: flex-start;
`;

export const Espacador = styled.View`
    flexDirection row;
    padding: 12px;
`;

export const ContenedorMenu = styled.View`
    flex: 1;
    font-size: 18;
    background-color: #fff;
`;

export const DivisorMenu = styled.View`
    marginVertical: 5;
    marginHorizontal 5;
    border-bottom-width: 1;
    border-color: #050505;
`;