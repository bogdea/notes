//
//  NoteDetailView.swift
//  Notes
//
//  Created by Madalin Bogdea on 30.11.2025.
//

import SwiftUI

struct NoteDetailView: View {
    let note: Note

    @State private var title: String
    @State private var bodyText: String

    init(note: Note) {
        self.note = note

        _title = .init(initialValue: note.title)
        _bodyText = .init(initialValue: note.body)
    }

    var body: some View {
        TextField("", text: $title).font(.title)
            .bold()
            .padding(.horizontal, 16)
            .padding(.top)
        TextEditor(text: $bodyText)
            .font(.body)
            .padding(.horizontal, 11)
    }
}

#Preview {
    NoteDetailView(note: Note(title: "note", body: "detail"))
}
