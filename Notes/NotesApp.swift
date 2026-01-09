//
//  NotesApp.swift
//  Notes
//
//  Created by Madalin Bogdea on 06.01.2026.
//

import CoreData
import SwiftUI

@main
struct NotesApp: App {
    private let persistenceController = PersistenceController.shared

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environment(
                    \.managedObjectContext,
                    persistenceController.container.viewContext
                )
        }
    }
}
