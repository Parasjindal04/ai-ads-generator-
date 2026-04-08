import { useState } from "react"
import SectionTitle from "../components/SectionTitle"
import Uploadzone from "../components/Uploadzone"
import { PrimaryButton } from "../components/Buttons"
import { Loader2Icon, RectangleHorizontalIcon, RectangleVerticalIcon, Wand2Icon } from "lucide-react"

const Generator = () => {
  const [name, setName] = useState('')
  const [ProductName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [aspectRatio, setAspectRatio] = useState('9:16')
  const [productImage, setproductImage] = useState<File | null>(null)
  const [modelImage, setmodelImage] = useState<File | null>(null)
  const [userPrompt, setUserPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'product' | 'model') => {
    const file = e.target.files ? e.target.files[0] : null;
    if (type === 'product') setproductImage(file)
    else setmodelImage(file)
  }

  const handleGenerate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Generating AI content...")
  }

  return (
    <div className="min-h-screen text-white p-6 md:p-12 mt-28">
      <form onSubmit={handleGenerate}>
        <SectionTitle
          text1="AI Generator"
          text2="Create In-Context Image"
          text3="Upload your model and product images to generate stunning UGC, short-form videos and social media posts"
        />

        <div className="flex gap-20 max-sm:flex-col items-start justify-between mt-8">
          {/* left col */}
          <div className="flex flex-col w-full sm:max-w-[360px] gap-8">
            <Uploadzone label="Product image" file={productImage} onClear={() => setproductImage(null)} onChange={(e) => handleFileChange(e, 'product')} />
            <Uploadzone label="Model image" file={modelImage} onClear={() => setmodelImage(null)} onChange={(e) => handleFileChange(e, 'model')} />
          </div>

          {/* right col */}
          <div className="w-full">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm mb-4">
                Project Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter project name"
                required
                className="w-full bg-white/5 rounded-lg border-2 p-4 text-sm border-violet-200/10 focus:border-violet-500/50 outline-none transition-all"
              />
            </div>
            <div className="mb-4 text-gray-300">
              <label htmlFor="ProductName" className="block text-sm mb-4">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                value={ProductName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                required
                className="w-full bg-white/5 rounded-lg border-2 p-4 text-sm border-violet-200/10 focus:border-violet-500/50 outline-none transition-all"
              />
            </div>
            <div className="mb-4 text-gray-300">
              <label htmlFor="ProductDescription" className="block text-sm mb-4">
                Product Description <span className="text-xs text-violet-400">(optional)</span>
              </label>
              <textarea id="productDesciption" rows={4} value={productDescription} onChange={(e) => setProductDescription(e.target.value)}
                placeholder="Enter product description"

                className="w-full bg-white/5 rounded-lg border-2 p-4 text-sm border-violet-200/10 focus:border-violet-500/50 outline-none transition-all"
              />
            </div>
            <div className="mb-4 text-gray-300">
              <label htmlFor="" className="block text-sm mb-4">Aspect Ratio</label>
              <div className="flex gap-3">
                <RectangleVerticalIcon
                  onClick={() => setAspectRatio('9:16')}
                  className={`p-2.5 w-13 h-13 bg-white/6 rounded transition-all ring-2 ring-transparent cursor-pointer ${aspectRatio === '9:16' ? 'ring-violet-500' : ''}`}
                />

                <RectangleHorizontalIcon
                  onClick={() => setAspectRatio('16:9')}
                  className={`p-2.5 w-13 h-13 bg-white/6 rounded transition-all ring-2 ring-transparent cursor-pointer ${aspectRatio === '16:9' ? 'ring-violet-500' : ''}`}
                />

              </div>

              <div className="mb-5 mt-5 text-gray-300">
              <label htmlFor="userPrompt" className="block text-sm mb-4">
                User Prompt <span className="text-xs text-violet-400">(optional)</span>
              </label>
              <textarea id="userPrompt" rows={4} value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Describe how you want the narration to be"

                className="w-full bg-white/5 rounded-lg border-2 p-6 text-sm border-violet-200/10 focus:border-violet-500/50 outline-none transition-all"
              />
            </div>
            </div>
          </div>
        </div>


      <div className="flex justify-center mt-10">
        <PrimaryButton disabled ={isGenerating} className="px-10 py-3 rounded-md disabled:opacity-70 disabled:cursor-not-allowed ">
          {isGenerating ? (
            <>
          <Loader2Icon className="size-5 animate-spin"/> Generating...
          </>
          ) : (
            <>
            <Wand2Icon className="size-5 "/>Generate Image
            </>
          )}
        </PrimaryButton>
      </div>
      </form>
    </div>
  )
}

export default Generator