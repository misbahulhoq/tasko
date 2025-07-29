import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <section className="flex min-h-screen items-center justify-center lg:relative lg:block lg:min-h-0">
      <div className={`img-wrapper hidden lg:block`}>
        <Image
          src={"/Desktop.svg"}
          alt="Background Image"
          width={100}
          height={100}
          className="relative z-0 h-[144px] w-full object-cover"
          priority
        />
      </div>

      <div className="bg-base-100 container-center flex flex-col items-center justify-center gap-20 rounded-2xl border p-12 lg:absolute lg:inset-0 lg:top-18 lg:min-h-[700px]">
        <div className="img-wrapper">
          <Image
            className=""
            height={520}
            width={584}
            src="/not-found.svg"
            alt="404"
          />
        </div>
        <Link href="/" className="btn btn-primary btn-wide rounded">
          Back To Home
        </Link>
      </div>
    </section>
  );
}
