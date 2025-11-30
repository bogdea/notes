//
//  NoteDetailView.swift
//  Notes
//
//  Created by Madalin Bogdea on 30.11.2025.
//

import SwiftUI

struct NoteDetailView: View {
    let note: Note

    var body: some View {
        Text(note.title)
        Text(note.body)
    }
}

#Preview {
    NoteDetailView(note: Note(title: "note", body: "detail"))
}
