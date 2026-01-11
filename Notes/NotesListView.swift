//
//  NotesListView.swift
//  Notes
//
//  Created by Madalin Bogdea on 06.01.2026.
//

import CoreData
import SwiftUI

struct NotesListView: View {
    @Environment(\.managedObjectContext) private var context
    @FetchRequest(sortDescriptors: [])
    private var notes: FetchedResults<Note>

    var body: some View {
        List(notes) { note in
            NavigationLink {
                NoteDetailView(note: note)
            } label: {
                VStack(alignment: .leading) {
                    Text(note.title ?? "Untitled")
                        .font(.headline)
                        .foregroundStyle(.primary)
                    Text(note.content ?? "No content")
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
            }
        }
        .navigationTitle("Notes")
        .toolbar {
            Button {
                addNote()
            } label: {
                Image(systemName: "plus")
            }
        }
    }

    func addNote() {
        let note = Note(context: context)

        note.id = UUID()
        note.title = ""
        note.content = ""

        do {
            try context.save()
        } catch {
            print(error)
        }
    }
}

#Preview {
    NavigationStack {
        NotesListView()
    }
}
