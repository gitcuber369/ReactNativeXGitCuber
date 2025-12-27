import { Stack } from 'expo-router/stack'
import React from 'react'

const WrittingLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  )
}

export default WrittingLayout