export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid grid-cols-1">
      <div className="outline-yellow-700 outline rounded-lg py-12 p-6 m-4">
        <h1 className="text-4xl">Manage Cadets</h1>
      </div>
      {children}
    </div>
  )
}
