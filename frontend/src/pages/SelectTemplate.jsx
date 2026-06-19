// SelectTemplate.jsx

import React from "react";
import {
  Image,
  Images,
  Video,
  LayoutPanelLeft,
  FileText,
  Globe,
  Activity,
  Package,
  Grid2x2,
  Equal,
  Link2,
  FileQuestion,
  MapPin,
  ListOrdered,
  CircleDollarSign,
  CheckCircle2,
  ArrowLeftRight,
  Bell,
  UserCircle,
} from "lucide-react";

const contentTemplates = [
  { icon: Image, label: "Image Text" },
  { icon: Images, label: "Multi-Image" },
  { icon: Video, label: "Video" },
  { icon: LayoutPanelLeft, label: "Image-Text Side by Side" },
  { icon: FileText, label: "Extract from PDF" },
  { icon: Globe, label: "Extract from URL" },
  { icon: Activity, label: "Activity" },
];

const questionTemplates = [
  { icon: Grid2x2, label: "MCQ - Single" },
  { icon: Grid2x2, label: "MCQ - Multiple" },
  { icon: Equal, label: "Fill Blanks" },
  { icon: MapPin, label: "Hotspot" },
  { icon: ListOrdered, label: "Order the following" },
  { icon: CheckCircle2, label: "True or False" },
  { icon: ArrowLeftRight, label: "This or That" },
];

const TemplateCard = ({ icon: Icon, label }) => (
  <div className="flex flex-col items-center cursor-pointer group">
    <div className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-200 group-hover:border-red-400">
      <Icon
        size={20}
        className="text-gray-400 group-hover:text-red-500"
      />
    </div>

    <span className="mt-2 text-xs text-center text-[#1d3557] leading-4">
      {label}
    </span>
  </div>
);

const SelectTemplate = () => {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="h-11 bg-white border-b flex items-center justify-end px-5">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Super Admin
          </span>

          <Bell
            size={18}
            className="text-red-500"
          />

          <UserCircle
            size={24}
            className="text-red-500"
          />
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-5 py-3 text-sm text-[#1d3557] flex flex-wrap items-center">
        <span>Products</span>

        <span className="mx-2 text-gray-400">{">"}</span>

        <span>(Old)Mastering the Pulsar 220F</span>

        <span className="text-gray-400 ml-1">
          | English Global
        </span>

        <span className="mx-2 text-gray-400">{">"}</span>

        <span>
          Pulsar 220F - Competition and
          Comparison
        </span>

        <span className="mx-2 text-gray-400">{">"}</span>

        <span className="font-semibold">
          Create New Card
        </span>
      </div>

      {/* Step Header */}
      <div className="px-4">
        <div className="flex">
          <div className="flex items-center bg-gradient-to-r from-red-500 to-orange-500 text-white h-14 px-4">
            <span className="text-2xl font-bold mr-3">
              01
            </span>

            <span className="text-sm font-medium">
              Select type of content you want
              to create
            </span>
          </div>

          <div className="w-16 bg-white border border-l-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-red-500">
              02
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-4 bg-white border border-[#df6545]">
        <div className="grid lg:grid-cols-[1fr_240px]">
          {/* Left Section */}
          <div className="p-4">
            <h2 className="text-2xl font-medium text-gray-700 mb-6">
              Content Templates
            </h2>

            <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-6">
              {contentTemplates.map((item) => (
                <TemplateCard
                  key={item.label}
                  {...item}
                />
              ))}
            </div>

            <h2 className="text-2xl font-medium text-gray-700 mt-8 mb-6">
              Questions Templates
            </h2>

            <div className="grid grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-4 gap-y-6">
              {questionTemplates.map((item) => (
                <TemplateCard
                  key={item.label}
                  {...item}
                />
              ))}
            </div>
          </div>

          {/* Phone Preview */}
          <div className="flex justify-center items-center p-4 border-l">
            <div className="relative w-[210px] h-[430px] bg-[#1f232a] rounded-[28px]">
              {/* Camera */}
              <div className="absolute top-3 left-8 w-2.5 h-2.5 rounded-full bg-black" />

              {/* Speaker */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-1 bg-black rounded-full" />

              {/* Camera */}
              <div className="absolute top-3 right-8 w-2.5 h-2.5 rounded-full bg-black" />

              {/* Screen */}
              <div className="absolute inset-3 bg-white rounded-[20px] flex items-center justify-center">
                <div className="w-28 h-28 rounded-full border border-gray-200 flex items-center justify-center">
                  <Image
                    size={42}
                    className="text-gray-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="h-1 bg-gradient-to-r from-red-500 to-orange-500" />
      </div>

      {/* Footer Button */}
      <div className="px-4 py-3">
        <button className="px-6 py-2 text-sm rounded bg-gradient-to-r from-red-500 to-orange-500 text-white">
          NEXT
        </button>
      </div>
    </div>
  );
};

export default SelectTemplate;