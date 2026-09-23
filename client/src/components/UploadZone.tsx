import { UploadIcon, XIcon } from "lucide-react"
import type { UploadZoneProps } from "../types"

const UploadZone = ({ label, file, onClear, onChange }: UploadZoneProps) => {
    return (
        <div className="relative group">
            <div className={`relative h-52 rounded-3xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-4 bg-emerald-950/20 text-white ${file ? 'border-[#7CFF4D]/60' : 'border-emerald-400/10 group-hover:border-emerald-400/25'}`}>
                {file ? (
                    <>
                        <img src={URL.createObjectURL(file)} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-60" />

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-xl backdrop-blur-sm">

                            <button type="button" onClick={onClear} className="p-2 rounded-full bg-white/10 hover:bg-red-500/20 text-white hover:text-red-400 transition-colors">
                                <XIcon className="w-6 h-6" />
                            </button>

                        </div>

                        <div className="absolute bottom-3 left-3 rounded-lg border p-2.5 backdrop-blur-md border-emerald-400/10 bg-black/50">
                            <p className="truncate text-sm font-medium text-emerald-50">{file.name}</p>
                        </div>

                    </>
                ) : (
                    <>
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 bg-emerald-950/35">
                         <UploadIcon className="h-7 w-7 text-emerald-300/70 transition-colors group-hover:text-[#7CFF4D]" />
                    </div>

                    <h3 className="mb-1 text-base font-semibold text-white">{label}</h3>
                    <p className="max-w-[200px] text-center text-xs leading-relaxed text-emerald-100/55">Drag & drop or click to upload</p>
                    <input type="file" accept="image/*" onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />

                    </>
                )}
            </div>

        </div>
    )
}

export default UploadZone