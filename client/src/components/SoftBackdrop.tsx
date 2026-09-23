export default function SoftBackdrop() {

    return (
        <div className="fixed inset-0 -z-1 pointer-events-none">
            <div className="absolute left-1/2 top-20 -translate-x-1/2 w-[980px] h-[460px] rounded-full blur-3xl bg-linear-to-tr from-[#7CFF4D]/18 to-transparent" />
            <div className="absolute right-12 bottom-10 w-[420px] h-[220px] rounded-full blur-2xl bg-linear-to-bl from-[#2ea51b]/18 to-transparent" />
        </div>
    )
}