import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

// Exercicio 1
export function calcularIMC(peso: number, altura: number): number {
  if (altura <= 0) throw new Error('Altura deve ser maior que zero');
  return peso / (altura * altura);
}

// Exercicio 2
export function formatarNome(nome: string, sobrenome?: string): string {
  return sobrenome && sobrenome.trim().length > 0 ? `${nome} ${sobrenome}` : nome;
}

// Exercicio 3
export function verificarMaioridade(idade: number): boolean {
  
  return idade >= 18;
}

// Exercicio 4
export interface Produto {
  id: number;
  nome: string;
  preco: number;
  descricao?: string;
}

export function formatarProduto(produto: Produto): string {
  const precoFormatado = produto.preco.toFixed(2).replace('.', ',');
  const descricao = produto.descricao ? ` - ${produto.descricao}` : '';
  return `[#${produto.id}] ${produto.nome} - R$ ${precoFormatado}${descricao}`;
}

// Exercicio 5
export function filtrarPares(numeros: number[]): number[] {
  return numeros.filter(n => n % 2 === 0);
}

// Exercicio 6
export type UnidadeTemperatura = 'celsius' | 'fahrenheit';
export function converterTemperatura(valor: number, unidade: UnidadeTemperatura): number {
  if (unidade === 'celsius') {
    return (valor * 9) / 5 + 32;
  } else {
    return ((valor - 32) * 5) / 9;
  }
}

// Exercicio 7
export function contarOcorrencias<T>(array: T[], elemento: T): number {
  return array.reduce((acc, cur) => (cur === elemento ? acc + 1 : acc), 0);
}

export interface Aluno {
  nome: string;
  notas: number[];
  matricula: string;
}

export function calcularMedia(aluno: Aluno): number {
  if (!aluno.notas || aluno.notas.length === 0) return 0;
  const soma = aluno.notas.reduce((s, n) => s + n, 0);
  return soma / aluno.notas.length;
}

// Exercicio 9
export type ApiResponse<T> = {
  sucesso: boolean;
  dados: T | null;
  erro: string | null;
};

export interface Usuario {
  id: number;
  nome: string;
  email: string;
}

export function buscarUsuarios(): ApiResponse<Usuario[]> {
  const usuariosMock: Usuario[] = [
    { id: 1, nome: 'João Silva', email: 'joao.silva@example.com' },
    { id: 2, nome: 'Maria Souza', email: 'maria.souza@example.com' },
  ];

  return {
    sucesso: true,
    dados: usuariosMock,
    erro: null,
  };
}

// Exercicio 10
export interface Tarefa {
  id: number;
  titulo: string;
  concluida: boolean;
}

export interface ListaTarefasProps {
  tarefas: Tarefa[];
  onToggle: (id: number) => void;
}

export default function ListaTarefas({ tarefas, onToggle }: ListaTarefasProps): JSX.Element {
  const [filtro, setFiltro] = useState<'todas' | 'pendentes' | 'concluidas'>('todas');

  const aplicarFiltro = (lista: Tarefa[]) => {
    switch (filtro) {
      case 'pendentes':
        return lista.filter(t => !t.concluida);
      case 'concluidas':
        return lista.filter(t => t.concluida);
      default:
        return lista;
    }
  };

  const tarefasFiltradas = aplicarFiltro(tarefas);

  const renderItem = ({ item }: { item: Tarefa }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        borderBottomWidth: 1,
        borderColor: '#eee',
      }}
    >
      <Text>{item.titulo}</Text>
      <TouchableOpacity onPress={() => onToggle(item.id)}>
        <Text>{item.concluida ? '🔘 Concluída' : '⚪ Pendente'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 }}>
        <TouchableOpacity onPress={() => setFiltro('todas')}>
          <Text style={{ fontWeight: filtro === 'todas' ? '700' : '400' }}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFiltro('pendentes')}>
          <Text style={{ fontWeight: filtro === 'pendentes' ? '700' : '400' }}>Pendentes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFiltro('concluidas')}>
          <Text style={{ fontWeight: filtro === 'concluidas' ? '700' : '400' }}>Concluídas</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tarefasFiltradas}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={{ textAlign: 'center', padding: 16 }}>Nenhuma tarefa</Text>}
      />
    </View>
  );
}
