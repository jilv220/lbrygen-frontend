export interface ISideBarItem {
    link: string,
    icon: string,
    label: string
}

export interface userModel {
    userpair?: IUserPair
    status: boolean
}

export interface IUserPair {
    pub: string,
    priv: string,
    epub: string,
    epriv: string
}