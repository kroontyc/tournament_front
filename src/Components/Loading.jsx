import React from 'react'
import './style.css'
export const Loading = () => {
	return (
		<>
			<div className="loader-dots block relative w-20 h-5">
				<div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
				<div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
				<div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
				<div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-green-500"></div>
			</div>
		</>
	)
}