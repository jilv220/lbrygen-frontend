import svgs from "./svgs"
import { ISideBarItem } from "./interfaces"

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

const categories: Array<ISideBarItem> = 
[
    featured,
    education, 
    gaming,
    tech,
    news
]

export default categories