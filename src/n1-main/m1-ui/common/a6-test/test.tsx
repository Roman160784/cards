import SuperInputText from "../c1-SuperInputText/SuperInputText"
import SuperButton from "../c2-SuperButton/SuperButton"
import SuperCheckbox from "../c3-SuperCheckbox/SuperCheckbox"


export const TestComponent = () => {
    return (
        <div>
            <div>
                <div><SuperInputText /></div>
                <div> <SuperButton /> </div>
                <div> <SuperCheckbox />  </div>
            </div>
        </div>
    )
}