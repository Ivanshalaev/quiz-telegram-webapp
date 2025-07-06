import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function OptionListDraggable({ options, onUpdate, type = "text" }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const reordered = Array.from(options);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    onUpdate(reordered);
  };

  const canDelete = options.length > 2;

  const addOption = () => {
    const updated = [...options];
    if (["text", "dropdown", "emoji"].includes(type)) {
      updated.push("");
    } else if (type === "text_with_image") {
      updated.push({ text: "", image: "" });
    }
    onUpdate(updated);
  };

  return (
    <div className="space-y-2">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="options">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
              {options.map((opt, i) => (
                <Draggable key={i} draggableId={`opt-${i}`} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center gap-2 bg-white/5 p-3 rounded-lg"
                      style={provided.draggableProps.style}
                    >
                      <div {...provided.dragHandleProps} className="cursor-grab text-white">
                        ☰
                      </div>

                      {type === "text" || type === "dropdown" ? (
                        <input
                          type="text"
                          value={opt}
                          onChange={(e) => {
                            const updated = [...options];
                            updated[i] = e.target.value;
                            onUpdate(updated);
                          }}
                          className="flex-1 p-2 rounded bg-[#1a1a1a] border border-white/20 text-white placeholder-gray-400"
                          placeholder="Вариант ответа"
                        />
                      ) : type === "emoji" ? (
                        <input
                          type="text"
                          value={opt}
                          maxLength={2}
                          onChange={(e) => {
                            const updated = [...options];
                            updated[i] = e.target.value;
                            onUpdate(updated);
                          }}
                          className="flex-1 p-2 rounded bg-[#1a1a1a] border border-white/20 text-white text-2xl text-center"
                          placeholder="😊"
                        />
                      ) : type === "text_with_image" ? (
                        <div className="flex-1 space-y-2">
                          <input
                            type="text"
                            value={opt.text || ""}
                            placeholder="Текст"
                            onChange={(e) => {
                              const updated = [...options];
                              updated[i] = { ...updated[i], text: e.target.value };
                              onUpdate(updated);
                            }}
                            className="w-full p-2 rounded bg-[#1a1a1a] border border-white/20 text-white placeholder-gray-400"
                          />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const reader = new FileReader();
                              reader.onload = () => {
                                const updated = [...options];
                                updated[i] = { ...updated[i], image: reader.result };
                                onUpdate(updated);
                              };
                              reader.readAsDataURL(file);
                            }}
                            className="text-white"
                          />
                          {opt.image && (
                            <img
                              src={opt.image}
                              alt={`option ${i + 1}`}
                              className="mt-2 max-w-[100px] rounded"
                            />
                          )}
                        </div>
                      ) : null}

                      {canDelete && (
                        <button
                          onClick={() => {
                            const updated = [...options];
                            updated.splice(i, 1);
                            onUpdate(updated);
                          }}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
                        >
                          ❌
                        </button>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <button
        onClick={addOption}
        className="mt-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
      >
        ➕ Добавить вариант
      </button>
    </div>
  );
}
