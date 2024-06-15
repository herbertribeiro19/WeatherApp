import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

export default function App() {
  const [city, setCity] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [box, setBox] = useState(false);
  const [temp, setTemp] = useState(null);
  const [wind, setWind] = useState(null);
  const [precipitation, setPrecipitation] = useState(null);

  async function getCurrentWeather(city: string) {
    const API_key = "abc";
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
      const data = response.data;
      setTemp(data.main.temp);
      setWind(data.wind.speed);
      setPrecipitation(data.main.humidity);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível buscar as informações do clima.");
    } finally {
      setLoading(false);
    }
  }

  async function buttonPress() {
    if (city === "") {
      Alert.alert("Erro", "Por favor, informe uma cidade");
      return;
    }
    setLoading(true);
    setBox(false);
    await getCurrentWeather(city);
    setBox(true);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <LinearGradient
        colors={["#B1E488", "#4C791B", "#131A0E"]}
        style={styles.container}
      >
        <Text style={styles.title}>WeatherApp</Text>
        <LinearGradient
          colors={["#ffffff96", "#ffffff6f"]}
          style={styles.boxWeather}
          start={[0, 0.7]}
          end={[0.7, 0]}
        >
          <View style={styles.boxSearch}>
            <View style={styles.boxSearchLeft}>
              <Text style={styles.TextCity}>Informe a cidade:</Text>
              <TextInput
                style={styles.inputTextCity}
                placeholder="Ex: São Paulo"
                placeholderTextColor={"#282828"}
                value={city}
                onChangeText={(text) => setCity(text)}
              />
            </View>
            <View style={styles.boxSearchRight}>
              <TouchableOpacity onPress={buttonPress}>
                <AntDesign name="rightcircle" size={40} color="#222325" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        {box && !loading && (
          <View style={styles.Layout}>
            <ScrollView
              style={styles.scroll}
              showsVerticalScrollIndicator={false}
            >
              <TouchableOpacity>
                <LinearGradient
                  colors={["#00000071", "#2222223e"]}
                  style={styles.boxInfos}
                  start={[0, 0.7]}
                  end={[0.7, 0]}
                >
                  <MaterialCommunityIcons name="google-maps" size={34} color="#ffffff96" />
                  <Text style={styles.TextCidade}>{city}</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity>
                <LinearGradient
                  colors={["#00000071", "#2222223e"]}
                  style={styles.boxInfos}
                  start={[0, 0.7]}
                  end={[0.7, 0]}
                >
                  <FontAwesome6 name="temperature-half" size={30} color="#ffffff96" />
                  <Text style={styles.TextGraus}>{temp}°C</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity>
                <LinearGradient
                  colors={["#00000071", "#2222223e"]}
                  style={styles.boxInfos}
                  start={[0, 0.7]}
                  end={[0.7, 0]}
                >
                  <Ionicons name="water" size={30} color="#ffffff96" />
                  <Text style={styles.TextGraus}>{precipitation}%</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity>
                <LinearGradient
                  colors={["#00000071", "#2222223e"]}
                  style={styles.boxInfos}
                  start={[0, 0.7]}
                  end={[0.7, 0]}
                >
                  <Feather name="wind" size={30} color="#ffffff96" />
                  <Text style={styles.TextGraus}>{wind} km/h</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: 'center',
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: "#222325",
    marginTop: "20%",
    marginBottom: "6%",
  },

  boxSearch: {
    flexDirection: "row",
    width: "100%",
    alignSelf: "center",
    gap: 40,
  },

  boxSearchLeft: {
    justifyContent: 'center',
    maxWidth: "80%",
  },

  boxSearchRight: {
    justifyContent: 'center',
    maxWidth: "20%",
  },

  TextCity: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 8,
  },

  inputTextCity: {
    fontSize: 18,
    fontWeight: "400",
    marginBottom: 10,
  },

  boxWeather: {
    padding: 30,
    borderRadius: 10,
    width: "80%",
  },

  Layout: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  scroll: {
    marginBottom: "90%",
  },

  boxInfos: {
    alignItems: "center",
    justifyContent: "center",
    padding: 26,
    borderRadius: 20,
    marginTop: "6%",
    flexDirection: "column",
    gap: 4,
  },

  TextCidade: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "500",
  },

  TextGraus: {
    fontSize: 38,
    color: "#fff",
    fontWeight: "400",
  }
});
