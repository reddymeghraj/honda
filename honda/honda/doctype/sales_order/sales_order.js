
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
			d.amount=r.message[0][5];
			refresh_field('item');
			cur_frm.set_value('total_amount',r.message[0][5]);		
		}	
	})
}

/*cur_frm.cscript.quantity=function(doc,cdt,cdn)
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
}*/

//Mobile No. Validation
cur_frm.cscript.mobile_no = function (doc,cdt,cdn)
{
  var num = doc.mobile_no;
  var str=String(num);
  var gth = str.length;
  if (gth != 10)
    { 
      cur_frm.set_value('mobile_no','')
      frappe.throw('Enter 10 digit number!')
    }
}

//Email_Id Verification
cur_frm.cscript.email_id=function(doc,cdt,cdn)
{
	var str=doc.email_id;
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str))
  	{
  		return (true)
  	}
  	else
  	{
    	 cur_frm.set_value('email_id','')
      frappe.throw("You have entered an invalid email address!")
    	return (false)
    }
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
cur_frm.cscript.mode_of_payment=function(doc,cdt,cdn)
{
	if (doc.mode_of_payment=='Cash')
	{
		cur_frm.toggle_enable('cheque_no');
		cur_frm.toggle_enable('account_no');
		cur_frm.toggle_enable('bank_name');
		cur_frm.set_value('cheque_no','');
		cur_frm.set_value('bank_name','');
		cur_frm.set_value('account_no','');
	}
	else
	{
		cur_frm.toggle_enable('cheque_no',true);
		cur_frm.toggle_enable('account_no',true);
		cur_frm.toggle_enable('bank_name',true);
	}
}

cur_frm.fields_dict["item"].grid.get_field("select_engine_no").get_query = function(doc,cdt,cdn) {
	var child=locals[cdt][cdn];
	var item1=child.item_name;
	return {
		filters: {
			'item_name': item1,
			'vehicle_status':0
		}
	}
}

cur_frm.cscript.select_engine_no=function(doc, cdt, cdn)
{
	var d=locals[cdt][cdn];
	var vehicle_id=d.select_engine_no;
	frappe.call({
		method:'honda.honda.doctype.sales_order.sales_order.get_vehicle_details',
		args:{vehicle_id:vehicle_id},
		callback:function(r)
		{
			var d=locals[cdt][cdn];
			d.engine_no=r.message[0][0];
			d.key_no=r.message[0][1];
			d.battery_no=r.message[0][2];
			d.chassis_no=r.message[0][3];
			d.model_no=r.message[0][4];
			refresh_field('item');
				
		}
	});
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
/*frappe.ui.form.on("Sales Order Item", "item_remove", function(frm)
{
		var d=frappe.get_doc('Sales Order Item');
		var i=d.item_name;
		alert(i)
		cur_frm.cscript.get_ink(frm.doc,frm.cdt,frm.cdn);
});

cur_frm.cscript.get_ink=function(doc,cdt,cdn)
{
	alert("hello");
	var d= locals[cdt][cdn];
	var i=d.item_name;
	alert(i)
}*/