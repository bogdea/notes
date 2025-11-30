//
//  NotesListView.swift
//  Notes
//
//  Created by Madalin Bogdea on 30.11.2025.
//

import SwiftUI

private var notes: [Note] = [
    Note(title: "Grocery list", body: "Milk, eggs, bread"),
    Note(title: "Workout plan", body: "Chest day on Monday"),
    Note(title: "Shopping", body: "New shoes, phone case"),
    Note(title: "Quote", body: "Stay hungry, stay foolish."),
    Note(title: "Todo", body: "Clean the kitchen"),
    Note(title: "Ideas", body: "Try adding dark mode"),
    Note(title: "Quick note", body: "Call the dentist"),
]

struct NotesListView: View {
    var body: some View {
        List(notes) { note in
            NavigationLink(destination: NoteDetailView(note: note)) {
                VStack(alignment: .leading) {
                    Text(note.title)
                        .font(.headline)
                    Text(note.body)
                        .font(.subheadline)
                        .foregroundStyle(.secondary)
                }
            }.navigationTitle("Notes")
        }
    }
}

#Preview {
    NotesListView()
}
