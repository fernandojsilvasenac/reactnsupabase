import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Alert } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { services } from "@/services";
import  { supabase } from "@/services/supabase";


export default function App() {
  const [data, setData] = useState<UsersResponse[]>([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    fetchData();
    // services.users.findAll().then(setData)
    console.log(data);
  }, []);

  function fetchData(){
    services.users.findAll().then(setData)
  }

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase.from('users').insert([{ name, age }]);
      if (error) {
        throw error;
      }
      Alert.alert('Usuário criado com sucesso!');
      setName('');
      setAge('');
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
      Alert.alert('Erro ao criar usuário. Por favor, tente novamente.');
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    const { error } = await supabase.from('users').delete().eq('id', id);
    if (error) {
      console.log('Erro ao deletar item:', error.message);
      Alert.alert('Erro ao excluir usuário. Por favor, tente novamente.');
    }  
    else {
      Alert.alert('Usuário excluído com sucesso!');
      fetchData();
    } 
  };

  return (
    <View style={{ flex: 1, padding: 20, marginTop:50}}>
      <TextInput
        style={{ 
          height: 40, 
          borderColor: 'gray', 
          borderWidth: 1, 
          marginBottom: 10, 
          padding:5, 
          borderRadius: 5
       }}
        onChangeText={text => setName(text)}
        value={name}
        placeholder="Nome do usuário"
      />
      <TextInput
        style={{ 
          height: 40, 
          borderColor: 'gray', 
          borderWidth: 1, 
          marginBottom: 10, 
          padding:5, 
          borderRadius: 5
        }}
        onChangeText={text => setAge(text)}
        value={age}
        placeholder="Idade"
      />
      <Button onPress={handleSubmit} title="Adicionar Usuário" />
      <FlatList
        data={data}
        keyExtractor={user => user.id}
        renderItem={({ user }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            {/* <Text>{user.name}</Text> */}
            <Button onPress={() => handleDelete(user.id)} title="Deletar" />
          </View>
        )}
      />
    </View>
  );}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


  // const fetchData = async () => {
  //   const { data, error } = await supabase.from('users').select('*');
  //   if (error) console.log('Erro ao buscar dados:', error.message);
  //   else setData(data);
  // };

  // const handleSubmit = async () => {
  //   if (name.trim() !== '') {
  //     const { data: newItem, error } = await supabase.from('users').insert({ name, age });
  //     if (error) console.log('Erro ao adicionar item:', error.message);
  //     else {
  //       setData([...data, newItem[0]]);
  //       setName('');
  //       setAge('');
  //     }
  //   }
  // };
