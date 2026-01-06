//
//  NotesListView.swift
//  Notes
//
//  Created by Madalin Bogdea on 06.01.2026.
//

import SwiftUI

var notes: [Note] = [
    Note(title: "Untitled", content: "Empty"),
    Note(title: "Untitled", content: "Empty"),
    Note(title: "Untitled", content: "Empty"),
    Note(title: "Untitled", content: "Empty"),
    Note(title: "Untitled", content: "Empty"),
    Note(title: "Untitled", content: "Empty"),
    Note(title: "Untitled", content: "Empty"),
    Note(title: "Untitled", content: "Empty"),
    Note(title: "Untitled", content: "Empty"),
    Note(title: "Untitled", content: "Empty"),
]

struct NotesListView: View {
    var body: some View {
        List(notes) { note in
            VStack(alignment: .leading) {
                Text(note.title)
                    .font(.headline)
                    .foregroundStyle(.primary)
                Text(note.content)
                    .font(.subheadline)
                    .foregroundStyle(.secondary)
            }
        }
    }
}

#Preview {
    NotesListView()
}
