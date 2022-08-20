import * as React from 'react';

import { ScrollView, StyleSheet } from 'react-native';
import Markdown from 'react-native-marked';

export default function App() {
  // const markdown =
  //   "Trusting frontend validation logic is like trusting a thief when he says he won't steal your wallet.";
  const markdown =
    "Trusting frontend validation logic is like trusting a thief when he says he won't steal your wallet. Frontend validation is for _convenience_, to reduce HTTP requests, not for ensuring data quality. You can add TypeScript validators until your face turns red, and the moment some guy creates another frontend to consume your API, your validators are basically useless. [Hyperlambda](https://aista.com/hyperlambda/) validators on the other side are executing on your server, which makes them much more valuable.\n\n";
  // const markdown =
  //   'Trusting frontend validation logic is like trusting a thief when he says he won\'t steal your wallet. Frontend validation is for _convenience_, to reduce HTTP requests, not for ensuring data quality. You can add TypeScript validators until your face turns red, and the moment some guy creates another frontend to consume your API, your validators are basically useless. [Hyperlambda](https://aista.com/hyperlambda/) validators on the other side are executing on your server, which makes them much more valuable.\n\n## Data quality and Hyperlambda validators\n\nI have worked with 50+ companies during my 25+ years as en enterprise software developer. Most of these companies struggled with poor data quality. Phone numbers would be written like; _"John Doe"_, or _"foo@bar.com"_. Manually going through 500,000 records to clean up garbage data is literally impossible. This reduces the data quality your employer has. Which again results in more trouble doing business. Which again leads to less profit. Which again leads to less salary for you. Data quality __IS KING__!\n\nIn the following video I am illustrating how to create _server side validators_ with Hyperlambda, which is a much better alternative if you\'re to chose only one. If you want to follow the video hands on, you can [register a Magic cloudlet here](https://aista.com).\n\nAdding server side validation ensures data quality, assuming all data goes in and out of your database through your backend API. This results in higher data quality over time, which again results in better business.\n\nOnly relying upon frontend validators created with for instance React or Angular, is asking for trouble. Very soon somebody will want to create another frontend client using for instance Swift or the Android SDK. As they do, they\'re going to bypass your validator logic. If they do, you will end up with garbage data in your database.\n\n> DO NOT trust frontend validators (alone!) - Because they\'re "mostly useless" from a data quality perspective\n\nWith [Hyperlambda](https://aista.com/hyperlambda/) you\'ve got validators for every imaginable purpose, ranging from email validators to regular expression validators. Don\'t trust users of your web API to supply you valid data, ensure it using validators.';
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Markdown value={markdown} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
