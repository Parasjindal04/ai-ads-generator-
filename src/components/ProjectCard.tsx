import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Project } from "../types";
import { EllipsisIcon, ImageIcon, Loader2Icon, PlaySquareIcon, Share2Icon, Trash2Icon } from "lucide-react";
import { button, div } from "motion/react-client";
import { GhostButton, PrimaryButton} from "./Buttons";




const ProjectCard = ({
  gen,
  setGenerations,
  forCommunity = false,
}: {
  gen: Project;
  setGenerations: React.Dispatch<React.SetStateAction<Project[]>>;
  forCommunity?: boolean;
}) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Are you sure you want to delete this generation?");
    if (!confirm) return;
    setGenerations((prev) => prev.filter((project) => project.id !== id));
  };

  const togglePublish = async (id: string) => {
    setGenerations((prev) =>
      prev.map((project) =>
        project.id === id
          ? { ...project, isPublished: !project.isPublished }
          : project
      )
    );
  };
  // ✅ Bonus UX: close menu on outside click
  useEffect(() => {
    const handleClick = () => setMenuOpen(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="mb-4 break-inside-avoid">
      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition group">

        {/* Preview (clickable) */}
        <div
          onClick={() => navigate(`/project/${gen.id}`)}
          className="cursor-pointer"
        >
          <div
            className={`${
              gen?.aspectRatio === "9:16"
                ? "aspect-[9/16]"
                : "aspect-video"
            } relative overflow-hidden`}
          >
            {/* Image */}
            {gen.generatedImage && (
              <img
                src={gen.generatedImage}
                alt={gen.productName}
                className={`absolute inset-0 w-full h-full object-cover transition duration-500 ${
                  gen.generatedVideo
                    ? "group-hover:opacity-0"
                    : "group-hover:scale-105"
                }`}
              />
            )}

            {/* Video */}
            {gen.generatedVideo && (
              <video
                src={gen.generatedVideo}
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500"
                onMouseEnter={(e) => e.currentTarget.play()}
                onMouseLeave={(e) => e.currentTarget.pause()}
              />
            )}

            {/* Loader */}
            {!gen.generatedImage && !gen.generatedVideo && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                <Loader2Icon className="size-7 animate-spin" />
              </div>
            )}

            {/* Status badges */}
            <div className="absolute left-3 top-3 flex gap-2 items-center">
              {gen.isGenerating && !gen.generatedImage && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  Generating...
                </span>
              )}
              {gen.isPublished && (
                <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                  Published
                </span>
              )}
            </div>

            {/* Action menu */}
            {!forCommunity && (
              <div className="absolute right-3 top-3 z-20">
                <EllipsisIcon
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen((prev) => !prev);
                  }}
                  className="bg-black/40 rounded-full p-1 size-7 cursor-pointer hover:bg-black/60 transition"
                />

                {menuOpen && (
                  <ul
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-2 w-40 bg-black/80 backdrop-blur border border-white/10 rounded-lg shadow-lg text-sm py-1"
                  >
                    {gen.generatedImage && (

                        <a
                          href={gen.generatedImage}
                          download
                          className="flex gap-2 items-center px-4 py-2 hover:bg-white/10"
                        >
                          <ImageIcon size={14} />
                          Download Image
                        </a>

                    )}
                    {gen.generatedVideo && (

                        <a
                          href={gen.generatedVideo}
                          download
                          className="flex gap-2 items-center px-4 py-2 hover:bg-white/10"
                        >
                          <PlaySquareIcon size={14} />
                          Download Video
                        </a>
                    )}
                        {(gen.generatedVideo || gen.generatedImage) &&
                            <button onClick={()=>navigator.share({url: gen.generatedVideo || gen.generatedImage, title : gen.productName , text : gen.productDescription})} className="w-full flex gap-2 items-center px-4 py-2 hover:bg-white/10 cursor-pointer">
                                <Share2Icon size={14} /> share

                            </button>}
                            <button onClick={()=> handleDelete(gen.id)} className="w-full flex gap-2 items-center px-4 py-2 hover:bg-red-950/10 text-red-400 cursor-pointer">
                                <Trash2Icon size={14} /> Delete
                            </button>



                  </ul>
                )}
              </div>
            )}

            {/* Source images */}
            <div className="absolute right-3 bottom-3 flex">
              {gen.uploadedImages?.[0] && (
                <img
                  src={gen.uploadedImages[0]}
                  alt="product"
                  className="w-12 h-12 object-cover rounded-full animate-float"
                />
              )}
              {gen.uploadedImages?.[1] && (
                <img
                  src={gen.uploadedImages[1]}
                  alt="model"
                  className="w-12 h-12 object-cover rounded-full -ml-4 animate-float"
                  style={{ animationDelay: "0.3s" }}
                />
              )}
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-4">
          <h3 className="text-white font-medium truncate">
            {gen.productName}
          </h3>
          <p className="text-gray-400 text-sm truncate">
            Created: {new Date(gen.createdAt).toLocaleString()}
          </p>

          <div className="mt-2 flex justify-end">
            <span className="text-xs px-2 py-1 bg-white/5 rounded-full">
              {gen.aspectRatio}
            </span>
          </div>
        </div>

        {/* Description */}
        {gen.productDescription && (
          <div className="px-4 pb-4">
            <p className="text-gray-300 text-xs mb-1">Description</p>
            <div className="text-sm text-gray-300 bg-white/5 p-2 rounded-md break-words">
              {gen.productDescription}
            </div>
          </div>
        )}
        {/* User prompt */}
        {gen.userPrompt && (
            <div className="mt-3">
                <div className="text-xs text-gray-300">{gen.userPrompt}</div>
            </div>
        )}
        {/* buttons */  }
        {!forCommunity && (
            <div className="mt-4 grid grid-cols-2 gap-3">
                <GhostButton className="text-xs justify-center " onClick={() => { navigate(`/result/${gen.id}`); scrollTo(0, 0); }}>
                    View Details
                </GhostButton>
                <PrimaryButton className="rounded-md" onClick={() => togglePublish(gen.id)}>
                    {gen.isPublished ? "Unpublish" : "Publish"}
                </PrimaryButton>
            </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;