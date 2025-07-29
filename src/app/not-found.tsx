import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="container-center flex min-h-screen flex-col items-center justify-center gap-20">
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
  );
}
