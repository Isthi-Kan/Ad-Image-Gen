import { useState } from "react"
import Title from "../components/Title"
import UploadZone from "../components/UploadZone"
import { Loader2Icon, RectangleHorizontalIcon, RectangleVerticalIcon, Wand2Icon } from "lucide-react";
import { PrimaryButton } from "../components/Buttons";
import { useAuth, useUser } from "@clerk/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../configs/axios";


const Generator = () => {

  const { user } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [producName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [productImage, setProductImage] = useState<File | null>(null);
  const [userPrompt, setUserPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'model') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'product') setProductImage(e.target.files[0]);
      else setModelImage(e.target.files[0]);
    }
  }

  const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return toast('Please login to generate')

    if (!productImage || !modelImage || !name || !producName || !aspectRatio)
      return toast('Please fill all required fields')

    try {
      setIsGenerating(true);
      const formData = new FormData();

      formData.append('name', name);
      formData.append('productName', producName);
      formData.append('productDescription', productDescription);
      formData.append('userPrompt', userPrompt);
      formData.append('aspectRatio', aspectRatio);
      formData.append('images', productImage);
      formData.append('images', modelImage);

      const token = await getToken();

      const { data } = await api.post('/api/project/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      toast.success(data.message)
      navigate('/result/' + data.projectId);
    } catch (error: any) {
      setIsGenerating(false);
      toast.error(error?.response?.data?.message || error.message)
      
    }

  }

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 md:px-8 md:py-10 mt-12 bg-[#020403] text-white">

      <form onSubmit={handleGenerate} className="mx-auto mb-8 mt-6 w-full max-w-4xl rounded-[28px] border border-emerald-400/10 p-3 shadow-[0_24px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-5 bg-emerald-950/25" >

        <div className="-mb-6 md:-mb-8">
          <Title heading="Generate your own AI image" description="Upload your model and product images to generate short-form videos and social media posts" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-6 items-start">

          {/* left col */}
          <div className="flex w-full flex-col gap-3 rounded-2xl border border-emerald-400/10 p-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.28)] bg-emerald-950/25">
            <UploadZone label="Product Image" file={productImage} onClear={() => setProductImage(null)} onChange={(e) => handleFileChange(e, 'product')} />

            <UploadZone label="Model Image" file={modelImage} onClear={() => setModelImage(null)} onChange={(e) => handleFileChange(e, 'model')} />
          </div>

          {/* right col */}

          <div className="w-full space-y-3">
            <div className="rounded-2xl border border-emerald-400/10 bg-emerald-950/25 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
              <label htmlFor="name" className="mb-2 block text-sm font-medium tracking-wide text-emerald-50/95">Project Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-emerald-400/10 bg-[#081009] p-2.5 text-sm text-white outline-none transition hover:border-emerald-400/30 focus:border-[#7CFF4D] focus:ring-2 focus:ring-[#7CFF4D]/15 placeholder:text-emerald-100/35"
                placeholder="Enter project name" required
              />
            </div>

            <div className="rounded-2xl border border-emerald-400/10 bg-emerald-950/25 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
              <label htmlFor="productName" className="mb-2 block text-sm font-medium tracking-wide text-emerald-50/95">Product Name</label>
              <input
                type="text"
                id="productName"
                value={producName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full rounded-xl border border-emerald-400/10 bg-[#081009] p-2.5 text-sm text-white outline-none transition hover:border-emerald-400/30 focus:border-[#7CFF4D] focus:ring-2 focus:ring-[#7CFF4D]/15 placeholder:text-emerald-100/35"
                placeholder="Enter product name" required
              />
            </div>

            <div className="rounded-2xl border border-emerald-400/10 bg-emerald-950/25 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
              <label htmlFor="productDescription" className="mb-2 block text-sm font-medium tracking-wide text-emerald-50/95">Product Description <span className="text-emerald-100/55">(optional)</span></label>
              <textarea
                id="productDescription"
                rows={3}
                value={productDescription}
                onChange={(e) => setProductDescription(e.target.value)}
                className="w-full rounded-xl border border-emerald-400/10 bg-[#081009] p-2.5 text-sm text-white outline-none transition hover:border-emerald-400/30 focus:border-[#7CFF4D] focus:ring-2 focus:ring-[#7CFF4D]/15 placeholder:text-emerald-100/35"
                placeholder="Enter product description"
              />
            </div>

            <div className="rounded-2xl border border-emerald-400/10 bg-emerald-950/25 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
              <label className="mb-2 block text-sm font-medium tracking-wide text-emerald-50/95">Aspect Ratio</label>
              <div className="flex gap-3">
                <RectangleVerticalIcon onClick={() => setAspectRatio('9:16')} className={`size-11 cursor-pointer rounded-xl border p-2 transition-all ${aspectRatio === '9:16' ? 'border-[#7CFF4D] bg-slate-900 text-[#7CFF4D] shadow-[0_0_0_1px_rgba(124,255,77,0.35)]' : 'border-emerald-400/10 bg-[#081009] text-emerald-100/60 hover:border-emerald-400/30 hover:bg-emerald-500/10 hover:text-emerald-100'}`} />
                <RectangleHorizontalIcon onClick={() => setAspectRatio('16:9')} className={`size-11 cursor-pointer rounded-xl border p-2 transition-all ${aspectRatio === '16:9' ? 'border-[#7CFF4D] bg-slate-900 text-[#7CFF4D] shadow-[0_0_0_1px_rgba(124,255,77,0.35)]' : 'border-emerald-400/10 bg-[#081009] text-emerald-100/60 hover:border-emerald-400/30 hover:bg-emerald-500/10 hover:text-emerald-100'}`} />




              </div>



            </div>

            <div className="rounded-2xl border border-emerald-400/10 bg-emerald-950/25 p-3 shadow-[0_10px_30px_rgba(0,0,0,0.22)]">
              <label htmlFor="userPrompt" className="mb-2 block text-sm font-medium tracking-wide text-emerald-50/95"> Prompt <span className="text-emerald-100/55">(optional)</span></label>
              <textarea
                id="userPrompt"
                rows={3}
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                className="w-full rounded-xl border border-emerald-400/10 bg-[#081009] p-2.5 text-sm text-white outline-none transition hover:border-emerald-400/30 focus:border-[#7CFF4D] focus:ring-2 focus:ring-[#7CFF4D]/15 placeholder:text-emerald-100/35"
                placeholder="Enter prompt"
              />
            </div>

          </div>


        </div>

        <div className="mt-4 flex justify-center">

          <PrimaryButton disabled={isGenerating} className="inline-flex items-center gap-2 rounded-full bg-linear-to-br from-[#7CFF4D] via-[#53db2f] to-[#2ea51b] px-7 py-2.5 font-semibold text-black shadow-[0_0_0_1px_rgba(124,255,77,0.18),0_12px_30px_rgba(34,197,94,0.25)] transition hover:opacity-90 hover:shadow-[0_0_0_1px_rgba(124,255,77,0.25),0_14px_34px_rgba(34,197,94,0.32)] disabled:cursor-not-allowed disabled:opacity-70">
            {isGenerating ? (
              <>
                <Loader2Icon className="size-5 animate-spin" /> Generating...
              </>

            ) : (
              <>
                <Wand2Icon className="size-5" /> Generate Image
              </>
            )
            }
          </PrimaryButton>



        </div>


      </form>

    </div>
  )
}

export default Generator