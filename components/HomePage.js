import React, { useState } from 'react';
import { Button, View, Text, TextInput, Switch } from 'react-native';

import { useTheme } from '@react-navigation/native';

function calculateEffectiveHouseRent(basicSalary, hraSalary, isMetro) {
  let intBasicSalary = parseInt(basicSalary);
  let intHraSalary = parseInt(hraSalary);
  let result = intHraSalary;
  
  if(isMetro) {
    result = result > (intBasicSalary*0.5) ? (intBasicSalary*0.5) : result;
  } else {
    result = result > (intBasicSalary*0.4) ? (intBasicSalary*0.4) : result;
  }

  result = result + (intBasicSalary * 0.1);

  return result;
}

function calculateHraExemption(basicSalary, hraSalary, isMetro, rent) {
  let intBasicSalary = parseInt(basicSalary);
  let intHraSalary = parseInt(hraSalary);
  /* Actual HRA received */
  let result = intHraSalary;
  
  /* 50% of [basic salary + DA] for those living in metro cities (40% for non-metros) */
  if(isMetro) {
    result = result > (intBasicSalary*0.5) ? (intBasicSalary*0.5) : result;
  } else {
    result = result > (intBasicSalary*0.4) ? (intBasicSalary*0.4) : result;
  }

  /* Actual rent paid less 10% of basic salary + DA */
  result = (rent - (intBasicSalary * 0.10)) < result ? (rent + (intBasicSalary * 0.10)) : result;

  return result;
}

export function HomePage({ navigation }) {
  const { colors } = useTheme();
  
  const [basicSalary, setBasicSalary] = useState("");
  const [hraSalary, setHraSalary] = useState("");
  const [isMetro, setIsMetro] = useState(false);
  const toggleSwitch = () => setIsMetro(previousState => !previousState);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom:20}}>
        <Text style={{color: colors.text, textAlign: 'right', width: '40%', marginRight: 10}}>Basic Pay:</Text>
        <TextInput
          style={{height: 40, color: colors.text, borderColor: colors.border, backgroundColor: colors.background, borderWidth: 2, width: '40%', textAlign: 'center'}}
          placeholder="Basic Salary"
          onChangeText={setBasicSalary}
          keyboardType={'number-pad'}
        />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom:20}}>
        <Text style={{color: colors.text, textAlign: 'right', width: '40%', marginRight: 10}}>HRA Allowance:</Text>
        <TextInput
          style={{height: 40, color: colors.text, borderColor: colors.border, backgroundColor: colors.background, borderWidth: 2, width: '40%', textAlign: 'center'}}
          placeholder="HRA"
          onChangeText={setHraSalary}
          keyboardType={'number-pad'}
        />
      </View>


      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom:20}}>
        <Text style={{color: colors.text, textAlign: 'right', width: '40%', marginRight: 10}}>Metro City:</Text>

        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: '40%'}}>
          <Text style={{color: colors.text}}>No</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isMetro ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isMetro}
          />
          <Text style={{color: colors.text}}>Yes</Text>
        </View>
      </View>

      <Button title="Calculate" onPress={()=>{
        if(basicSalary === "" || hraSalary === "") {
          alert("Provide All Data");
          return;
        }
        let res1 = calculateEffectiveHouseRent(basicSalary, hraSalary, isMetro);
        let res2 = calculateHraExemption(basicSalary, hraSalary, isMetro, res1);
        alert("Rent To Pay: " + res1 + "\n" + "HRA Exemption: " + res2);
      }}/>
      
    </View>
  );
}