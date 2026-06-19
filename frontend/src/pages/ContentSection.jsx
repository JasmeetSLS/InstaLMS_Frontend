// ContentSection.jsx

import React from "react";
import {
  Bell,
  UserCircle,
  PlusCircle,
  Pencil,
  Trash2,
  Share2,
  Image as ImageIcon,
} from "lucide-react";

const sections = [
  "Pulsar 220F - Introduction",
  "Elevator Pitch",
  "Pulsar 220F - Color & Specifications",
  "Pulsar 220F - Design",
  "Pulsar 220F - Digital Instrument",
];

const cards = [
  {
    title: "Have a Look at the Brand New Pulsar 220F!",
    active: true,
  },
  {
    title: '"READY, SET, PITCH!"',
    active: false,
  },
];

const ContentSection = () => {
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* Header */}
      <header className="h-12 bg-white border-b border-gray-200 flex items-center justify-end px-5">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Super Admin
          </span>

          <Bell
            size={16}
            className="text-red-500"
          />

          <UserCircle
            size={22}
            className="text-red-500"
          />
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-4 py-2 text-sm">
        <span className="font-medium text-gray-700">
          Products
        </span>

        <span className="mx-2 text-gray-400">{">"}</span>

        <span className="font-semibold text-gray-800">
          (Old)Mastering the Pulsar 220F
        </span>

        <span className="text-gray-400 ml-1">
          | English Global
        </span>
      </div>

      {/* Version Bar */}
      <div className="mx-3 bg-[#ececec] border border-gray-200">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="border-b-2 border-red-500 pb-2">
            <span className="text-red-500 text-lg">
              Version 1
            </span>

            <span className="text-orange-400 text-sm ml-1">
              (Editing)
            </span>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-1.5 border border-red-300 text-red-500 rounded text-sm">
              Discard
            </button>

            <button className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded text-sm">
              Send for Approval
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-3">
        <div className="grid grid-cols-[240px_1fr_260px] gap-3 h-[calc(100vh-140px)]">
          {/* LEFT PANEL */}
          <div className="bg-white border rounded overflow-hidden">
            <div className="flex items-center justify-between px-3 py-3 border-b">
              <h3 className="text-base font-medium">
                Section
              </h3>

              <PlusCircle
                size={22}
                className="text-red-500 cursor-pointer"
              />
            </div>

            <div className="overflow-y-auto h-full p-3 space-y-3">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`border rounded p-3 cursor-pointer transition ${
                    index === 0
                      ? "bg-gradient-to-r from-red-500 to-orange-500 text-white border-transparent"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <h4 className="font-semibold text-sm leading-5">
                    {section}
                  </h4>

                  <p
                    className={`mt-3 text-xs ${
                      index === 0
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  >
                    Pulsar 220F
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CENTER PANEL */}
          <div className="bg-white border rounded flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center border-b bg-gray-50">
              <button className="px-6 py-3 text-sm border-b-2 border-red-500 font-medium">
                Cards (2)
              </button>

              <button className="px-6 py-3 text-sm text-gray-500">
                Assessment Questions (0)
              </button>

              <div className="ml-auto px-3">
                <PlusCircle
                  size={22}
                  className="text-red-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Cards */}
            <div className="p-3 space-y-2 overflow-auto">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className={`border rounded p-2.5 flex items-center justify-between ${
                    card.active
                      ? "bg-red-50"
                      : "bg-white"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full border border-red-300 flex items-center justify-center">
                      <ImageIcon
                        size={14}
                        className="text-red-400"
                      />
                    </div>

                    <span className="text-sm text-gray-700">
                      {card.title}
                    </span>
                  </div>

                  {index === 0 && (
                    <div className="flex gap-1">
                      <button className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                        <Share2
                          size={11}
                          className="text-white"
                        />
                      </button>

                      <button className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                        <Pencil
                          size={11}
                          className="text-white"
                        />
                      </button>

                      <button className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                        <Trash2
                          size={11}
                          className="text-white"
                        />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* PREVIEW PANEL */}
          <div className="bg-white border rounded overflow-hidden">
            <div className="flex border-b bg-gray-50">
              <button className="flex-1 py-3 text-sm border-b-2 border-red-500 font-medium">
                Preview
              </button>

              <button className="flex-1 py-3 text-sm text-gray-500">
                Activity Log
              </button>
            </div>

            <div className="flex justify-center py-3">
              {/* Mobile Mockup */}
              <div className="w-[220px] h-[480px] bg-[#20242c] rounded-[28px] p-3">
                <div className="bg-white rounded-[20px] h-full overflow-auto">
                  <div className="p-3">
                    <h3 className="font-bold text-sm leading-5">
                      Have a Look at the Brand New
                      Pulsar 220F!
                    </h3>

                    <img
                      src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800"
                      alt="bike"
                      className="w-full h-24 object-cover mt-2 rounded"
                    />

                    <div className="mt-2 text-[11px] leading-5">
                      <p className="text-blue-600 font-semibold">
                        Welcome!
                      </p>

                      <p className="mt-2">
                        In this stream, you will learn
                        about the all-new Pulsar 220F
                        with Digital Instrument Cluster.
                      </p>

                      <p className="mt-2">
                        With its cool look, strong
                        engine and smart features, the
                        Pulsar 220F is ready for the
                        road.
                      </p>

                      <ul className="list-disc pl-4 mt-2">
                        <li>Elevator Pitch</li>
                        <li>Colours & Specifications</li>
                        <li>Design</li>
                        <li>Digital Instrument Cluster</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Preview */}
        </div>
      </div>
    </div>
  );
};

export default ContentSection;