cur_frm.cscript.item=function(doc,cdt,cdn)
{
	var i=doc.item;
	frappe.call({
		method:'honda.honda.doctype.vehicle_details.vehicle_details.get_img',
		args:{i:i},
		callback:function(r)
		{
			cur_frm.set_value('attach_img',r.message);
		}
	});
}