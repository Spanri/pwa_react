import React, { useState, useEffect } from "react"
import logo from "./logo.svg"
import "./App.css"

const App = () => {
	const [hasNotification, setHasNotification] = useState(false)

	// function to actually ask the permissions
	const handlePermission = permission => {
		// set the button to shown or hidden, depending on what the user answers
		if (Notification.permission === "denied" || Notification.permission === "default") {
			setHasNotification(false)
		} else {
			setHasNotification(true)
		}
	}

	useEffect(() => {
		const checkNotificationPromise = () => {
			try {
				Notification.requestPermission().then()
			} catch (e) {
				return false
			}

			return true
		}

		const askNotificationPermission = () => {
			// Let's check if the browser supports notifications
			if (!("Notification" in window)) {
				console.log("This browser does not support notifications.")
			} else {
				if (checkNotificationPromise()) {
					Notification.requestPermission().then(permission => {
						handlePermission(permission)
					})
				} else {
					Notification.requestPermission(function (permission) {
						handlePermission(permission)
					})
				}
			}
		}

		askNotificationPermission()
	}, [])

	const createNotification = title => {
		const text = "Текст уведомления: " + title
		new Notification("Заголовок", { body: text, badge: logo, icon: logo })
	}

	function notifyMe() {
		// Let's check if the browser supports notifications
		if (!("Notification" in window)) {
			alert("This browser does not support desktop notification")
		}

		// Let's check whether notification permissions have already been granted
		else if (Notification.permission === "granted") {
			// If it's okay let's create a notification
			createNotification("Hi there!")
		}

		// Otherwise, we need to ask the user for permission
		else if (Notification.permission !== "denied") {
			console.log("denied")
			Notification.requestPermission(permission => {
				console.log("send request")
				// If the user accepts, let's create a notification
				if (permission === "granted") {
					createNotification("Hi there!")
				}
			})
			// Notification.requestPermission().then(function (permission) {
			// 	console.log("send request")
			// 	// If the user accepts, let's create a notification
			// 	if (permission === "granted") {
			// 		createNotification("Hi there!")
			// 	}
			// })
		}

		// At last, if the user has denied notifications, and you
		// want to be respectful there is no need to bother them any more.
	}

	return (
		<div className="App">
			<h3>Уведомления</h3>
			<p> {hasNotification ? "Есть контакт!" : "Контакт запрещен"} </p>
			<button onClick={notifyMe}>Уведомить</button>
		</div>
	)
}

export default App
