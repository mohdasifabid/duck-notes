import { useNote } from "../useNote";
import { NoteCard } from "./NoteCard";
import { Layout } from "./Layout";
import React, { useEffect } from "react";

export const LabelsPage = () => {
  const { state } = useNote();
  const tagged = () => {
    let notesArr = state.notes;
    let obj = {};
    for (let i = 0; i < notesArr.length; i++) {
      if (obj[notesArr[i].tag] === undefined) {
        obj[notesArr[i].tag] = [notesArr[i]];
      } else {
        obj[notesArr[i].tag] = [...obj[notesArr[i].tag], notesArr[i]];
      }
    }
    return obj;
  };
  let newObj = tagged();
  return (
    <Layout>
      <div className="archive-page-body">
        {Object.keys(newObj).map((lab) => {
          return (
            <>
              <p>
                <strong>{lab}</strong>
              </p>
              {newObj[lab].map((item) => {
                return <NoteCard type="label" item={item} key={item._id} />;
              })}
            </>
          );
        })}
      </div>
    </Layout>
  );
};
