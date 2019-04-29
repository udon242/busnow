export const cleanString = (value: string): string => {
    if (value) {
        return value.replace(/[\t\n]/g, '')
    }
    return '';
}
