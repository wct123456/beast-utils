import styles from './index.css';
import {isUrl} from '../utils';

export default function() {
  let path = 'http://www.thinkphp.cn/topic/44921.html';
  let url = isUrl(path);

  console.log('isTrue',url);

  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        Beast-Utils 测试 页面
      </ul>
    </div>
  );
}
