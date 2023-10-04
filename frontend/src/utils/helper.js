

// Truncate a string to a certain number of characters and lines
export const truncate = (str, maxChars = 420, maxLines = 4) => {
    let lines = str.split('\n');
    if (lines.length > maxLines) {
        str = lines.slice(0, maxLines).join('\n');
    }
    return str.length > maxChars ? str.substr(0, maxChars - 1) + "..." : str;
}

// Compare two Firestore Timestamps by date
export const compareDates = (a, b) => {
    let aDate = a.toDate();
    aDate.setHours(0, 0, 0, 0);
    let bDate = b.toDate();
    bDate.setHours(0, 0, 0, 0);
    return aDate.getTime() - bDate.getTime();
}

