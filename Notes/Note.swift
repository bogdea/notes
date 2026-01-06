//
//  Note.swift
//  Notes
//
//  Created by Madalin Bogdea on 06.01.2026.
//

import Foundation

struct Note: Identifiable {
    let id = UUID()
    var title: String
    var content: String
}
