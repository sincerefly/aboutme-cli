# aboutme-cli

东东's Blog 个人简介命令行版本。

## Usage

```sh
npx @donxdone/aboutme-cli
```

安装后也可以使用更短的 bin 名称：

```sh
npm install -g @donxdone/aboutme-cli
donxdone
```

## Development

```sh
npm install
npm test
npm start
```

## Release

这个仓库使用 GitHub Actions + npm Trusted Publishing 发布到 npm。

首次发布前需要在 npm 上配置 Trusted Publisher：

1. 打开 npm 包页面或创建包 `@donxdone/aboutme-cli`
2. 进入 `Settings` -> `Publishing access`
3. 添加 Trusted Publisher：
   - Publisher: GitHub Actions
   - Repository owner: `sincerefly`
   - Repository name: `aboutme-cli`
   - Workflow filename: `publish.yml`
   - Environment name: 留空

发版流程：

```sh
npm version patch
git push --follow-tags
```

然后在 GitHub 根据新 tag 创建 Release，发布 Release 后会自动运行 `.github/workflows/publish.yml` 并发布到 npm。
