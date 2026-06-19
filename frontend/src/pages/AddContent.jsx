// Add-Content.jsx

import React from "react";
import { Bell, UserCircle, X } from "lucide-react";

const AddContent = () => {
  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      {/* Header */}
      <header className="h-12 bg-white border-b flex items-center justify-end px-5">
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            Vijay Gaikwad
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
      <div className="px-4 py-2 text-sm">
        <span className="text-[#1d3557]">
          Products
        </span>

        <span className="mx-2 text-gray-400">
          {">"}
        </span>

        <span className="text-[#1d3557]">
          (Old)Mastering the Pulsar 220F
        </span>

        <span className="text-gray-400 ml-1">
          | English Global
        </span>

        <span className="mx-2 text-gray-400">
          {">"}
        </span>

        <span className="font-medium text-[#1d3557]">
          Elevator Pitch
        </span>
      </div>

      {/* Step Tabs */}
      <div className="flex px-3">
        <div className="w-16 h-14 bg-white border flex items-center justify-center text-red-500 text-xl font-bold">
          01
        </div>

        <div className="h-14 px-6 bg-gradient-to-r from-red-500 to-orange-500 flex items-center text-white">
          <span className="text-2xl font-bold mr-3">
            02
          </span>

          <span className="font-medium">
            Enter / Edit the content
          </span>
        </div>
      </div>

      {/* Main Area */}
      <div className="mx-3 border border-[#df6545] bg-white">
        <div className="grid lg:grid-cols-[1fr_1fr]">
          {/* Content */}
          <div className="border-r border-[#df6545] p-5">
            <h2 className="text-center text-2xl font-semibold text-[#1d3557] mb-6">
              CONTENT
            </h2>

            {/* Title */}
            <div className="max-w-lg mx-auto">
              <input
                type="text"
                defaultValue="Elevator Pitch"
                className="w-full border rounded px-4 py-2 text-base"
              />

              <p className="text-sm text-gray-500 mt-1">
                86 characters remaining.
              </p>
            </div>

            {/* Image */}
            <div className="max-w-lg mx-auto mt-8">
              <div className="relative h-56 bg-gray-100 border flex items-center justify-center">
                <button className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <X
                    size={16}
                    className="text-white"
                  />
                </button>

                <img
                  src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800"
                  alt="preview"
                  className="w-52 h-36 object-cover"
                />
              </div>

              <div className="text-xs text-gray-500 mt-3 space-y-1">
                <p>
                  * File formats supported are
                  jpg, jpeg, webp, png and gif
                  only.
                </p>

                <p>
                  * Maximum size allowed is 2MB.
                </p>
              </div>

              {/* Options */}
              <div className="mt-6 space-y-3">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" />
                  Add style to numbered list
                </label>

                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" />
                  Open link in browser
                </label>
              </div>

              {/* Editor */}
              <div className="mt-5">
                <textarea
                  rows={8}
                  className="w-full border rounded p-3 text-sm resize-none"
                  defaultValue={`Let's pitch the customer by giving them an:

Elevator Pitch

This is a pitch that:

• Introduces the Pulsar 220F in simple words
• And gets the attention of customer!

Let's get started!`}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 mt-5">
                <button className="px-5 py-2 border rounded bg-gray-100 text-sm">
                  PREVIOUS
                </button>

                <button className="px-5 py-2 rounded bg-gradient-to-r from-red-500 to-orange-500 text-white text-sm">
                  SAVE
                </button>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="p-5">
            <h2 className="text-center text-2xl font-semibold text-[#1d3557] mb-6">
              PREVIEW
            </h2>

            <div className="flex justify-center">
              <div className="w-[220px] h-[460px] bg-[#20242c] rounded-[30px] p-3">
                <div className="bg-white rounded-[20px] h-full overflow-y-auto p-3">
                  <h3 className="font-bold text-sm">
                    Elevator Pitch
                  </h3>

                  <img
                    src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800"
                    alt="bike"
                    className="w-full h-32 object-cover mt-2"
                  />

                  <div className="text-sm mt-3">
                    <p>
                      Let's pitch the customer by
                      giving them an:
                    </p>

                    <p className="text-blue-600 font-semibold mt-2">
                      Elevator Pitch
                    </p>

                    <p className="mt-2">
                      This is a pitch that:
                    </p>

                    <ul className="list-disc pl-5 mt-2">
                      <li>
                        Introduces the Pulsar
                        220F in simple words
                      </li>

                      <li>
                        Gets the attention of
                        customer
                      </li>
                    </ul>

                    <p className="mt-3 font-medium">
                      Let's get started!
                    </p>

                    <p className="italic text-center mt-4 text-gray-500">
                      Swipe on!
                    </p>
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

export default AddContent;