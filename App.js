import { useEffect, useState } from 'react'
import { Image, Text, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import tw from 'twrnc'

export default function App() {
  const [location, setLocation] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  // API key of openweathermap.org
  const KEY = 'a86c20bb483f0b745f975378b380072b'

  const search = async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName
      .trim()
      .replace(/\s+/g, '')}&units=metric&appid=${KEY}`
    return await getData(url)
  }

  const getData = async (url) => {
    try {
      let res = await fetch(url)
      return res.json()
    } catch (error) {
      console.log('[getData]: ', error)
      alert(`${error?.message}`)
    }
  }

  // first load, get weather information of Ha Noi
  useEffect(async () => {
    const data = await search('hanoi')
    setWeatherData(data)
    console.log(data)
  }, [])

  // get weather information on text input submit
  const onSubmit = async () => {
    const data = await search(location)
    setWeatherData(data)
  }

  return (
    <View style={tw`bg-black h-full p-4`}>
      <View style={tw`relative`}>
        <TextInput
          style={tw`p-2 text-white text-xl bg-slate-600 rounded-md`}
          onSubmitEditing={onSubmit}
          placeholder='Enter location'
          value={location}
          onChangeText={(text) => setLocation(text)}
        />
        <Icon
          style={tw`absolute right-2 top-2`}
          name='search-outline'
          size={24}
          color='#fff'
        />
      </View>
      {weatherData && (
        <View style={tw`items-center`}>
          <View>
            <Image
              source={`http://openweathermap.org/img/wn/${weatherData.weather?.[0].icon}@4x.png`}
              style={{ width: 250, height: 250 }}
            />
          </View>
          <Text style={tw`text-white text-5xl font-bold text-center`}>
            {weatherData.name}
          </Text>
          <View
            style={tw`w-60 h-60 rounded-full flex items-center justify-center bg-opacity-50 bg-slate-500 mt-8`}
          >
            <Text style={tw`text-white text-4xl font-bold`}>
              {weatherData.main.temp}°C{' '}
            </Text>
          </View>
          <View style={tw`flex-row items-center mt-8`}>
            <Icon name='water-outline' size={24} color='#fff' />
            <Text style={tw`text-white text-xl`}>
              {weatherData.main.humidity}%
            </Text>
          </View>
        </View>
      )}
    </View>
  )
}
