import {useState} from "react";
import EditUserForm from "../../features/auth/EditUserForm/EditUserForm";
import AccountPreview from "../../components/AccountPreview/AccountPreview";
import './User.scss'
export default function User() {
    const [formDisplay, setFormDisplay] = useState(false);
    return (
        <main className={'main'}>
            {formDisplay ?

                <EditUserForm handleCancel={() => setFormDisplay(false)}/>:
                (<div className='header'>
                    <h1>Welcome back<br/>Tony Jarvis!</h1>
                    <button onClick={() => setFormDisplay(true)} className="edit-button">Edit Name</button>
                </div>)
            }

            <h2 className="sr-only">Accounts</h2>
            <AccountPreview
                balance={2082.79}
                type={'Available'}
                x={8349}
                name={'Checking'}/>
            <AccountPreview
                balance={10928.42}
                type={'Available'}
                x={6712}
                name={'Checking'}/>
            <AccountPreview
                balance={184.30}
                type={'Current'}
                x={8349}
                name={'Credit Card'}/>
        </main>
    )
}