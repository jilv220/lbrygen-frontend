export default {
    run(text, picked) {

        let result = ''
        
        if (picked == 'channel' && text && text[0] != '@') {
            result = `@${text}`
        } else {
            result = text
        }
        
        return result
    }
}