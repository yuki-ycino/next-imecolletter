import React from "react"
import Head from "next/head"
import Link from "next/link"
import { ipcRenderer } from "electron"

const onClickLogin = (_e: React.MouseEvent): void => {
  ipcRenderer.send("login-dialog")
}

const Home = (): JSX.Element => {
  return (
    <>
      <Head>
        <title>Home - Nextron (with-typescript)</title>
      </Head>
      <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/next">
            <a>Go to next page</a>
          </Link>
        </p>
        <p>
          <button onClick={onClickLogin}>ログイン</button>
        </p>
        <img src="/static/logo.png" />
      </div>
    </>
  )
}

export default Home
