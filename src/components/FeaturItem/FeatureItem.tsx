import './FeatureItem.scss'
type FeatureItemProps = {
    imgSrc: string,
    imgAlt: string,
    title: string,
    text: string,
}
export default function FeatureItem({imgSrc, imgAlt, title, text}: FeatureItemProps): JSX.Element {
    return (
        <div className="feature-item">
            <img src={imgSrc} alt={imgAlt} className="feature-icon"/>
            <h3 className="feature-item-title">{title}</h3>
            <p>
                {text}
            </p>
        </div>
    )
}