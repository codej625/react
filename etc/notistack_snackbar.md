# notistack 스낵바 사용하기

<br />
<br />

* 스낵바?
---

```
스낵바는 웹 앱에서 알람을 매우 쉽게 알려주고
쌓을 수 있는 컴포넌트이다.
```

<br />
<br />
<br />
<br />

1. Installation

```
// npm or yarn으로 install 한다.

npm install notistack
yarn add notistack
```

<br />
<br />
<br />

2. Usage

```tsx
import { SnackbarProvider, enqueueSnackbar } from 'notistack'

const App = () => {
  return (
    // wrap your app
    <SnackbarProvider>
      <App />
      <MyButton />
    </SnackbarProvider>
  )

  const MyButton = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar()
  return (
    <Button onClick={() => enqueueSnackbar('I love hooks')}>
      Show snackbar
    </Button>
  )
}
```

```tsx
// auto hide 예시

<SnackbarProvider
  autoHideDuration={5000}
/>
```

<br />

| Name                          | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| `root`                        | Styles applied to Snackbar's root element.                                  |
| `anchorOriginTopCenter`       | Styles applied to Snackbar when `anchorOrigin={{ vertical: 'top', horizontal: 'center' }}` |
| `anchorOriginBottomCenter`    | Styles applied to Snackbar when `anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}` |
| `anchorOriginTopRight`        | Styles applied to Snackbar when `anchorOrigin={{ vertical: 'top', horizontal: 'right' }}` |
| `anchorOriginBottomRight`     | Styles applied to Snackbar when `anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}` |
| `anchorOriginTopLeft`         | Styles applied to Snackbar when `anchorOrigin={{ vertical: 'top', horizontal: 'left' }}` |
| `anchorOriginBottomLeft`      | Styles applied to Snackbar when `anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}` |
| `containerRoot`               | Styles applied to SnackbarContainer's root element.                         |
| `containerAnchorOriginTopCenter`  | Styles applied to SnackbarContainer when `anchorOrigin={{ vertical: 'top', horizontal: 'center' }}` |
| `containerAnchorOriginBottomCenter` | Styles applied to SnackbarContainer when `anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}` |
| `containerAnchorOriginTopRight`   | Styles applied to SnackbarContainer when `anchorOrigin={{ vertical: 'top', horizontal: 'right' }}` |
| `containerAnchorOriginBottomRight`| Styles applied to SnackbarContainer when `anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}` |
| `containerAnchorOriginTopLeft`    | Styles applied to SnackbarContainer when `anchorOrigin={{ vertical: 'top', horizontal: 'left' }}` |
| `containerAnchorOriginBottomLeft` | Styles applied to SnackbarContainer when `anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}` |

<br />

```
https://notistack.com
```
