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
        Text(note.title ?? "Untitled")
        Text(note.content ?? "No content")
    }
}

#Preview {
    Text("Preview")
}
