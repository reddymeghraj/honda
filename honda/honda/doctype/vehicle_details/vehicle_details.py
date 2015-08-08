# -*- coding: utf-8 -*-
# Copyright (c) 2015, Wayzon and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class VehicleDetails(Document):
	pass
@frappe.whitelist()
def get_img(i):
	q=frappe.db.sql("""select attach_img from `tabItem` where name=%s""",(i))
	return (q[0][0])