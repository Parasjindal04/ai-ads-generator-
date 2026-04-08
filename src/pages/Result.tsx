import { useEffect, useState } from "react";
import type { Project } from "../types";
import { dummyGenerations } from "../assets/assets";

import { ImageIcon, Loader2Icon, RefreshCwIcon, VideoIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { GhostButton } from "../components/Buttons";


const Result = () => {
  const [project, setProjectData] = useState<Project>({} as Project);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchProjectData = async () => {
    setTimeout(() => {
      setProjectData(dummyGenerations[0])
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    fetchProjectData();
  }, [])

  return loading ? (

    <div className="h-screen w-full flex items-center justify-center">
      <Loader2Icon className="animate-spin text-indigo-400 size-9" />
    </div>
  ) : (
    <div className="min-h-screen text-white p-6 md:p-12 mt-20">
      <div className="max-w-6xl mx-auto">

        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-medium">Generation Result</h1>
          <Link
            to="/generate"
            className="group flex items-center gap-2 text-sm px-4 py-2 rounded-lg bg-white/10 text-white border border-white/30 hover:bg-white/20 transition-all duration-200 font-medium"
          >
            <RefreshCwIcon className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
            <span>New Generation</span>
          </Link>
        </header>
        {/* grid layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main result display */}

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/5 border border-white/10 backdrop-blur-md inline-block p-2 rounded-2xl">

              <div
                className={`${project?.aspectRatio === "9:16"
                    ? "aspect-[9/16]"
                    : "aspect-video"
                  } overflow-hidden rounded-xl`}
              >
                {project?.generatedVideo ? (
                  <video
                    src={project.generatedVideo}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={project?.generatedImage}
                    alt="Generated Result"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

            </div>
          </div>

          {/* sidebar actions */}
          <div className="space-y-6">
            {/* downloads button */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Actions</h3>
              <div className="flex flex-col gap-3">
                <a href={project.generatedImage} download>
                  <GhostButton disabled={!project?.generatedImage }
                  className="w-full justify-center rounded-md py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                    <ImageIcon className="size-4.5" />
                    <span>Download Image</span>
                  </GhostButton>
                </a>

                <a href={project.generatedVideo} download>
                  <GhostButton disabled={!project?.generatedVideo }
                  className="w-full justify-center rounded-md py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                    <VideoIcon className="size-4.5" />
                    <span>Download Video</span>
                  </GhostButton>
                </a>
              </div>
            </div>

            {/* generate video button */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl">
              <h3 className="text-xl font-semibold mb-4">Generate Video</h3>
              <GhostButton
                type="button"
                onClick={() => {
                  setIsGenerating(true);
                  setTimeout(() => setIsGenerating(false), 1800);
                }}
                disabled={isGenerating}
                className="w-full justify-center rounded-md py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <Loader2Icon className="animate-spin size-4.5" />
                ) : (
                  <VideoIcon className="size-4.5" />
                )}
                <span>{isGenerating ? "Generating..." : "Generate Video"}</span>
              </GhostButton>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Result