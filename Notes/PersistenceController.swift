//
//  PersistenceController.swift
//  Notes
//
//  Created by Madalin Bogdea on 06.01.2026.
//

import CoreData
import Foundation

struct PersistenceController {
    static let shared = PersistenceController()

    let container: NSPersistentCloudKitContainer

    init() {
        container = NSPersistentCloudKitContainer(name: "NotesModel")

        container.loadPersistentStores { _, error in
            if let error = error as NSError? {
                fatalError("Unresolved error \(error)")
            }
        }

        container.viewContext.automaticallyMergesChangesFromParent = true
    }

}
