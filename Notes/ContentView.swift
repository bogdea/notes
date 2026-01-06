//
//  ContentView.swift
//  Notes
//
//  Created by Madalin Bogdea on 06.01.2026.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationStack {
            NotesListView()
        }
    }
}

#Preview {
    ContentView()
}
