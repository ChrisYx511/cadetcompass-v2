import NavMenu from "./(components)/Navigation"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <nav className="m-3 my-5">
        <NavMenu></NavMenu>
      </nav>
      {children}
    </main>
  )
}
