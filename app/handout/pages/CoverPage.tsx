import styles from "../styles/CoverPage.module.css";

export default function CoverPage() {
  return (
<section data-page="cover" id="cover" className={`sheet cover ${styles.page}`}>
          <div className="coverMark">REAL-WORLD COURSE BUILD</div>
          <div className="coverBody">
            <p className="eyebrow">資優教師的 AI 工具箱</p>
            <h1>
              AI 備課到互動教材
              <br />
              從課程構想到教材上線
            </h1>
            <p className="subtitle">
              以 SEL 光影奇航為例
              <br />
              規劃課程、製作教材、加入互動並分享
            </p>
            <div className="pipeline" aria-label="五步驟流程">
              <span>蒐集與規劃</span>
              <span>講義與學習單</span>
              <span>HTML 簡報</span>
              <span>互動與上線</span>
              <span>延伸與維護</span>
            </div>
          </div>
          <div className="coverNote">
            <strong>講師資訊</strong>
            <p>教育部資優央團輔導員<br />平興國中　陳隆期老師</p>
          </div>
          <footer className="coverFooter">
            <span>示範案例｜SEL 光影奇航</span>
            <span>v1.0｜2026.07</span>
          </footer>
        </section>
  );
}
