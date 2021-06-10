import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const HookTest = () => {
    const [count, setCount] = useState(0);

    return(
        <View style={styles.main_container}>
            <Text style={styles.text}>{count}</Text>
            <Button title="Click here"
                onPress={() => setCount(count+1)}
            />
            <Button title="Reset counter"
                onPress={() => setCount(0)} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        // marginTop: 40,
        // marginBottom: 40,
        marginVertical: 40,
        marginHorizontal: 5,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
    }
});

export default HookTest;