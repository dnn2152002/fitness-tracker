import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import { BarChart, PieChart, LineChart } from 'react-native-gifted-charts';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;

export default function DetailUser() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Mock data - replace with actual user data
  const userData = {
    name: "John Doe",
    age: 30,
    weight: 75,
    height: 180,
    avatar: "https://img.freepik.com/free-photo/fit-cartoon-character-training_23-2151149055.jpg?size=338&ext=jpg&ga=GA1.1.1413502914.1723939200&semt=ais_hybrid", // Replace with actual avatar URL
    exerciseData: [
      { value: 5, label: 'Mon' },
      { value: 7, label: 'Tue' },
      { value: 3, label: 'Wed' },
      { value: 6, label: 'Thu' },
      { value: 4, label: 'Fri' },
      { value: 8, label: 'Sat' },
      { value: 2, label: 'Sun' },
    ],
    calorieData: [
      { value: 300, text: 'Breakfast', color: '#177AD5' },
      { value: 500, text: 'Lunch', color: '#79D2DE' },
      { value: 400, text: 'Dinner', color: '#ED6665' },
      { value: 200, text: 'Snacks', color: '#FFA600' },
    ],
    weightData: [
      { value: 75.0, date: 'Jan 1' },
      { value: 74.8, date: 'Jan 8' },
      { value: 74.3, date: 'Jan 15' },
      { value: 73.9, date: 'Jan 22' },
      { value: 73.5, date: 'Jan 29' },
      { value: 73.2, date: 'Feb 5' },
      { value: 72.8, date: 'Feb 12' },
      { value: 72.5, date: 'Feb 19' },
      { value: 72.3, date: 'Feb 26' },
      { value: 72.0, date: 'Mar 5' },
    ],
    progressData: {
      completed: 65,
      remaining: 35,
    },
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    setSelectedDate(currentDate);
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.dateFilter}
        onPress={() => setShowDatePicker(true)}
      >
        <Ionicons name="calendar-outline" size={24} color="#007AFF" />
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
      </TouchableOpacity>
      
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode={'date'}
          display="default"
          onChange={onDateChange}
        />
      )}

      <View style={styles.userInfo}>
        <Image source={{ uri: userData.avatar }} style={styles.avatar} />
        <View style={styles.userDetails}>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userStat}>Age: {userData.age}</Text>
          <Text style={styles.userStat}>Weight: {userData.weight} kg</Text>
          <Text style={styles.userStat}>Height: {userData.height} cm</Text>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.title}>Progress</Text>
        <View style={styles.progressContainer}>
          <PieChart
            donut
            radius={80}
            innerRadius={60}
            data={[
              { value: userData.progressData.completed, color: '#4CAF50' },
              { value: userData.progressData.remaining, color: '#E0E0E0' },
            ]}
          />
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>{userData.progressData.completed}%</Text>
            <Text style={styles.progressLabel}>Completed</Text>
          </View>
        </View>
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.title}>Exercise Count</Text>
        <BarChart
          data={userData.exerciseData}
          width={screenWidth - 64}
          height={220}
          barWidth={30}
          spacing={20}
          barBorderRadius={4}
          frontColor="#177AD5"
          yAxisThickness={0}
          xAxisThickness={0}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.title}>Calorie Intake</Text>
        <PieChart
          data={userData.calorieData}
          donut
          showText
          textColor="black"
          radius={100}
          textSize={10}
          showValuesAsLabels={true}
          showTextBackground={true}
          textBackgroundRadius={26}
        />
      </View>

      <View style={styles.chartContainer}>
        <Text style={styles.title}>Weight Trend</Text>
        <LineChart
          data={userData.weightData}
          width={screenWidth - 64}
          height={220}
          xAxisLabelTextStyle={{ fontSize: 10 }}
          yAxisTextStyle={{ fontSize: 10 }}
          color="#FF5722"
          dataPointsColor="#FF5722"
          startFillColor="#FF5722"
          startOpacity={0.2}
          endOpacity={0.2}
          curved
          areaChart
          yAxisLabelSuffix=" kg"
          xAxisLabelOrientation="diagonal"
          hideDataPoints
          rulesType="solid"
          rulesColor="#E0E0E0"
          yAxisThickness={1}
          xAxisThickness={1}
          yAxisTextNumberOfLines={2}
          yAxisLabelWidth={40}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  dateFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#007AFF',
  },
  userInfo: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userStat: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  chartContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  progressContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTextContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
  },
});