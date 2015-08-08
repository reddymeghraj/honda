# -*- coding: utf-8 -*-
# Copyright (c) 2015, Wayzon and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class Item(Document):
	def validate(self):	
		i=self.name
		itm=self.item_name
		q0=frappe.db.sql("""select item_name from `tabItem Stock` where item_name=%s""",(itm))
		if q0:
			#Do Nothing
			a=0
		else:
			q=frappe.db.sql("""select item_name,item_code,color,description,attach_img,rate from `tabItem` where name=%s""",(i))
			if q:
				q3=frappe.db.sql("""select max(cast(name as int)) from `tabItem Stock`""")[0][0]
				if q3:
					name=int(q3)+1
				else:
					name=1
				q4=frappe.db.sql("""insert into `tabItem Stock` set name=%s, item_name=%s,item_code=%s,color=%s,
					description=%s,attach_img=%s,rate=%s,quantity=%s""",(name,q[0][0],q[0][1],q[0][2],q[0][3],q[0][4],q[0][5],0))
				frappe.msgprint("New Stock Entry")
	def on_trash(slf):
		i=self.name
		q=frappe.db.sql("""delete from `tabItem Stock` where item_name=%s""",(i));
		frappe.msgprint("Iten deleted from Stock")