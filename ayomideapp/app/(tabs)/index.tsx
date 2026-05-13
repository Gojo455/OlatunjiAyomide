import { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from "react-native";

export default function App() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [firstNum, setFirstNum] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecond, setWaitingForSecond] = useState(false);

  const pressNumber = (num) => {
    if (waitingForSecond) {
      setDisplay(num);
      setWaitingForSecond(false);
    } else {
      setDisplay(display === "0" ? num : display + num);
    }
  };

  const pressOperator = (op) => {
    setFirstNum(parseFloat(display));
    setOperator(op);
    setExpression(display + " " + op);
    setWaitingForSecond(true);
  };

  const pressEquals = () => {
    if (firstNum === null || operator === null) return;

    const secondNum = parseFloat(display);
    let result;

    if (operator === "+") result = firstNum + secondNum;
    if (operator === "-") result = firstNum - secondNum;
    if (operator === "×") result = firstNum * secondNum;
    if (operator === "÷") result = secondNum !== 0 ? firstNum / secondNum : "Error";

    setExpression(firstNum + " " + operator + " " + secondNum + " =");
    setDisplay(String(result));
    setFirstNum(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const pressClear = () => {
    setDisplay("0");
    setExpression("");
    setFirstNum(null);
    setOperator(null);
    setWaitingForSecond(false);
  };

  const pressPercent = () => {
    setDisplay(String(parseFloat(display) / 100));
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Expression (shows full calculation) */}
      <Text style={styles.expression}>{expression}</Text>

      {/* Main display */}
      <Text style={styles.display}>{display}</Text>

      <View style={styles.row}>
        <Btn label="C"  onPress={pressClear}             color="#f39c12" />
        <Btn label="%"  onPress={pressPercent}            color="#f39c12" />
        <Btn label="÷"  onPress={() => pressOperator("÷")} color="#8e44ad" />
        <Btn label="×"  onPress={() => pressOperator("×")} color="#8e44ad" />
      </View>
      <View style={styles.row}>
        <Btn label="7" onPress={() => pressNumber("7")} />
        <Btn label="8" onPress={() => pressNumber("8")} />
        <Btn label="9" onPress={() => pressNumber("9")} />
        <Btn label="-" onPress={() => pressOperator("-")} color="#8e44ad" />
      </View>
      <View style={styles.row}>
        <Btn label="4" onPress={() => pressNumber("4")} />
        <Btn label="5" onPress={() => pressNumber("5")} />
        <Btn label="6" onPress={() => pressNumber("6")} />
        <Btn label="+" onPress={() => pressOperator("+")} color="#8e44ad" />
      </View>
      <View style={styles.row}>
        <Btn label="1" onPress={() => pressNumber("1")} />
        <Btn label="2" onPress={() => pressNumber("2")} />
        <Btn label="3" onPress={() => pressNumber("3")} />
        <Btn label="=" onPress={pressEquals}             color="#27ae60" />
      </View>
      <View style={styles.row}>
        <Btn label="0" onPress={() => pressNumber("0")} wide />
        <Btn label="." onPress={() => { if (!display.includes(".")) setDisplay(display + "."); }} />
      </View>

    </SafeAreaView>
  );
}

function Btn({ label, onPress, color = "#2c3e50", wide = false }) {
  return (
    <TouchableOpacity
      style={[styles.btn, { backgroundColor: color }, wide && styles.wide]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.btnText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
    justifyContent: "flex-end",
    padding: 16,
    gap: 10,
  },
  expression: {
    color: "#888",
    fontSize: 22,
    textAlign: "right",
    paddingHorizontal: 16,
  },
  display: {
    color: "#f1c40f",
    fontSize: 56,
    textAlign: "right",
    padding: 16,
    fontWeight: "200",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  btn: {
    flex: 1,
    height: 75,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  wide: {
    flex: 2,
  },
  btnText: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "500",
  },
});