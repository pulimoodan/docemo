import styles from './Feature.module.css';

export default function Feature({ feature }) {
  return (
    <div className="col">
      <div className={`${styles.features_icons_item} card`}>
        <div className={`${styles.features_icons_icon} d-flex`}>
          <i className={`bi-${feature.icon} m-auto text-primary`}></i>
        </div>
        <h6>{feature.name}</h6>
      </div>
    </div>
  );
}
