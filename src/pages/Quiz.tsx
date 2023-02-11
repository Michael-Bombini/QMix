import React from 'react'
import { useLocation } from 'react-router';

export default function Quiz() {
    let { state } = useLocation();
  return (
    <div>{JSON.stringify(state)}</div>
  )
}
