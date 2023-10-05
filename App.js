import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification recived');
      console.log(notification)
    });

    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification response recived');
      console.log(response)
    });

    return () => {
      subscription.remove();
      subscription2.remove();
    };
  }, []);

  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello",
        body: "This is body of HelloNotification",
        data: { userName: "Jan" },
      },
      trigger: {
        seconds: 1,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
