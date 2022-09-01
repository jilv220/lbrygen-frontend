import svgs from "./svgs"
import { ISideBarItem } from "./interfaces"

const home = {
    link: '/',
    icon: svgs.homeIcon,
    label: 'Home'
}

const following = {
    link: 'following',
    icon: svgs.followingIcon,
    label: 'Following'
}

const primaryNav : Array<ISideBarItem> = 
[
    home,
    following
]

export default primaryNav