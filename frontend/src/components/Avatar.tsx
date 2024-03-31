const Avatar = ({ name, size } : {name: string, size: "big" | "small"}) => {
    const parts = name.split(" ")
    const initials = parts[0].charAt(0) + (parts.length >= 2 ? parts[1].charAt(0) : "")
    return (
        <div className={`relative inline-flex items-center justify-center ${size === "big" ? "w-9 h-9" : "w-7 h-7"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-700`}>
            <span className="font-medium text-sm text-gray-600 dark:text-gray-300">{initials}</span>
        </div>
    )
}

export default Avatar
