# -*- coding: utf-8 -*-
# Copyright (c) 2015, Wayzon and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class DeliveryNote(Document):
	def on_submit(self):
		ls=self.item
		for i in range(len(ls)):
			itm=ls[i].item
			itm_name=ls[i].item_name
			qty=ls[i].quantity
			q=frappe.db.sql("""select item_name,quantity from `tabItem Stock` where item_name=%s""",(itm_name))
			if q:
				q1=frappe.db.sql("""update `tabItem Stock` set quantity=quantity+%s where item_name=%s""",(qty,itm_name))
				frappe.msgprint("Stock Updated")
			else:
				frappe.throw('Item not available in stock')