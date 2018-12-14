import {AsyncStorage} from 'react-native';
import {Notifications, Permissions} from 'expo';

export const DECKS_STORAGE_KEY = 'flashcards:decks'
export const NOTIFICATION_KEY = 'notification:flashcards'

function setDummyData () {
  let dummyData = {
    decks: {
      React: {
        title: 'React',
        questions: [
          {
            question: 'What is React?',
            answer: 'A library for managing user interfaces',
          },
          {
            question: 'Where do you make Ajax requests in React?',
            answer: 'The componentDidMount lifecycle event',
          },
        ],
      },
      JavaScript: {
        title: 'JavaScript',
        questions: [
          {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.',
          },
        ],
      }
    }
  }
  return dummyData
}

export function getAllDecks (results) {
  return results === null
    ? setDummyData()
    : setMissingDates(JSON.parse(results))
}

function createNotification () {
  return {
    title: 'FlashCards',
    body: "Hey! Don't forget to view your questions today",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync().then(() => {
                let today = new Date()
                today.setDate(today.getDate())
                today.setHours(9, 30, 0)

                Notifications.scheduleLocalNotificationAsync(
                  createNotification(),
                  {
                    time: today,
                    repeat: 'day',
                  }
                ).then(result => {
                })
              })
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}