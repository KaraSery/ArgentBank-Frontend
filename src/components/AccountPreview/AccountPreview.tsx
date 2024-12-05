import './AccountPreview.scss'

type AccountPreviewProps = {
    balance: number,
    type: string,
    x:  number,
    name: string
}

export default function AccountPreview({ balance, type, x, name }: AccountPreviewProps) {
    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">Argent Bank {name} (x{x})</h3>
                <p className="account-amount">${balance.toLocaleString('en')  }</p>
                <p className="account-amount-description">{type} Balance</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">
                    <svg xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 320 512">
                        {/*// <!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->*/}
                        <path
                            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/>
                    </svg>
                </button>
            </div>
        </section>
    )
}