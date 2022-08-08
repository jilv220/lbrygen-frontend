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
const featured = {
    link: 'featured',
    icon: svgs.featuredIcon,
    label: 'Featured'
}
const education = {
    link: 'education',
    icon: svgs.educationIcon,
    label: 'Education'
}
const gaming = {
    link: 'gaming',
    icon: svgs.gamingIcon,
    label: 'Gaming'
}
const tech = {
    link: 'tech',
    icon: svgs.chipIcon,
    label: 'Tech'
}
const news = {
    link: 'news',
    icon: svgs.newsIcon,
    label: 'News'
}

const lbry = {
    link: 'lbry',
    icon: svgs.newsIcon,
    label: 'Lbry'
}
const vtuber = {
    link: 'vtuber',
    icon: svgs.homeIcon,
    label: 'Vtuber'
}

const categories: Array<category> = 
[
    home,
    featured,
    education, 
    gaming,
    tech,
    news
]

export default categories