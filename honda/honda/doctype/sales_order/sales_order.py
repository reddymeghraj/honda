# -*- coding: utf-8 -*-
# Copyright (c) 2015, Wayzon and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe.model.document import Document

class SalesOrder(Document):
	def on_submit(self):
		ls=self.item
		for i in range(len(ls)):
			itm=ls[i].item
			itm_name=ls[i].item_name
			v_id=ls[i].select_engine_no
			qty=ls[i].quantity
			q=frappe.db.sql("""select quantity from `tabItem Stock` where item_name=%s""",(itm_name))
			if (q[0][0] < qty):
				frappe.throw(" Required Stock not available for selected item")
			else:
				q1=frappe.db.sql("""update `tabItem Stock` set quantity=quantity-%s where item_name=%s""",(qty,itm_name))
			q2=frappe.db.sql("""update `tabVehicle Details` set vehicle_status=1 where name=%s""",(v_id))	
@frappe.whitelist()
def get_item(i):
	q=frappe.db.sql("""select item_name,item_code,color,description,attach_img,rate from `tabItem` where name=%s""",(i))
	return (q)

@frappe.whitelist()
def get_vehicle_details(vehicle_id):
	q=frappe.db.sql("""select engine_no,key_no,battery_no,chassis_no,model_no from `tabVehicle Details` where name=%s""",(vehicle_id))
	return(q)

@frappe.whitelist()
def get_money_in_words(n):
	from frappe.utils import money_in_words
	from frappe.utils import in_words
	x=money_in_words(n)
	return (x)