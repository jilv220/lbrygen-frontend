export default {
    run(text, picked) {

        let result = ''

        if (picked == 'text' || picked == 'tag') {
            let trimed_text = text.trim()
            result = trimed_text.replace(/\s/g, '-');
        } 
        else if (picked == 'channel') {
            result = `@${text}`
        }

        return result
    }
}