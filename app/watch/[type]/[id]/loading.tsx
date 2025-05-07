import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Skeleton } from "@/components/ui/skeleton"

export default function WatchLoading() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="container px-4 mx-auto pt-24 pb-12">
        <div className="mb-6 flex items-center">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-8 w-64 ml-4" />
        </div>

        <Skeleton className="w-full aspect-video rounded-lg" />

        <div className="mt-8">
          <Skeleton className="h-8 w-64 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>

      <Footer />
    </main>
  )
}
