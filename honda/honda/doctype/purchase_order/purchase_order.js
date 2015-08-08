

cur_frm.cscript.custom_refresh = function(doc) {
	if(doc.docstatus==1) {
		if(doc.status != 'Stopped') 
		{
			cur_frm.add_custom_button(__('Make Delivery Note'),
			cur_frm.cscript['Make Delivery Note'], "icon-exclamation", "btn-default");
		}
	};
}

cur_frm.cscript['Make Delivery Note'] = function() {
	frappe.model.open_mapped_doc({
		method: "honda.honda.doctype.purchase_order.purchase_order.make_delivery_note",
		frm: cur_frm
	});
}

cur_frm.cscript.item=function(doc,cdt,cdn)
{
	var d= locals[cdt][cdn];
	var i= d.item;
	frappe.call({
		method:'honda.honda.doctype.sales_order.sales_order.get_item',
		args:{i:i},
		callback:function(r)
		{	
			var d= locals[cdt][cdn];
			d.item_name=r.message[0][0];
			d.item_code=r.message[0][1];
			d.item_color=r.message[0][2];
			d.i_description=r.message[0][3];
			d.attach_img=r.message[0][4];
			d.rate=r.message[0][5];
			refresh_field('item');

		}	
	})
}

cur_frm.cscript.quantity=function(doc,cdt,cdn)
{
	var d=locals[cdt][cdn];
	var q=d.quantity;
	var r= d.rate;
	var amt=parseInt(q)*parseInt(r);
	d.amount=amt;
	refresh_field('item')

	var tamt=0.00;
	var el = doc.item || [];
	for(var i in el) 
	{
		tamt += parseInt(el[i].amount);
	}
	cur_frm.set_value('total_amount',tamt);
}

cur_frm.cscript.tax_amount=function(doc,cdt,cdn)
{
	var t=doc.tax_amount;
	var tamt=doc.total_amount;
	var t_tax_amount=parseInt(tamt)+parseInt(t);
	cur_frm.set_value('total_amount',t_tax_amount);
}

cur_frm.cscript.discount_amount=function(doc,cdt,cdn)
{
	var tdiscount=doc.discount_amount;
	var tamt=doc.total_amount;
	var t_discount_amount=parseInt(tamt)-parseInt(tdiscount);
	cur_frm.set_value('total_amount',t_discount_amount);
}

cur_frm.cscript.total_amount=function(doc,cdt,cdn)
{
	var amt=doc.total_amount;
	frappe.call({
		method:'honda.honda.doctype.sales_order.sales_order.get_money_in_words',
		args:{n:amt},
		callback:function(r)
		{
			cur_frm.set_value('amount_in_words',r.message)
		}
	})
}