//
//  NoteDetailView.swift
//  Notes
//
//  Created by Madalin Bogdea on 06.01.2026.
//

import CoreData
import SwiftUI

struct NoteDetailView: View {
    @Environment(\.managedObjectContext) private var context
    @ObservedObject var note: Note

    @State var title: String = ""
    @State var content: String = ""

    var body: some View {
        VStack {
            TextField("", text: $title)
            TextEditor(text: $content)
        }
        .onAppear {
            title = note.title ?? ""
            content = note.content ?? ""
        }
        .onDisappear {
            note.title = title
            note.content = content

            do {
                try context.save()
            } catch {
                print(error)
            }
        }
    }
}

#Preview {
    Text("Preview")
}
