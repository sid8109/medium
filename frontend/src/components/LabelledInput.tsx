import React from "react"

interface labelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    type: string
}

const LabelledInput = ({ label, placeholder, onChange, type }: labelledInputType) => {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold text-black">{label}</label>
            <input type={type} onChange={onChange} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 mb-4" placeholder={placeholder} required />
        </div>
    )
}

export default LabelledInput
