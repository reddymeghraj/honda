# -*- coding: utf-8 -*-
# Copyright (c) 2015, Wayzon and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe.model.mapper import get_mapped_doc


class PurchaseOrder(Document):
	pass

@frappe.whitelist()
def make_delivery_note(source_name, target_doc=None):
	return _make_delivery_note(source_name, target_doc)

def _make_delivery_note(source_name, target_doc=None, ignore_permissions=False):
	
	doclist = get_mapped_doc("Purchase Order", source_name, {
			"Purchase Order": {
				"doctype": "Delivery Note",
				"validation": {
					"docstatus": ["=", 1]
				}
			},
			"Purchase Order Item": {
				"doctype": "Delivery Note Item",
				"field_map": {
					"parent": "prevdoc_docname",
					#"parenttype": "prevdoc_doctype"
				}
			},
			
		}, target_doc, ignore_permissions=ignore_permissions)

	return doclist