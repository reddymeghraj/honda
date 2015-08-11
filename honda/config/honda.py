from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"label": _("Documents"),
			"icon": "icon-star",
			"items": [
				{
					"type": "doctype",
					"name": "Item",
					"description": _("All Products."),
				},
				{
					"type": "doctype",
					"name": "Supplier",
					"description": _("Supplier Database."),
				},
				{
					"type": "doctype",
					"name": "Item Stock",
					"description": _("Current Stock."),
				},
				{
					"type": "doctype",
					"name": "Vehicle Details",
					"description": _("Vehicle Database."),
				},
				{
					"type": "doctype",
					"name": "Sales Order",
					"description": _("Sales orders from Customers."),
				},
				{
					"type": "doctype",
					"name": "Purchase Order",
					"description": _("Purchase orders from Suppliers."),
				},
				{
					"type": "doctype",
					"name": "Delivery Note",
					"description": _("Confirmed orders from Suppliers."),
				},
				
			]
		},
		
		{
			"label": _("Standard Reports"),
			"icon": "icon-list",
			"items": [
				{
					"type": "report",
					"is_query_report": True,
					"name": "Stock Report",
					"doctype": "Item Stock",
					"description": _("Current stock.")
				},
				{
					"type": "report",
					"is_query_report": True,
					"name": "Sales Report",
					"doctype": "Sales Order",
					"description": _("Datewise Sales report.")
				},
				{
					"type": "report",
					"is_query_report": True,
					"name": "Purchase Report",
					"doctype": "Delivery Note",
					"description": _("Datewise Purchase report.")
				},
				
			]
		},
		
	]
