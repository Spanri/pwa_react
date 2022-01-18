import React, { useState, useEffect } from "react"
import logo from "./logo.svg"
import "./App.css"

const App = () => {
	const [hasNotification, setHasNotification] = useState(false)

	// function to actually ask the permissions
	const handlePermission = () => {
		// set the button to shown or hidden, depending on what the user answers
		if (Notification.permission === "denied" || Notification.permission === "default") {
			setHasNotification(false)
		} else {
			setHasNotification(true)
		}
	}

	useEffect(() => {
		handlePermission()
	}, [])

	const checkNotificationPromise = () => {
		try {
			Notification.requestPermission().then()
		} catch (e) {
			return false
		}

		return true
	}

	const askNotificationPermission = thenFunc => {
		// Let's check if the browser supports notifications
		if (!("Notification" in window)) {
			console.log("This browser does not support notifications.")
		} else {
			if (checkNotificationPromise()) {
				Notification.requestPermission().then(thenFunc)
			} else {
				Notification.requestPermission(thenFunc)
			}
		}
	}

	const createNotification = title => {
		const text = "Текст уведомления: " + title
		new Notification("Заголовок", { body: text, badge: logo, icon: logo })
	}

	const notifyMe = () => {
		// Let's check if the browser supports notifications
		if (!("Notification" in window)) {
			alert("This browser does not support desktop notification")
		}

		// Let's check whether notification permissions have already been granted
		else if (Notification.permission === "granted") {
			// If it's okay let's create a notification
			createNotification("Ура, уведомления разрешены")
		}

		// Otherwise, we need to ask the user for permission
		else if (Notification.permission !== "denied") {
			askNotificationPermission(permission => {
				handlePermission()

				if (permission === "granted") {
					createNotification("Ура, мы вас спросили и уведомления разрешены")
				}
			})
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
