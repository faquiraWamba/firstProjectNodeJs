namespace UserInterface{

    export interface IuserCreate{
        name? :string;
        email : string;
        age : number;
    }
    
    export interface IuserUpdate{
        name? :string;
        email? : string;
        age? : number;

    }
    
}




export default UserInterface;
