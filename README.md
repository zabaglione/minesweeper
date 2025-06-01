# マインスイーパー

バニラHTML、CSS、JavaScriptで構築されたモダンでスタイリッシュなマインスイーパーWebアプリケーションです。グラデーション背景、スムーズなアニメーション、レスポンシブデザインを特徴とする洗練されたUIを提供します。

![Minesweeper Game](https://img.shields.io/badge/ゲーム-マインスイーパー-blue)
![HTML5](https://img.shields.io/badge/HTML-5-orange)
![CSS3](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

## 機能

- 🎮 **3つの難易度レベル**
  - 初級（9x9グリッド、地雷10個）
  - 中級（16x16グリッド、地雷40個）
  - 上級（24x16グリッド、地雷99個）
- 🛡️ **初回クリック保護** - 最初のクリック後に地雷を配置し、安全なスタートを保証
- 🚩 **右クリックでフラグ設置** - 地雷の疑いがある場所にマーク
- 🔄 **自動展開** - 隣接する空のセルを自動的に開く
- ⏱️ **タイマー＆地雷カウンター** - 進行状況を追跡
- 📱 **レスポンシブデザイン** - デスクトップとモバイルデバイスに対応
- ✨ **スムーズなアニメーション** - より良いゲーム体験のための視覚効果

## はじめに

### 必要環境

- モダンなWebブラウザ（Chrome、Firefox、Safari、Edge）
- ビルドツールや依存関係は不要！

### ゲームの実行方法

1. リポジトリをクローン：
   ```bash
   git clone https://github.com/zabaglione/minesweeper.git
   cd minesweeper
   ```

2. ゲームを開く：
   - `index.html`をWebブラウザで直接開く、または
   - ローカル開発サーバーを使用：
     ```bash
     # Python
     python -m http.server 8000
     
     # Node.js
     npx http-server
     
     # VS Code
     # "Live Server"拡張機能をインストールし、index.htmlを右クリック → "Open with Live Server"
     ```

3. `http://localhost:8000`にアクセス（サーバーを使用する場合）

## 遊び方

1. **目的**：地雷を踏まずにすべてのセルをクリアする
2. **左クリック**：セルを開く
3. **右クリック**：地雷の疑いがあるセルにフラグを設置/解除
4. **数字**：そのセルに隣接する地雷の数を示す
5. **勝利**：地雷以外のすべてのセルを開く
6. **敗北**：地雷をクリックする

## プロジェクト構成

```
minesweeper/
├── index.html    # ゲーム構造を含むメインHTMLファイル
├── styles.css    # スタイリング、アニメーション、レスポンシブデザイン
├── game.js       # Minesweeperクラス内のゲームロジック
├── CLAUDE.md     # AIアシスタント用の指示
└── README.md     # このファイル
```

## 技術詳細

### アーキテクチャ

- **フレームワーク依存なし**：純粋なバニラJavaScript実装
- **オブジェクト指向設計**：単一の`Minesweeper`クラスがすべてのゲームロジックを処理
- **イベント駆動**：ユーザー操作のためのクリックとコンテキストメニューイベント
- **レスポンシブグリッド**：CSS Gridレイアウトが異なる画面サイズに適応

### 主要アルゴリズム

- **地雷配置**：初回クリック保護付きのランダム配置
- **フラッドフィル**：空の隣接セルの再帰的な展開
- **勝利判定**：地雷以外のすべてのセルが開かれたかチェック

## ブラウザ互換性

- Chrome/Edge 88以上
- Firefox 78以上
- Safari 14以上
- モバイルブラウザ（iOS Safari、Chrome Mobile）

## 貢献方法

問題報告や機能拡張のリクエストを歓迎します！

1. リポジトリをフォーク
2. 機能ブランチを作成（`git checkout -b feature/amazing-feature`）
3. 変更をコミット（`git commit -m 'Add some amazing feature'`）
4. ブランチにプッシュ（`git push origin feature/amazing-feature`）
5. プルリクエストを作成

## ライセンス

このプロジェクトはオープンソースで、[MITライセンス](LICENSE)の下で利用可能です。

## 謝辞

- インスピレーションを与えてくれたクラシックなマインスイーパーゲーム
- UIのためのモダンなWebデザイン原則
