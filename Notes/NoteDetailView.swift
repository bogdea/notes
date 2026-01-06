//
//  NoteDetailView.swift
//  Notes
//
//  Created by Madalin Bogdea on 06.01.2026.
//

import SwiftUI

struct NoteDetailView: View {
    let note: Note

    var body: some View {
        Text(note.title)
        Text(note.content)
    }
}

#Preview {
    NoteDetailView(note: Note(title: "Untitled", content: "Empty"))
}
