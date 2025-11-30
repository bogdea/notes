//
//  Note.swift
//  Notes
//
//  Created by Madalin Bogdea on 30.11.2025.
//

import Foundation

struct Note: Identifiable {
    let id = UUID()
    let title: String
    let body: String
}
