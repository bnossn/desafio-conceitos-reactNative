import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {

    api.get('repositories').then(response => {
      const repoList = response.data;
      setRepositories(repoList);
    });

  }, []);

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    const response = await api.post(`repositories/${id}/like`);

    const repository = response.data;
  
    const repoIndex = repositories.findIndex(repo => repo.id === id);
    const newRepoList = [...repositories];
    newRepoList[repoIndex] = repository;

    setRepositories(newRepoList);

  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <FlatList 
          data={repositories}
          renderItem={ ({ item: repository }) => {
            return (
                
              <View style={styles.repositoryContainer}>
                <Text style={styles.repository}>{repository.title}</Text>
      
                <View style={styles.techsContainer}>

                  <FlatList
                    data={repository.techs}
                    renderItem = {({ item: tech }) => (
                      <Text key={tech} style={styles.tech}>
                        {tech}
                      </Text>
                    )}
                    keyExtractor={item => item}
                    horizontal={true}
                  />

                </View>
      
                <View style={styles.likesContainer}>
                  <Text
                    style={styles.likeText}
                    // ok- Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                    testID={`repository-likes-${repository.id}`}
                  >
                    {`${repository.likes} curtidas`}
                  </Text>
                </View>
      
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleLikeRepository(repository.id)}
                  // ok- Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                  testID={`like-button-${repository.id}`}
                >
                  <Text style={styles.buttonText}>Curtir</Text>
                </TouchableOpacity>
              </View>

            );
          }}
          keyExtractor={item => item.id}
        />

      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding:20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 15,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
