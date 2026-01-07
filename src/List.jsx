import ListItem from "./ListItem";

export default function List({list}){
    return (
        <ul className="to-do-list">
            {
                list.map((item) =>{
                    return (
                        <ListItem
                            key={item.key}
                            item={item}  
                         />
                    )
                })
            }
        </ul>
    ); 
}