//
//  NotesListView.swift
//  Notes
//
//  Created by Madalin Bogdea on 06.01.2026.
//

import SwiftUI

struct NotesListView: View {
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
        }.navigationTitle("Notes")
    }
}

#Preview {
    NotesListView()
}
