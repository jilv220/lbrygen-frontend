import svgs from "./svgs"

interface category {
    link: string,
    icon: string,
    label: string
}

const home = {
    link: 'home',
    icon: svgs.homeIcon,
    label: 'Home'
}
const lbry = {
    link: 'lbry',
    icon: svgs.newsIcon,
    label: 'Lbry'
}
const tech = {
    link: 'tech',
    icon: svgs.chipIcon,
    label: 'Tech'
}
const vtuber = {
    link: 'vtuber',
    icon: svgs.homeIcon,
    label: 'Vtuber'
}

const categories: Array<category> = 
[
    home,
    lbry,
	tech,
	vtuber,
]

export default categories