function cityInit(c) {
	var b = $("#comselected1").val();
	var e = $("#YXBindUserCode").val();
	var a = $("#xubaoguankong").val();
	var f = getComQX();
	var d = JSON.stringify({
		comCode: b,
		comQX: f,
		YXBindUserCode: e,
		xubaoguankong: a,
		renewFlag: "0"
	});
	$.ajax({
		type: "POST",
		dataType: "json",
		async: false,
		url: c,
		data: {
			json: d
		},
		success: function(o) {
			var h;
			if (null != o && o != "") {
				h = JSON.parse(o);
				if (showExMessageCheck(h)) {
					return false
				}
				var j = h.comList;
				var m = j.length;
				$("#comselected").empty();
				for (var k = 0; k < m; k++) {
					if ($("#oldcomcode").val() != null && $("#oldcomcode").val() != "" && $("#oldcomcode").val() != undefined && $(
							"#oldcomcode").val() == j[k].comcode) {
						$("#comselected").val($("#oldcomcode").val());
						$("#comselected").append("<option selected value='" + j[k].comcode + "'>" + j[k].comcname + "</option>")
					} else {
						$("#comselected").append("<option value='" + j[k].comcode + "'>" + j[k].comcname + "</option>")
					}
				}
				if (e != null && e != "") {
					if (a != null && a == "1") {
						var g = h.byBusinessAgent_1;
						var n = h.subordinateName;
						var p = h.subordinateCode;
						var l = h.allchannelBusinessnature;
						var q = h.allchannelNewBusinessnature;
						$("#source").val(g);
						$("#channel_code").val(p);
						$("#channel_name").val(n);
						$("#ByBusinessAgent").val(l);
						$("#ByBusinessAgent_2").val(q)
					}
				}
			} else {
				alert_info("系统异常，请联系运维人员协助处理！");
				return
			}
		},
		error: function(g) {
			alert_info("系统异常，请联系运维人员协助处理！")
		}
	})
}

function allchannel_way() {
	var a = $("#comselected").val();
	var b = $("#YXBindUserCode").val();
	if (allchannel_Switch(a)) {
		if (b != null && b != "") {
			getAllchannelMessage()
		}
	}
}
var cities = new Array();
var coms = new Array();

function changeCity(d) {
	var f = d;
	var c = $("#comselected1");
	c.length = 0;
	$("#comSelected").length = 0;
	var a = false;
	var b = "";
	if (f.val() == "33020000" || f.val() == "35020000" || f.val() == "21020000" || f.val() == "37020000" || f.val() ==
		"44030000") {
		b = d.val()
	} else {
		b = d.val().substring(0, 2) + "000000"
	}
	if (b == "45000000") {
		$("#gxflag").show()
	} else {
		$("#gxflag").hide()
	}
	for (var e = 0; e < cities.length; e++) {
		if (cities[e][0] == b) {
			c.options[c.length] = new Option(cities[e][2], cities[e][1]);
			a = true
		}
	}
	if (cities.length > 0 && coms.length > 0 && c.length < 1) {
		window.location.href = "/piccallweb/DAA3g/tb/business/AllChannelUIGetAccessPermission.jsp?TZFlag=&citieslength=" +
			cities.length + "&comslength=" + coms.length + "&citySelectedObjlength=" + c.length
	}
	if (f.val() == "33020000" || f.val() == "35020000" || f.val() == "21020000" || f.val() == "37020000" || f.val() ==
		"44030000") {
		c.val(f.val())
	}
	if (a) {
		c.attr("disabled", false);
		c.show()
	} else {
		c.attr("disabled", true);
		c.hide()
	}
}

function changeComCode(j) {
	var h = $(j).val();
	var a = $("#comSelected");
	var f = $("#areacode");
	a.length = 0;
	var e = false;
	for (var d = 0; d < coms.length; d++) {
		if (coms[d][0] == h) {
			var c = comcodes.split("^");
			var g = false;
			if (comcodes == "" || comcodes == null) {
				g = true
			}
			for (var b = 0; b < c.length; b++) {
				if (c[b].substr(0, 2) == h.substr(0, 2)) {
					if (c[b].substr(2) == "000000") {
						g = true;
						break
					} else {
						if (true == isPreOrCity(c[b]) && c[b] == coms[d][0]) {
							g = true;
							break
						} else {
							if (c[b] == coms[d][1]) {
								g = true;
								break
							}
						}
					}
				}
			}
			if (g) {
				if (coms[d][1] == "11019204") {
					a.options[a.length] = new Option(coms[d][2], coms[d][1], true, true);
					e = true
				} else {
					if (coms[d][1] == "21010900") {
						a.options[a.length] = new Option(coms[d][2], coms[d][1], true, true);
						e = true
					} else {
						if (indivProfit_plateModify(h)) {
							if (coms[d][4] != "1") {
								a.options[a.length] = new Option(coms[d][2], coms[d][1]);
								e = true
							}
						} else {
							a.options[a.length] = new Option(coms[d][2], coms[d][1]);
							e = true
						}
					}
				}
			}
		}
	}
	if (a.length > 0) {
		$("#kws").val(a.options[0].text)
	}
	if (e) {
		a.attr("disabled", false);
		a.show()
	} else {
		a.attr("disabled", true);
		a.hide()
	}
	if (h !== "21020000" && h !== "33020000" && h !== "35020000" && h !== "37020000" && h !== "44030000") {
		f.val($("#cityselected").val())
	} else {
		f.val(h)
	}
}

function selectClausetypeByUsenaturecode() {
	var a = $("#EDD_UseNatureCode").val();
	if (($("#areacode").val() == "31000000" && !indivProfit_ShangHaiTiaoKuan()) || $("#areacode").val() == "42000000") {} else {
		if (a == 211) {
			$("#clausetype").val("F42");
			changeEADMessage();
			if ($("#kindcode050711").is(":checked") || $("#kindcode050711").is(":checked")) {
				if ($(".yw_list").length == 0) {
					leaveAmount(true)
				}
			}
		}
		if (a == 212 || a == 213 || a == 220) {
			$("#clausetype").val("F41")
		}
	}
}

function judgeLegalHolidays() {
	if ($("#clausetype").val() != "F42" && $("#kindcode051047").is(":checked")) {
		if (change_Holiday()) {
			if (confirm("当条款类型为F42，才允许选择第三者责任保险法定节假日限额翻倍条款，是否继续？")) {
				$("#kindcode051047").prop("checked", false);
				$("#kindcode051047").attr("disabled", true);
				changeKindCode($("#kindcode051047"))
			} else {
				$("#EDD_UseNatureCode").val("211");
				$("#clausetype").val("F42");
				selectClausetypeByUsenaturecode();
				clearBaseAmount(true);
				changeCarInfo()
			}
		} else {
			if (confirm("当条款类型为F42，才允许选择法定节假日责任限额翻倍保险，是否继续？")) {
				$("#kindcode051047").prop("checked", false);
				$("#kindcode051047").attr("disabled", true);
				changeKindCode($("#kindcode051047"))
			} else {
				$("#EDD_UseNatureCode").val("211");
				$("#clausetype").val("F42");
				selectClausetypeByUsenaturecode();
				clearBaseAmount(true);
				changeCarInfo()
			}
		}
	}
	if ($("#clausetype").val() == "F42" && $("#kindcode050602").is(":checked")) {
		$("#kindcode051047").attr("disabled", false)
	} else {
		if ($("#clausetype").val() != "F42" && $("#kindcode050602").is(":checked")) {
			$("#kindcode051047").attr("disabled", true)
		}
	}
}

function UnDDLReadOnly3() {
	var b = document.getElementById("besttime");
	if (b) {
		var a = b.selectedIndex;
		b.onchange = function() {}
	}
}

function resetVehicleInfo() {
	$("#license_pn").attr("readonly", false);
	if ($("#spanShowItemCar_d").css("display") != "block") {
		$("#Item_KindRate").hide();
		if ($("#platBIFlag").val() == "1") {
			$("#platBIFlag").val("-1");
			$("#QueryCheckFlagBI").val("")
		}
		$("#spanShowItemCar_d").show();
		$("#spanShowItemCar_d1").hide()
	}
	var b = $("#iKType").val();
	if (($("#simulation").val() != "true") && (b == "01")) {
		if (CheckFCarYEJ_CheckTime($("#areacode").val()) || CheckFCarEDD_CheckTime($("#areacode").val())) {
			$("#license_pn").val(parent.PprDGetPara("PLATENO"))
		} else {
			$("#license_pn").val(parent.PprDGetPara("PLATENO"))
		}
	}
	$("#framenoshowc").attr("readonly", false);
	$("#EngineNo").attr("readonly", false);
	$("#enginenoshowc").attr("readonly", false);
	$("#needrenewal").val("1");
	$("#Renewal").attr("disabled", false);
	$("#Is_renewalBypolicy").val("0");
	$("#IsRenewalByPolicy").val("0");
	$("#IsPolicyRenewal").val("0");
	$("#isOnClick").val("");
	$("#IsNewCarPolicy").val("0");
	$("#beforeproposalno").val("");
	$("#hasNeedRenew").val("Y");
	$("#renewalType").val("");
	$("#haveRenewalInfo").val("");
	$("#RenewalCartype").val("0");
	$("#xubaoguankong").val("0");
	var e = $("#IsSeparate").val();
	if ($("#useyears").val() > 0) {
		if (e == "2") {
			UnDDLReadOnly3();
			$("#besttime").val("1")
		} else {
			$("#NotshowBestTime").val("1")
		}
	} else {
		if (e == "2") {
			UnDDLReadOnly3();
			$("#besttime").val("0")
		} else {
			$("#NotshowBestTime").val("0")
		}
	}
	$("#renewalsbz").val("0");
	if (indivProfit_MonopolyBug()) {
		var a = $("#IsGreenRenewResult").val();
		var d = $("#ResourceCode").val();
		var c = $("#monopolyCodeFlag").val();
		if (a == "9" && d == c) {
			$("#ResourceCode").val();
			$("#ResourceName").val()
		}
		$("#IsGreenRenewResult").val("0");
		$("#monopolyCodeFlag").val("");
		$("#monopolyNameFlag").val("")
	}
	hiddenLastPoliInfo("");
	alert_success("重置已完成！")
}

function checkStartDate(k) {
	var c;
	var g = $("#paravalue").val();
	var l = $("#comselected1").val();
	var e = $("#starthourjq").val();
	if (e == "0") {
		$("#endhourjq").val("24")
	}
	var h = $("#endhourjq").val();
	var j = $("#starthoursy").val();
	if (j == "0") {
		$("#endhoursy").val("24")
	}
	var b = $("#endhoursy").val();
	if (checkFullDate(k) == false) {
		return false
	}
	var i = new Date();
	var f = getNextDateFullDate1(i, 1);
	var d = getNextDateFullDate1(i, 2);
	var a = getNextDateFullDate1(i, 3);
	if (g == "1") {
		if (e == "0" && h == "24") {
			if (k.id == "startdatejq") {
				$("#enddatejq").val(getNextDateFullDate(getNextYearFullDate(k.value, 1), -1))
			}
		} else {
			if (e == h) {
				if (k.id == "startdatejq") {
					$("#enddatejq").val(getNextDateFullDate(getNextYearFullDate(k.value, 1), 0))
				}
			}
		}
		if ((j == "0" && b == "24")) {
			if (k.id == "startdatesy") {
				$("#enddatesy").val(getNextDateFullDate(getNextYearFullDate(k.value, 1), -1))
			}
		} else {
			if (j == b) {
				if (k.name == "startdatesy") {
					$("#enddatesy").val(getNextDateFullDate(getNextYearFullDate(k.value, 1), 0))
				}
			} else {
				if (RateChg_CheckTime(l)) {
					if (k.id == "startdatesy") {
						$("#enddatesy").val(getNextDateFullDate(getNextYearFullDate(k.value, 1), 0))
					}
				}
			}
		}
	} else {
		if (k.id == "startdatejq") {
			$("#enddatejq").val(getNextDateFullDate(getNextYearFullDate(k.value, 1), -1))
		}
		if (k.id == "startdatesy") {
			$("#enddatesy").val(getNextDateFullDate(getNextYearFullDate(k.value, 1), -1))
		}
	}
	changeEnrollDate();
	return true
}

function getNextDateFullDate1(e, d) {
	var c = new Date(e);
	if (d == null) {
		d = 1
	}
	var a = c.getTime() + (d * 24 * 60 * 60 * 1000);
	var b = convertFullDateToString(new Date(a));
	return b
}

function checkFullDate(a) {
	a.value = trim(a.value);
	var c = a.value;
	var b = a.description;
	if (b == null) {
		b = a.name
	}
	if (c == "") {
		return false
	}
	if (isNumeric(c)) {
		if (c.length > 8) {
			alert_info("请输入合法的" + b + "\n类型为日期，格式为YYYY-MM-DD 或者YYYYMMDD");
			a.value = "";
			a.focus();
			a.select();
			return false
		}
		if (c.length > 6) {
			c = c.substring(0, 4) + DATE_DELIMITER + c.substring(4, 6) + DATE_DELIMITER + c.substring(6);
			a.value = c
		}
	}
	if (!isDate(c, DATE_DELIMITER) && !isDate(c)) {
		alert_info("请输入合法的" + b + "\n类型为日期，格式为YYYY-MM-DD 或者YYYYMMDD");
		a.value = "";
		a.focus();
		a.select();
		return false
	}
	return true
}

function YWClearAge() {
	var c = $("#areacode").val();
	if (indivProfit_Olderfracture(c)) {
		var a = $("#ymkind");
		if (a) {
			alert_info($("#ymkind li input").eq(5).val());
			var d = a.rows.length;
			for (var b = 1; b < d - 1; b++) {
				document.getElementsByName("YWAge")[b].value = ""
			}
		}
	}
}

function checkStartDatePre(d) {
	var b = $("#comselected").val();
	var e = $("#paravalue").val();
	var a = $("#startdate").val();
	var c = $("#startdatesy").val();
	if (e == "1") {
		if (RateChg_CheckTime(b)) {
			if (d.id == "startdatesy") {
				$("#starthoursy").val("0")
			}
		}
	}
	if (a != "") {
		$("#startdate").val(c)
	}
}

function pressDatetime(a) {
	return pressCustom(a, /([\d\.\/\-\:\s]|[\b])/)
}

function checkduanqiJQ() {
	var c = $("#paravalue").val();
	var b = $("#starthourjq").val();
	var a = $("#endhourjq").val();
	if (c == "1") {
		if (b == "0" && a == "24") {
			if (compareFullDate(getNextDateFullDate(getNextYearFullDate($("#startdatejq").val(), 1), -1), $("#enddatejq").val()) !=
				0) {
				alert_info("温馨提示：由于交强险日期发生改变，该单为非整年单，请谨慎承保！")
			}
		}
		if (b == a) {
			if (compareFullDate(getNextDateFullDate(getNextYearFullDate($("#startdatejq").val(), 1), 0), $("#enddatejq").val()) !=
				0) {
				alert_info("温馨提示：由于交强险日期发生改变，该单为非整年单，请谨慎承保！")
			}
		}
	} else {
		if (compareFullDate(getNextDateFullDate(getNextYearFullDate($("#startdatejq").val(), 1), -1), $("#enddatejq").val()) !=
			0) {
			alert_info("温馨提示：由于交强险日期发生改变，该单为非整年单，请谨慎承保！")
		}
	}
}

function checkEndDate(a) {
	if (a.id == "enddatejq") {
		if (compareFullDate($("#startdatejq").val(), $(a).val()) != -1) {
			alert_info("交强险终保日期不能小于起保日期，请重新填写。");
			$("#enddatejq").val(getNextDateFullDate(getNextYearFullDate($("#startdatejq").val(), 1), -1));
			a.focus();
			return false
		}
	}
	if (a.id == "enddatesy") {
		if (compareFullDate($("#startdatesy").val(), $(a).val()) != -1) {
			alert_info("商业险终保日期不能小于起保日期，请重新填写。");
			$("#enddatesy").val(getNextDateFullDate(getNextYearFullDate($("#startdatesy").val(), 1), -1));
			a.focus();
			return false
		}
	}
}

function hiddenLastPoliInfo(b) {
	var a = $("#comSelected").val();
	if (indivProfit_oriMatchTime(a)) {
		$("#renewPolicyTime").hide();
		$("#renewPolicyTimeSY").show();
		$("#renewPolicyTimeJQ").show();
		$("#ishasOldOriPol").val("");
		$("#LastEndDateOri").val("");
		$("#LastEndHourOri").val("");
		$("#isnoRenewwalSY").val("否");
		$("#isnoRenewwalJQ").val("否");
		$("#renewPolicyBZEndate").val("");
		$("#renewPolicyBZEnHour").val("");
		$("#renewPolicySYEndate").val("");
		$("#renewPolicySYEnHour").val("")
	}
}

function changeEADMessage() {
	var areacode = $("#areacode").val();
	var comcode = $("#comselected").val();
	if (hainanAddVerificationCode(areacode)) {
		hannanyanzhengma()
	}
	if ($("#ywFlag").val() == "Y" && indivProfit_EADChanged(comcode) && $("#clausetype").val() != "F41") {
		if (indivProfit_EADChanged(comcode)) {
			if ($("#kindcode050711").is(":checked") == true || $("#kindcode050712").is(":checked") == true) {
				var identifynumber = "";
				if ($("#AppliInsuredNature").val() == "3") {
					identifynumber = $("#AppliIdentifyNumber").val()
				} else {
					identifynumber = $("#AppliIdentifyNumberBS").val()
				}
				if (identifynumber != null && identifynumber != "") {
					var paravalue = "";
					paravalue = $("#rationtype").val();
					var json = "{'comCode':'" + comcode + "','areaCode':'" + areacode + "','identifyNumber':'" + identifynumber +
						"','riskCode':'EAD'}";
					$.ajax({
						type: "POST",
						dataType: "JSON",
						data: {
							jsonData: json
						},
						url: "nau/eAD/qry",
						success: function(data) {
							data = eval("(" + data + ")");
							if (showExMessageCheck(data)) {
								return false
							}
							$("#eachamount").val(data.amount);
							$("#basepremium").val(data.basepremium);
							$("#rationtype").val(data.rationtype);
							$("#eachquantity").val("0");
							$("#quantity").val("0");
							$("#ywamount").val("0");
							$("#premium").val("0");
							$("#sumnetpremium").val("0.00");
							$("#sumnetpremium").attr("baseNetPremiumEAD", data.sumnetpremium);
							$("#EAD060066").val(data.EAD060066);
							$("#EAD070050").val(data.EAD070050);
							if ($("#rationtype").val() == "EAD440000d") {
								if (parseInt($("#eachquantity").val()) > 10) {
									errorMessage("温馨提示：" + $("#AppliName").val() + "承保份数上限：10份！");
									$("#eachquantity").val("");
									$("#eachquantity").focus();
									return false
								}
							}
						}
					})
				}
			}
		}
	}
}

function checkLicenseCity() {
	var a = $("#cityselected").val();
	a = a.substr(0, 2);
	if (a != null) {
		if ($("#license_pn").val() != null) {
			switch (a) {
				case "11":
					return $("#license_pn").val().charAt(0) == "京";
					break;
				case "12":
					return $("#license_pn").val().charAt(0) == "津";
					break;
				case "31":
					return $("#license_pn").val().charAt(0) == "沪";
					break;
				case "50":
					return $("#license_pn").val().charAt(0) == "渝";
					break;
				case "13":
					return $("#license_pn").val().charAt(0) == "冀";
					break;
				case "41":
					return $("#license_pn").val().charAt(0) == "豫";
					break;
				case "53":
					return $("#license_pn").val().charAt(0) == "云";
					break;
				case "21":
					return $("#license_pn").val().charAt(0) == "辽";
					break;
				case "23":
					return $("#license_pn").val().charAt(0) == "黑";
					break;
				case "43":
					return $("#license_pn").val().charAt(0) == "湘";
					break;
				case "34":
					return $("#license_pn").val().charAt(0) == "皖";
					break;
				case "37":
					return $("#license_pn").val().charAt(0) == "鲁";
					break;
				case "65":
					return $("#license_pn").val().charAt(0) == "新";
					break;
				case "32":
					return $("#license_pn").val().charAt(0) == "苏";
					break;
				case "33":
					return $("#license_pn").val().charAt(0) == "浙";
					break;
				case "36":
					return $("#license_pn").val().charAt(0) == "赣";
					break;
				case "42":
					return $("#license_pn").val().charAt(0) == "鄂";
					break;
				case "45":
					return $("#license_pn").val().charAt(0) == "桂";
					break;
				case "46":
					return $("#license_pn").val().charAt(0) == "琼";
					break;
				case "62":
					return $("#license_pn").val().charAt(0) == "甘";
					break;
				case "14":
					return $("#license_pn").val().charAt(0) == "晋";
					break;
				case "15":
					return $("#license_pn").val().charAt(0) == "蒙";
					break;
				case "61":
					return $("#license_pn").val().charAt(0) == "陕";
					break;
				case "22":
					return $("#license_pn").val().charAt(0) == "吉";
					break;
				case "35":
					return $("#license_pn").val().charAt(0) == "闽";
					break;
				case "52":
					return $("#license_pn").val().charAt(0) == "贵";
					break;
				case "44":
					return $("#license_pn").val().charAt(0) == "粤";
					break;
				case "63":
					return $("#license_pn").val().charAt(0) == "青";
					break;
				case "54":
					return $("#license_pn").val().charAt(0) == "藏";
					break;
				case "51":
					return $("#license_pn").val().charAt(0) == "川";
					break;
				case "64":
					return $("#license_pn").val().charAt(0) == "宁";
					break
			}
		}
	}
}

function notePurchasePrice(a) {
	if ($("#NewDeviceFlag").val() == "1") {
		alert_info("温馨提示：此处填写的新车购置价不含新增设备价值。")
	}
	return true
}

function undoSetReadonlyOfElement(e) {
	if (e.type == "select-one") {
		if (e.setReadonlyFlag != true) {
			return
		} else {
			e.setReadonlyFlag = false
		}
		var c = e.optionTags;
		var d = e.value;
		for (var b = e.options.length - 1; b >= 0; b--) {
			e.remove(b)
		}
		for (var b = c.length - 1; b >= 0; b--) {
			var a = c[b];
			var f = document.createElement("OPTION");
			f.value = a.value;
			f.text = a.text;
			e.add(f)
		}
		e.value = d
	} else {
		if ((e.type == "hidden") || (e.type == "password") || (e.type == "text") || (e.type == "textarea")) {
			if (e.setReadonlyFlag != true) {
				return
			} else {
				e.setReadonlyFlag = false
			}
			e.onblur = e.oldOnblur;
			e.ondblclick = e.oldOndblclick;
			e.onfocus = e.oldOnfocus;
			e.readOnly = false;
			e.className = e.oldClassName
		} else {
			if (e.type == "button") {
				if (e.setReadonlyFlag != true) {
					return
				} else {
					e.setReadonlyFlag = false
				}
				if (e.name.indexOf("Delete") > -1 || e.name.indexOf("Insert") > -1) {
					e.attr("disabled", false)
				}
			} else {
				if (e.type == "checkbox") {
					setCheckBoxReadonly(e, false)
				} else {
					if (e.type == "radio") {
						setRadioReadonly(e, false)
					}
				}
			}
		}
	}
}

function changeComCodeTax(e) {
	var b = $(e).val();
	var c = $("#comselected1Old").val();
	if (b == null || c == null) {
		return
	}
	if (b.length < 4 || c.length < 4) {
		return
	}
	var f = b.substring(0, 4);
	var a = c.substring(0, 4);
	var d = $("#taxtype").val();
	if (f == "3301" || f == "4401" || a == "3301" || a == "4401") {
		if (d != "1") {
			hiddenChechuanshui();
			$("spanShowCarShipTax").className = "title_text_right"
		}
	}
	$("#castquerycarflag").val("0")
}

function changePlateType(g) {
	var e = $(g).val();
	var a = g.old;
	if (indivProfit_addPlateType(e)) {
		if (!indivProfit_addPlateType(a)) {
			var c = $("#licensetype");
			c.add(new Option("大型新能源汽车", "51"));
			c.add(new Option("小型新能源汽车", "52"));
			var f = $("#licensecolorcode");
			f.add(new Option("渐变绿", "06"));
			f.add(new Option("黄绿双拼", "07"))
		}
	} else {
		if (indivProfit_addPlateType(a)) {
			var c = $("#licensetype");
			var d = c.options.length;
			for (var b = d - 1; b >= 0; b--) {
				if (c.options[b].val() == "51" || c.options[b].val() == "52") {
					c.options.remove(b)
				}
			}
			var f = $("#licensecolorcode");
			d = f.options.length;
			for (var b = d - 1; b >= 0; b--) {
				if (f.options[b].val() == "06" || f.options[b].val() == "07") {
					f.options.remove(b)
				}
			}
		}
	}
}

function citychange() {
	if (DisputeSettlementWay($("#cityselected").val())) {
		var b = $("ArgueSolutionHirBin_id");
		var a = $("#cityselected").val();
		if ($("#cityselected").val() != "23010000") {
			$("spanArbitBoardNameHirBin").hide();
			$("arbitBoardNameHirBin").hide();
			b.options[0].attr("selected", true)
		} else {
			b.options[1].attr("selected", true);
			$("spanArbitBoardNameHirBin").show();
			$("arbitBoardNameHirBin").show()
		}
	}
}

function chgComSelected(b) {
	var c = $("comSelected");
	for (var a = 0; a < c.length; a++) {
		if (c.options[a].val().indexOf(b) >= 0 || c.options[a].text.indexOf(b) >= 0) {
			$("kws").val(c.options[a].text);
			getCityFromComCodeselected(c.options[a].val())
		}
	}
}

function changeisdax() {
	if (indivProfit_AddDAX($("#areacode").val())) {}
}

function carModelName(b) {
	var a = b.keyCode;
	if (a >= 97 && a <= 122) {
		window.event.keyCode = a - 32
	}
	return b
}

function checkPurchasePriceWX(b) {
	var a = $("#comselected").val();
	if (a == "32020900" && $("#enrolldate").val() == "" && $("#field").val() != "") {
		alert_info("温馨提示：请先输入初登日期，在录车辆品牌型号！");
		$("#enrolldate").focus();
		return false
	}
}

function generateLicenseNo(a) {
	$(a).val($(a).val().toUpperCase())
}

function replace(e, a, b) {
	var c;
	var d = new RegExp(a, "g");
	if (e == null) {
		return null
	}
	c = e.replace(d, b);
	return c
}

function pressLicenseNo(b) {
	var a = window.event.keyCode;
	if (a >= 97 && a <= 122) {
		window.event.keyCode = a - 32
	}
	return pressCustom(b, /[a-zA-Z\d]/)
}

function pressCustom(d, a) {
	var c = String.fromCharCode(d.keyCode || d.charCode);
	var b = a.test(c);
	return b
}

function changeCarInfo() {
	if (hainanAddVerificationCode($("#areacode").val())) {
		hannanyanzhengma()
	}
	var b = $("#Item_KindRate");
	if (b.show()) {
		b.hide();
		$("#spanShowItemCar_d1").hide();
		$("#spanShowItemCar_d").show();
		$("#Item_KindRate").hide();
		if ($("#platBIFlag").val() == "1") {
			$("#platBIFlag").val("-1");
			$("#QueryCheckFlagBI").val("")
		}
		$("#riskButtion").hide()
	}
	clearSumPremium();
	var a = $("#areacode").val();
	if ($("#areacode").val() == "12000000" && indivProfit_TJCarShipTax()) {
		var d = $("#carShipTaxInput");
		if (d.show()) {
			d.hide();
			$("#spanShowCarShipTax").html("展开填写");
			$("#spanShowCarShipTax").attr("className", "title_text_right")
		}
		$("#carShipTaxFlag").val("0")
	}
	var c = $("#YXBindUserCode").val();
	if (AllChannel_Optimization_problem($("#areacode").val()) && null != c && "" != trim(c) && null != c && trim($(
			"#beforeproposalno").val()) != "") {
		if ($("#var01").is(":checked")) {
			$("#insurercode").val("03")
		}
	}
	if (CheckFCarEBS_CheckTime(a)) {
		initebsInfo()
	}
}

function resultchage() {
	var b = $("#areacode").val();
	if (!CheckFCarEBS_CheckTime(b)) {
		return true
	}
	var a = $("#zkl").val();
	if ($("#ebs_tab").is(":hidden")) {
		return true
	} else {
		if (a != null && a != "" && a < 3) {
			alert("温馨提示：非营业客车，且车辆核定载人数大等于3人时，允许投保EBS，请重新输入");
			clearEBSplan();
			$("#zkl").focus();
			$("#zkl").val("")
		} else {
			if (a != null && a != "") {
				$("#EBS_hezairenshu").val(a);
				$("#EBS_hezai").val(a);
				clearEBSplan();
				alert_info("温馨提示：更改载客量，需重新配置驾乘险方案");
				return true
			}
		}
	}
}

function ebs_clickCheck() {
	var a = $("#zkl").val();
	if ($("#iKType").val() != "05") {
		if (a == null || a == "" || a < 3) {
			alert("温馨提示：非营业客车，且车辆核定载人数大等于3人时，允许投保EBS，请重新输入");
			return false
		}
	}
	return true
}

function energyTypeIsEnergyCar() {
	if (AddEnergyTypeIsEnergyCar($("#areacode").val())) {
		var b = "";
		var c = "";
		var a = "0";
		c = $("#BJFUEL_TYPE").val();
		if ("1,2,3".indexOf(c) > -1) {
			a = "1"
		}
		if (a == "0") {
			$("#isEnergyCar").prop("checked", true)
		} else {
			if (a == "1") {
				$("#isEnergyCar1").prop("checked", true)
			}
		}
		$("#isEnergy_CarHidden").val(a)
	}
}

function ddrivetip(b, a, c) {}

function isDate(a, g) {
	var h = (g == null ? "-" : g);
	var f = a.split(h);
	if (f.length != 3) {
		return false
	}
	if (!isInteger(f[0]) || !isInteger(f[1]) || !isInteger(f[2])) {
		return false
	}
	var c = parseInt(f[0], 10);
	var d = parseInt(f[1], 10) - 1;
	var e = parseInt(f[2], 10);
	var b = new Date(c, d, e);
	if (b.getFullYear() != c || b.getMonth() != d || b.getDate() != e) {
		return false
	}
	return true
}

function isInteger(b) {
	var a = regExpTest(b, /\d+/g);
	return a
}

function isNumeric(b) {
	var a = regExpTest(b, /\d*[.]?\d*/g);
	return a
}

function regExpTest(c, b) {
	var a = false;
	if (c == null || c == "") {
		return false
	}
	if (c == b.exec(c)) {
		a = true
	}
	return a
}

function trim(a) {
	return leftTrim(rightTrim(a))
}

function leftTrim(b) {
	var a = /^\s*/;
	if (b == null) {
		return null
	}
	return b.replace(a, "")
}

function rightTrim(b) {
	var a = /\s*$/;
	if (b == null) {
		return null
	}
	return b.replace(a, "")
}

function carShipTaxThreeHidden() {
	var a = $("#areacode").val();
	hiddenChechuanshui()
}

function hiddenChechuanshui() {
	for (var a = 0; a < $("#TaxAbateType option").length; a++) {
		$("#TaxAbateType options[i]").attr("disabled", true)
	}
	for (var a = 0; a < $("#TaxAbateReason option").length; a++) {
		$("#TaxAbateReason options[i]").attr("disabled", true)
	}
	$("#taxabateamount").attr("readonly", false);
	$("#thispaytax").attr("readonly", false);
	$("#taxabatetype").val("");
	$("#thispaytax").val("0.00");
	$("#sumpaytax").val("0.00");
	$("#TaxAbateAmount").val("");
	$("#taxcomname").val("");
	$("#taxComCode").val("");
	$("#taxtype").val("1");
	$("#idTaxAbate").hide();
	$("#idtaxabateamount").hide();
	$("#dutypaidproofno").val("");
	$("#carShipTaxInput").hide();
	$("#spanShowItemCar_f").show();
	$("#spanShowItemCar_f1").hide();
	$("#spanShowCarShipTax").html("展开填写");
	$("#spanShowCarShipTax").attr("className", "title_text_right")
}

function clearBaseAmount(a) {
	if (a == true) {
		$("#BaseAmount").val("")
	} else {
		if ($("#ClauseType").val() != "F11") {
			$("#BaseAmount").val("")
		}
	}
}

function changeEnrollDate() {
	var r = $("#enrolldate").val();
	if (trim(r) == "") {
		$("#useyears").val("0");
		return false
	}
	$("#enddatesy").blur();
	if (r.length == 7) {
		r = r + "-01"
	}
	if (r.length == 6) {
		r = r.substring(0, 5) + "0" + r.substring(5, 6) + "-01"
	}
	if (r.length > 10) {
		showEnrollDateFormat();
		alert_info("车辆初次登记日期格式为：年-月-日 例如:2008-01-01");
		return false
	}
	if (isNumeric(r)) {
		if (r.length > 4) {
			r = r.substring(0, 4) + "-" + r.substring(4);
			$("#enrolldate").val(r)
		}
	}
	if (r.substring(0, 4) < 1990) {
		alert_info("初登年月不能早于1990年。");
		$("#enrolldate").focus();
		$("#enrolldate").select();
		return false
	}
	var f = new Date(replace($("#startdatesy").val(), "-", "/"));
	var j = new Date(replace(r, "-", "/"));
	var c = new Date();
	if (isNaN(f)) {
		alert_info("温馨提示：请检查起保日期是否正确。");
		return false
	}
	var p = f.getMonth() - j.getMonth();
	if (indivProfit_HAINAN_CheckTime() && $("#areacode").val() == "46000000") {
		p = f.getMonth() - j.getMonth()
	}
	if (p == 0) {
		if (indivProfit_HAINAN_CheckTime() && $("#areacode").val() == "46000000") {} else {
			if (j.getDate() - f.getDate() <= 0) {
				p++
			} else {
				p--
			}
		}
	}
	var q = Math.floor(((f.getFullYear() - j.getFullYear()) * 12 + p) / 12);
	$("#useyears").val(q);
	if (indivProfit_HAINAN_CheckTime() && $("#areacode").val() == "46000000") {
		q = Math.floor(((c.getFullYear() - j.getFullYear()) * 12 + p) / 12)
	}
	if (isNaN(q)) {
		q = 0
	}
	if (j.valueOf() > c.valueOf()) {
		alert_info("温馨提示：车辆初次登记日期不能晚于当前日期。");
		$("#useyears").val("");
		$("#enrolldate").val("");
		$("#enrolldate").focus();
		return false
	}
	if (q < 0) {
		alert_info("温馨提示：车辆初次登记日期不能晚于当前日期。");
		$("#useyears").val("");
		$("#enrolldate").val("");
		$("#enrolldate").focus();
		return false
	}
	var k = (f.getFullYear() - j.getFullYear()) * 12 + (f.getMonth() - j.getMonth());
	var k = (f.getFullYear() - j.getFullYear()) * 12 + p;
	if (indivProfit_HAINAN_CheckTime() && $("#areacode").val() == "46000000") {
		k = (f.getFullYear() - j.getFullYear()) * 12 + p
	}
	k = k % 12;
	if ($("#areacode").val() == "11000000") {
		var n = getNextDateFullDate(j, 270);
		if (compareFullDate(n, $("#startdatesy").val()) > 0) {
			q = "0"
		} else {
			if (compareFullDate(getNextYearFullDate(j, 2), $("#startdatesy").val()) > 0) {
				q = "1"
			}
		}
	}
	if ($("#areacode").val() == "33020000" && k > 9) {
		q = q + 1
	}
	if ($("#areacode").val() == "15000000" && k > 9) {
		q = q + 1
	}
	if ($("#areacode").val() == "50000000" && k > 9) {
		q = q + 1
	}
	if ($("#areacode").val() == "51000000" && k > 9) {
		q = q + 1
	}
	if ($("#areacode").val() == "37020000") {
		if ((f.getDate() - j.getDate()) > 0) {
			k = k + 1
		}
		if (k > 10 && q < 1) {
			q = q + 1
		}
	}
	if ($("#areacode").val() == "31000000") {
		if (k >= 9 && q < 2) {
			q = q + 1
		}
	}
	var a = $("#comselected1").val();
	if (a == null && a == "" && a == undefined) {
		a = $("#comselected").val()
	}
	if ($("#areacode").val() == "35000000") {
		var o = (f.getFullYear() - j.getFullYear()) * 12 + (f.getMonth() - j.getMonth());
		if ((f.getDate() - j.getDate()) < 0) {
			o = o - 1
		}
		if (indivProfit_useyears_change($("#comselected").val()) > 0) {
			if (indivProfit_SZUseryear()) {
				if ($("#comselected").val().substring(0, 4) == "4403") {
					var m = $("#starthoursy").val();
					var l = new Date(f.getFullYear(), f.getMonth() + 1, f.getDate(), m);
					var e = new Date(j.getFullYear(), j.getMonth() + 1, j.getDate());
					var g = 0;
					g = (e.getTime() - l.getTime()) / (24 * 60 * 60 * 1000);
					if (g <= 0) {
						q = 1
					} else {
						q = floor(2 + parseFloat((g - 334) / 365))
					}
				} else {
					var h = indivProfit_useyears_change($("#comselected").val());
					if (b < h) {
						q = 0
					}
					if (b >= h) {
						q = Math.floor((b - h) / 12) + 1
					}
				}
			} else {
				var h = indivProfit_useyears_change($("#comselected").val());
				if (b < h) {
					q = 0
				}
				if (b >= h) {
					q = Math.floor((b - h) / 12) + 1
				}
				if ($("#areacode").val() == "11000000") {
					if (b >= h && b < 24) {
						q = 1
					} else {
						q = Math.floor((b - 12) / 12) + 1
					}
				}
				if ($("#areacode").val() == "31000000") {
					if (b >= h && b < 21) {
						q = 1
					} else {
						if (b >= 21 && b < 36) {
							q = 2
						} else {
							q = Math.floor((b - 12) / 12) + 1
						}
					}
				}
			}
		}
		var h = 9;
		if (o < h) {
			q = 0
		}
		if (o >= h) {
			q = Math.floor((o - h) / 12) + 1
		}
	}
	if (a != null && a != "" && (a.substring(0, 4) == "3301")) {
		if ((f.getDate() - j.getDate()) < 0) {
			k = k - 1
		}
		if (k == -1) {
			q = q - 1
		}
	}
	if ($("#areacode").val() == "44000000" && indivProfit_GuangDongSCheckTime() && a.substring(0, 4) != "4401") {
		var d = (f.getFullYear() - j.getFullYear()) * 12 + (f.getMonth() - j.getMonth());
		if ((f.getDate() - j.getDate()) < 0) {
			d = d - 1
		}
		var h = 9;
		if (d < h) {
			q = 0
		}
		if (d >= h) {
			q = Math.floor((d - h) / 12) + 1
		}
	} else {
		if (a != null && a != "" && a.substring(0, 4) == "4419") {
			if ((f.getDate() - j.getDate()) > 0) {
				k = k + 1
			}
			if (k > 9 && q < 1) {
				q = q + 1
			}
		}
	}
	if (a != null && a != "" && a.substring(0, 4) == "4401") {
		if ((f.getDate() - j.getDate()) > 0) {
			k = k + 1
		}
		if (k > 9 && q < 1) {
			q = q + 1
		}
	}
	if (a != null && a != "" && a.substring(0, 4) == "5100") {
		if ((f.getDate() - j.getDate()) > 0) {
			k = k + 1
		}
		if (k > 9 && q < 1) {
			q = q + 1
		}
	}
	if (a != null && a != "" && a.substring(0, 4) == "2102") {
		if (f.getMonth() - j.getMonth() == 0 && ((f.getFullYear() - j.getFullYear()) * 12 + p) >= 12 && q >= 1 && (f.getDate() -
				j.getDate()) < 0) {
			q = q + 1
		}
		if (k >= 9 && q < 1) {
			q = q + 1
		}
	}
	if ($("#areacode").val() == "46000000" && indivProfit_HAINAN_CheckTime()) {}
	if (a != null && a != "" && a.substring(0, 4) == "4403") {
		if ((f.getDate() - j.getDate()) > 0) {
			k = k + 1
		}
		if (k > 10 && q < 1) {
			q = q + 1
		}
	}
	if ($("#areacode").val().substring(0, 2) == "34") {
		if ((f.getDate() - j.getDate()) > 0) {
			k = k + 1
		}
		if (k > 9 && q < 1) {
			q = q + 1
		}
		if (q * 12 + k - 21 > 0) {
			q = Math.floor(((f.getFullYear() - j.getFullYear()) * 12 + p - 9) / 12) + 1
		}
	}
	var b = (f.getFullYear() - j.getFullYear()) * 12 + (f.getMonth() - j.getMonth());
	if ((f.getDate() - j.getDate()) < 0) {
		b = b - 1
	}
	if (indivProfit_SZUseryear()) {
		if (document.fm.comSelected.value.substring(0, 4) == "4403") {
			var m = document.fm.StartHourSY.value;
			var l = new Date(f.getFullYear(), f.getMonth() + 1, f.getDate(), m);
			var e = new Date(j.getFullYear(), j.getMonth() + 1, j.getDate());
			var g = 0;
			g = (e.getTime() - l.getTime()) / (24 * 60 * 60 * 1000);
			if (g <= 0) {
				q = 1
			} else {
				q = floor(2 + parseFloat((g - 334) / 365))
			}
		} else {
			var h = indivProfit_useyears_change($("#comselected1").val());
			if (b < h) {
				q = 0
			}
			if (b >= h) {
				q = Math.floor((b - h) / 12) + 1
			}
		}
	} else {
		var h = indivProfit_useyears_change($("#comselected1").val());
		if (b < h) {
			q = 0
		}
		if (b >= h) {
			q = Math.floor((b - h) / 12) + 1
		}
		if ($("#areacode").val() == "11000000") {
			if (b >= h && b < 24) {
				q = 1
			} else {
				q = Math.floor((b - 12) / 12) + 1
			}
		}
		if ($("#areacode").value == "31000000") {
			if (b >= h && b < 21) {
				q = 1
			} else {
				if (b >= 21 && b < 36) {
					q = 2
				} else {
					q = Math.floor((b - 12) / 12) + 1
				}
			}
		}
	}
	if (xiaMen_useyears_change($("#comselected1").val())) {
		var i = j.getDate() - f.getDate();
		if (b == 9 && i != 0) {
			b = b + 1
		}
		if (b <= 9) {
			q = 0
		} else {
			if (b > 9 && b < 24) {
				q = 1
			} else {
				q = Math.floor((b - 12) / 12) + 1
			}
		}
	}
	$("#useyears").val(q);
	if (q == 0) {
		$("#insurercode").val("02")
	}
}

function getNextYearFullDate(d, c) {
	var b = new Date(d);
	if (c == null) {
		c = 1
	}
	b.setFullYear(b.getFullYear() + c);
	var a = convertFullDateToString(b);
	return a
}

function setCoefficient(c) {
	var a = c.value;
	var b = $("#coefficient1").attr("Coefficient1Val");
	a = (a == null ? 0 : a);
	b = (b == null ? 1 : b);
	b = parseFloat(b);
	if (b < 1.3) {
		$("#coefficient1").attr("minval", "1.30");
		$("#coefficient1").attr("maxval", "2.00")
	} else {
		if (b >= 1.3 && b <= 2) {
			$("#coefficient1").attr("minval", "1.00");
			$("#coefficient1").attr("maxval", "2.00")
		} else {
			if (b > 2) {
				$("#coefficient1").attr("minval", "1.00");
				$("#coefficient1").attr("maxval", b)
			}
		}
	}
}

function iniCarShipTax() {
	var g = new Date($("#startdatejq").val().replace("-", "/"));
	var a = g.getFullYear();
	var c = parseInt(a + "01");
	var b = parseInt($("#enrolldate").val().replace("-", ""));
	var h = new Date($("#enrolldate").val().replace("-", "/"));
	if (trim($("#prepaytaxyear").val()) == "") {
		$("#prepaytaxyear").val(new Date().getFullYear() - 1)
	}
	if ($("#useyears").val() == "" || $("#useyears").val() == "0") {
		if (h.getFullYear() >= new Date().getYear()) {
			$("#prepaytaxyear").val("");
			$("#paystartdate").val(h.getFullYear() + "-" + (h.getMonth() + 1) + "-" + ("1"));
			$("#payenddate").val(h.getFullYear() + "-12-31")
		} else {
			$("#prepaytaxyear").val("");
			$("#paystartdate").val(new Date().getYear() + "-1-1");
			$("#payenddate").val(new Date().getYear() + "-12-31")
		}
		if ($("#areacode").val() == "21020000") {
			var d = new Date($("#certificatedateflagdl").val().replace("-", "/"));
			if (d.getFullYear() < new Date().getYear()) {
				$("#prepaytaxyear").val("");
				$("#paystartdate").val(d.getFullYear() + "/" + (d.getMonth() + 1) + "/1");
				$("#payenddate").val(new Date().getYear() + "/12/31")
			}
		}
	} else {
		$("#paystartdate").val(a + "/1/1");
		$("#payenddate").val(a + "/12/31")
	}
	if ($("#areacode").val() == "12000000" && indivProfit_TJCarShipTax()) {
		$("#prepaytaxyear").val("");
		$("#paystartdate").val("");
		$("#payenddate").val("")
	}
	if ($("#citySelected").val() == "50000000") {
		var f = "";
		f = document.fm.InsuredNatureData.val();
		if (f == "3") {
			$("#Taxpayerno").val("500902220000202");
			document.fm.Taxpayerno.readOnly = true
		} else {
			document.fm.Taxpayerno.readOnly = false;
			$("#Taxpayerno").val("")
		}
	}
	if ($("#citySelected").val() == "44030000" || ($("#areacode").val() == "64000000")) {
		var e = $("#operatedate").val().split("-");
		$("#PayStartDate").val(e[0] + "/1/1");
		$("#PayEndDate").val(e[0] + "/12/31");
		if ($("#useyears").val() == "" || $("#useyears").val() == "0") {
			if (h.getFullYear() >= e[0]) {
				$("#PrePayTaxYear").val("");
				$("#PayStartDate").val(h.getFullYear() + "/" + (h.getMonth() + 1) + "/" + ("1"));
				$("#PayEndDate").val(h.getFullYear() + "/12/31")
			}
		}
	}
	$("#ThisPayTax").val(pointTwo(0));
	$("#PrePayTax").val(pointTwo(0));
	$("#DelayPayTax").val(pointTwo(0));
	$("#SumPayTax").val(pointTwo(0));
	if ($("#areacode").val() != "11000000") {
		if ($("#areacode").val() == "12000000" && indivProfit_TJCarShipTax()) {} else {
			calculCarTax()
		}
	}
	if ($("#areacode").val().substring(0, 2) == "11") {}
	if ($("#paravalueS").val() == "1") {
		setCSTFieldReadonly($("#PrePolicyEndDate"), true)
	}
}

function PeriodCheck() {
	if ($("#periodcheckflag").val() == "0") {
		if ($("#licensecolorcode").val() == "") {
			alert_info("请录入车辆的号牌底色");
			return false
		}
		if ($("#license_pn").val() == "鲁A") {
			return true
		}
		if ("新车,工地车,暂未上牌,".indexOf($("#license_pn").val()) >= 0) {
			return true
		}
		if ($("#license_pn").val().length < 5) {
			alert_info("车牌号码不能小于5位。");
			return false
		}
		if (isEmpty($("#enddatejq")) || isEmpty($("#enddatesy"))) {
			return;
			checkFrameNo
		}
		if ("新车暂未上牌".indexOf($("#license_pn").val()) < 0) {
			var j = $("#interNo").val();
			var a = $("#license_pn").val();
			var g = $("#licensecolorcode").val();
			var d = $("#carkindcodename").val();
			var f = $("#startdatejq").val();
			var c = $("#startdatesy").val();
			var k = $("#enddatejq").val();
			var e = $("#enddatesy").val();
			var i = $("#iKType").val();
			var b = "/tmgsp/check/periodCheck";
			var h = "{'interNo':'" + j + "','liceseno':'" + a + "','licenseColorCode':'" + g + "','carKindCode':'" + d +
				"','startDateJQ':'" + f + "','startDateSY':'" + c + "','endDateJQ':'" + k + "','endDateSY':'" + e + "','IKType':'" +
				i + "'}";
			$.ajax({
				type: "POST",
				url: b,
				data: {
					jsonData: h
				},
				dataType: "json",
				success: function(l) {
					if (l != "") {
						var m = l;
						alert(m)
					}
				},
				error: function() {}
			})
		}
	}
}

function changeCarCheckTime() {
	curprice = parseFloat($("#PurchasePrice").val());
	var c = $("#enrolldate").val();
	var b = new Date($("#startdatesy").val());
	var e = new Date(replace(c, "-", "/"));
	var a = $("#useyears").val();
	var d = (b.getFullYear() - e.getFullYear()) * 12 + (b.getMonth() - e.getMonth());
	d = d % 12
}

function compareYear() {
	if ($("#citySelected").val() == "44010000") {
		$("#castQueryCarFlag").val("0")
	}
}

function realValuePremium() {
	var t = $("#consultactualvalue").val();
	var b = $("#xubaoguankong").val();
	var y = $("#comselected").val();
	var x = 0;
	var w = 0;
	var m = 0;
	var c = 0;
	var C = 0;
	var z = 0;
	var f = $("#carkindcodename").val();
	var q = $("#zkl").val();
	var p = $("#toncount").val();
	var e = $("#enrolldate").val();
	var r = $("#useyears").val();
	var D = $("#startdatesy").val();
	var u = $("#purchaseprice").val();
	if (e == "" || q == "" || f == "" || u == "" || D == "") {
		return ""
	}
	if (trim(f) == "A01") {
		if (q > 9) {
			w = 0.009
		} else {
			w = 0.006
		}
	} else {
		w = 0.009
	}
	var l;
	if (e == "") {
		x = 12 * Integer.parseInt(r, 10)
	} else {
		var j = e.split("-");
		if (D.indexOf("/") > -1) {
			l = D.split("/")
		} else {
			l = D.split("-")
		}
		var a = parseInt(j[0], 10);
		var n = parseInt(l[0], 10);
		var o = parseInt(j[1], 10);
		var s = parseInt(l[1], 10);
		var k = parseInt(j[2], 10);
		var B = parseInt(l[2], 10);
		var g = $("#comselected").val();
		var v = "";
		if (g.length >= 2) {
			v = g.substring(0, 2)
		}
		if ("11" == v || "44" == v || "65" == v || "54" == v || RateChg_CheckTime(y)) {
			if (B - k < 0) {
				x = (n - a) * 12 + s - o - 1
			} else {
				x = (n - a) * 12 + s - o
			}
		} else {
			x = (n - a) * 12 + s - o - 1
		}
	}
	if (x < 0) {
		x = 0
	}
	m = x * w;
	if ("4409" == y.substring(0, 4)) {
		if (m < 0) {
			m = 0
		}
	}
	if (m > 0.8) {
		m = 0.8
	}
	C = u;
	$("#dblSumDepreciationRate").val(m);
	$("#dblPerMonthRate").val(w);
	z = C * (1 - m);
	z = pointTwo(mathRound(z));
	$("#caractualvalue").val(z);
	$("#baseAmount").val(C);
	$("#consultactualvalue").val(z);
	if (b != null && b != "" && b != undefined && b == "1" && z != 0) {
		var d = $("#ItemKindAll input[id^='kindcode']");
		for (var A = 0; A < d.length; A++) {
			if (d.eq(A).is(":checked")) {
				var h = d.eq(A).val();
				if (UIDKind.A() == h || UIDKind.G() == h) {
					$("#amount" + h).val(z)
				}
			}
		}
	}
}

function showEnrollDateFormat() {
	window.status = "车辆初次登记日期格式为：年-月 例如:2003-01"
}

function getVINNoByFrameNo() {
	if ($("#framenoshowc").val().length != 0 && $("#framenoshowc").val().length != 17) {
		var a = "温馨提示：车辆的VIN码应该为17位，请重新填写车架号，重置VIN！";
		alert_info(a);
		$("#framenoshowc").focus();
		$("#framenoshowc").val("");
		if (indivProfit_VINencryption($("#areacode").val())) {
			$("#framenoshowc").focus();
			$("#framenoshowc").select()
		} else {
			$("#framenoshowc").focus();
			$("#framenoshowc").select()
		}
		return false
	}
}

function checkEngineNoSH(c) {
	var b = document.fm.EngineNo.val();
	var a = document.fm.CountryNature.val();
	if (b.length > 30) {
		alert("温馨提示，上海地市录入的发动机号位数不得超过30位。");
		c.focus();
		return false
	}
	if (!indivProfit_CancleEngineNoLimitBy21()) {
		if (a != "02" && b.length > 21) {
			alert_info("温馨提示，录入车辆是国产或者合资车，录入的发动机号位数不得超过21位。");
			c.focus();
			return false
		}
	}
}
var FIELD_SEPARATOR = "_FIELD_SEPARATOR_";
var GROUP_SEPARATOR = "_GROUP_SEPARATOR_";

function checkLength(e) {
	var g;
	var c = 0;
	var d = $(e).val();
	var b = $(e).maxLength;
	var f = $(e).description;
	if (f == null) {
		f = e.name
	}
	if (d == "") {
		return true
	}
	if (d.indexOf("^") > -1 || d.indexOf("FIELD_SEPARATOR") > -1 || d.indexOf("GROUP_SEPARATOR") > -1) {
		alert_warning("^为系统保留字符，不允许输入！");
		return false
	}
	if (isNaN(parseInt(b))) {
		return true
	}
	for (var a = 0; a < d.length; a++) {
		g = escape(val().charAt(a));
		if (g.substring(0, 2) == "%u" && g.length == 6) {
			c = c + 2
		} else {
			c = c + 1
		}
	}
	if (c > b) {
		alert_info(f + "输入的内容超长！\n" + f + "的最大长度为" + b + "个英文字符！\n请重新输入！");
		e.focus();
		e.select();
		return false
	}
	return true
}

function checkLengthenc(f, a) {
	var h;
	var d = 0;
	var e = $(f).val();
	var c = $("#field").maxLength;
	var g = $("#field").description;
	if (g == null) {
		g = f.name
	}
	if (e == "") {
		return true
	}
	if (isNaN(parseInt(c))) {
		return true
	}
	for (var b = 0; b < e.length; b++) {
		h = escape(e.charAt(b));
		if (h.substring(0, 2) == "%u" && h.length == 6) {
			d = d + 2
		} else {
			d = d + 1
		}
	}
	if (d > c) {
		alert_info(g + "输入的内容超长！\n" + g + "的最大长度为" + c + "个英文字符！\n请重新输入！");
		a.focus();
		a.select();
		return false
	}
	return true
}

function carChangInfo(b) {
	if (b == "2") {
		if (parseFloat($("#PurchasePrice").val()) <= 4000000) {
			delPlan("0")
		} else {
			delPlan("1")
		}
	} else {
		if (b == "3") {
			if (parseInt($("#UseYears").val()) > 1) {
				delPlan("1")
			}
		} else {
			if (b == "4") {
				var c = $("input[id^='kindcode']");
				var d = false;
				for (var a = 0; a < c.length; a++) {
					if (c.eq(a).is(":checked") && c.eq(a).val() != "050100") {
						d = true;
						break
					}
				}
				if (!d) {
					delPlan("1")
				}
			}
		}
	}
}

function showPremium() {
	if (null == $("#SumPremium").val() || "" == $("#SumPremium").val()) {
		return
	}
	var j = parseFloat($("#ThisPayTax"));
	var c = parseFloat($("#PrePayTax"));
	var h = parseFloat($("#DelayPayTax"));
	var g = 0;
	var e = $("#KindCode");
	var f = false;
	for (var d = 0; d < e.length; d++) {
		if (e[d].checked == true && e[d].value == "050100") {
			g = parseFloat($("#SumPayTax").val())
		}
	}
	var k;
	if ($("#YWFlag").val() == "Y") {
		if (indivProfit_single_FC($("#areacode").val(), UIFCDKind.ead(), "V2") || indivProfit_single_FC($("#areacode").val(),
				UIFCDKind.eck(), "V2")) {
			k = parseFloat($("#SumPremium").val()) + parseFloat(g)
		} else {
			k = parseFloat($("#SumPremium").val()) + parseFloat(g) + parseFloat($("#YWTotalPremium").val())
		}
		if (CheckFCarYEJ_CheckTime(carWarrantyAreaCode)) {
			if (window.parent.parent.frames.page_YEJ) {
				var a = $("#yejSumPayTax").val();
				if (a == null || a == "" || a == "0") {
					a = 0
				}
				if (indivProfit_single_FC($("#areacode").val(), UIFCDKind.ead(), "V2") || indivProfit_single_FC($("#areacode").val(),
						UIFCDKind.eck(), "V2")) {
					k += parseFloat(a);
					k = point(round(k, 2), 2)
				} else {
					k += parseFloat(a);
					k = point(round(k, 2), 2)
				}
				$("totalRationPremium2").innerHTML = yej_displayTotalRationPremium(k, parseFloat($("#SumPremium").val()),
					parseFloat(g), parseFloat($("#YWTotalPremium").val()), parseFloat(a))
			} else {
				if (indivProfit_single_FC($("#areacode").val(), UIFCDKind.ead(), "V2") || indivProfit_single_FC($("#areacode").val(),
						UIFCDKind.eck(), "V2")) {
					k = point(round(k, 2), 2)
				} else {
					k = point(round(k, 2), 2)
				}
				$("totalRationPremium2").innerHTML = displayTotalRationPremium(k, parseFloat($("#SumPremium").val()), parseFloat(g),
					parseFloat($("#YWTotalPremium").val()))
			}
		} else {
			if (indivProfit_single_FC($("#areacode").val(), UIFCDKind.ead(), "V2") || indivProfit_single_FC($("#areacode").val(),
					UIFCDKind.eck(), "V2")) {
				k = point(round(k, 2), 2)
			} else {
				k = point(round(k, 2), 2)
			}
			$("totalRationPremium2").innerHTML = displayTotalRationPremium(k, parseFloat($("#SumPremium").val()), parseFloat(g),
				parseFloat($("#YWTotalPremium").val()))
		}
		if (CheckFCarEDD_CheckTime(carWarrantyAreaCode)) {
			if (window.parent.parent.frames.page_EDD) {
				var b = $("#eddSumPayTax").val();
				if (b == null || b == "" || b == "0") {
					b = 0
				}
				if (indivProfit_single_FC($("#areacode").val(), UIFCDKind.ead(), "V2") || indivProfit_single_FC($("#areacode").val(),
						UIFCDKind.eck(), "V2")) {
					k += parseFloat(b);
					k = point(round(k, 2), 2)
				} else {
					k += parseFloat(b);
					k = point(round(k, 2), 2)
				}
				var a = 0;
				if (CheckFCarYEJ_CheckTime($("#areacode").val())) {
					if (window.parent.parent.frames.page_YEJ) {
						a = $("#yejSumPayTax").val();
						if (a == null || a == "" || a == "0") {
							a = 0
						}
					}
				}
				$("totalRationPremium2").innerHTML = edd_displayTotalRationPremium(k, parseFloat($("#SumPremium").val()),
					parseFloat(g), parseFloat($("#YWTotalPremium").val()), parseFloat(b), parseFloat(a))
			}
		}
	} else {
		k = parseFloat($("#SumPremium").val()) + parseFloat(g);
		if (CheckFCarYEJ_CheckTime(carWarrantyAreaCode)) {
			if (window.parent.parent.frames.page_YEJ) {
				var a = $("#yejSumPayTax").val();
				if (a == null || a == "" || a == "0") {
					a = 0
				}
				k += parseFloat(a);
				k = point(round(k, 2), 2);
				$("totalRationPremium2").innerHTML = yej_displayTotalRationPremium(k, parseFloat($("#SumPremium").val()),
					parseFloat(g), 0, parseFloat(a))
			} else {
				k = point(round(k, 2), 2);
				$("totalRationPremium2").innerHTML = displayTotalRationPremium(k, parseFloat($("#SumPremium").val()), parseFloat(g),
					0)
			}
		} else {
			k = point(round(k, 2), 2);
			$("totalRationPremium2").innerHTML = displayTotalRationPremium(k, parseFloat($("#SumPremium").val()), parseFloat(g),
				0)
		}
		if (CheckFCarEDD_CheckTime(carWarrantyAreaCode)) {
			if (window.parent.parent.frames.page_EDD) {
				var b = $("#eddSumPayTax").val();
				if (b == null || b == "" || b == "0") {
					b = 0
				}
				var a = 0;
				if (CheckFCarYEJ_CheckTime($("#areacode").val())) {
					if (window.parent.parent.frames.page_YEJ) {
						a = $("#yejSumPayTax").val();
						if (a == null || a == "" || a == "0") {
							a = 0
						}
					}
				}
				k += parseFloat(b);
				k = point(round(k, 2), 2);
				$("totalRationPremium2").innerHTML = edd_displayTotalRationPremium(k, parseFloat($("#SumPremium").val()),
					parseFloat(g), 0, parseFloat(b), parseFloat(a))
			}
		}
	}
}

function changeCarType() {
	changeCarInfo();
	var a = $("#carqueryselect").val();
	var h = $("#comselected").val();
	var c = new Array();
	var i = "";
	var k = $("#areacode").val();
	var g = document.getElementById("carqueryselect");
	var l = g.selectedIndex;
	var b = "";
	b = g.options[l].getAttribute("vehiclemakerid");
	if (k == "33020000") {
		c = a.split("-");
		i = c[0]
	} else {
		if (h.substring(0, 4) == "4401") {
			c = a.split("-");
			i = c[0]
		}
	}
	if ($("#carqueryselect").val() == "T" || $("#carqueryselect").val() == "J" || $("#carqueryselect").val() == "M" || $(
			"#vehileClass").val() == "特种车类") {
		alert_info("温馨提示：特种车电销不予承保！");
		$("#castQueryCarFlag").val("0");
		$("#castquerycarflag").val("0");
		$("#car_models").hide();
		return false
	}
	$("#carInfoFlag").val("0");
	if ($("#areacode").val() == "33020000") {
		if (a != "empty") {
			var j = a.substring(a.indexOf("-") + 1);
			a = a.substring(0, a.indexOf("-"));
			var d = $("#enrolldate").val().substring(0, 4);
			j = j.substring(0, 4);
			d = parseInt(d);
			j = parseInt(j);
			if (d - j < 0) {
				alert_info("宁波车险部规定：初登日期小于车款年限不允许投保！");
				return false
			}
		}
	}
	if ($("#comselected").val().substring(0, 4) == "4401") {
		if (a != "empty") {
			var j = a.substring(a.indexOf("-") + 1);
			a = a.substring(0, a.indexOf("-"));
			var d = $("#enrolldate").val().substring(0, 4);
			j = j.substring(0, 4);
			d = parseInt(d);
			j = parseInt(j);
			if (d - j < 0) {
				alert_info("广州车险部规定：初登日期小于车款年限不允许投保！");
				return false
			}
		}
	}
	if (a != "empty") {
		var j = g.options[l].getAttribute("vehicleyear");
		if ($("#enrolldate").val().length >= 4) {
			var d = $("#enrolldate").val().substring(0, 4);
			j = j.substring(0, 4);
			d = parseInt(d);
			j = parseInt(j);
			if (d - j < 0) {
				alert_error("初次登记日期与年款不符请认真核实后在出单。")
			}
		}
	}
	var f = $("clausetype").val();
	if (a == "empty") {
		alert_error("抱歉，没有查询到相关车型，可能有以下原因：\n1、您输入的关键字有误，请您核实行驶证；\n2、您输入的关键字过多，请酌情减少。");
		$("#VehicleName").val("");
		$("BrandName").val("");
		$("PurchasePrice").val("");
		$("caractualvalue").val("");
		$("zkl").val("");
		$("exhaustscale").val("");
		return false
	}
	reSetModelCodeValues();
	var m = Math.random();
	if ($("#areacode").val() == "33020000") {
		var e = $("#carqueryselect").val();
		if (e != "empty") {
			e = e.substring(e.indexOf("_") + 1);
			if (e > 0) {
				$("#purchaseprice").attr("readonly", true)
			} else {
				$("#purchaseprice").attr("readonly", false)
			}
		}
	}
}

function reSetModelCodeValues() {
	var a = $("#areacode").val();
	if (indivProfit_PlatJS_540_430(a)) {} else {
		$(".value_kong").val("");
		$("#zkl").val("");
		$("#toncount").val("");
		$("#exhaustscale").val("")
	}
	$("#modelcode").val("");
	$("#BrandName").val("");
	$("#AliasName").val("");
	$("#PurchasePrice").val("");
	$("Coefficient1").val("");
	$("#Coefficient2").val("");
	$("#Coefficient2").val("");
	$("#safeDevice").val("");
	$("#FamilyName").val("");
	$("#CarModelSchemaEncode").val("")
}

function getCarInfo() {
	var c = $("#license_pn").val();
	var b = $("#LicenseType").val();
	var e = $("#framenoshowc").val();
	var i = $("#engineno").val();
	var g = $("#cityselected").val();
	VINNo = $("#framenoshowc").val();
	var a = $("#carbrandmodelname").val();
	var d = $("#exhaustscale").val();
	var f = $("#enrolldate").val();
	if (g != "31000000") {
		$("DAACarQueryResult").hide()
	} else {
		$("DAACarQueryResultSH").hide()
	}
	if (FenGSTimeoutCheckTime()) {
		$("#getCarInfoButton").attr("disabled", true)
	}
	if (indivProfit_BJplatselectCar(g)) {
		if (e == "" || e == "") {
			alert_info("车架号和发动机号不能为空");
			return false
		}
	} else {}
	if (FenGSTimeoutCheckTime()) {
		var h = setTimeout("$('#getCarInfoButton').attr('disabled',false);", 300000)
	}
}

function checkPurchasePrice(l) {
	if (isNaN($("#purchaseprice").val())) {
		return
	}
	var o = 0;
	var c = 0;
	var g = 0;
	var i = 0;
	var f = $("#modelcode").val();
	var b = f.substring(0, 3);
	var p = "";
	if (isEmpty($("#beforeproposalno"))) {
		p = "N"
	} else {
		p = "Y"
	}
	if ($("#modelcode").val() != "PICCHK0001") {
		if (checkDecimal(l, 14, 2, "", "") == false) {
			return
		}
		if ($("#JYFLAG").val() == "1") {
			o = parseFloat($("#purchaseprice").oldValue);
			purchasePrice_hs = $("#purchasePrice_hs").val();
			c = parseFloat($("#purchaseprice").val());
			if ($("#isTvalue").val() == "1" && $("#areacode").val() == "33020000" && indivProfit_NxCheckTime()) {
				o = o / 0.9
			}
			var k = $("#enrolldate").val();
			var j = new Date($("#startdatesy").val());
			var d = new Date(replace(k, "-", "/"));
			var n = $("#useyears").val();
			var h = (j.getFullYear() - d.getFullYear()) * 12 + (j.getMonth() - d.getMonth());
			h = h % 12;
			if ($("#areacode").val().substring(0, 2) == "41") {
				if (!indivProfit_ZB02157GK("4100")) {
					if (h > 9 && n < 1 && c < o * 0.9) {
						alert_info("使用年限9个月-2年（含），数据库价格最高下浮10%。")
					} else {
						if (n >= 1 && n <= 2 && c < o * 0.9) {
							alert_info("使用年限9个月-2年（含），数据库价格最高下浮10%。")
						} else {
							if (n > 2 && n <= 5 && c < o * 0.85) {
								alert_info("使用年限2年-5年（含），数据库价格最高下浮15%。")
							} else {
								if (n > 5 && c < o * 0.8) {
									alert_info("使用年限5年以上，数据库价格最高下浮20%。")
								}
							}
						}
					}
				} else {
					if (n > 2 && n <= 5 && c < o * 0.85) {
						alert_info("使用年限2年-5年（含），数据库价格最高下浮15%。")
					} else {
						if (n > 5 && c < o * 0.8) {
							alert_info("使用年限5年以上，数据库价格最高下浮20%。")
						}
					}
				}
			}
			if (indivProfit_NEWPRICECheckTime($("#areacode").val())) {
				var a = "/piccallweb/DAA3g/tb/business/UIVEHICLEPriceQuery.jsp";
				var e = "vehicleID=" + $("#ModelCode").val() + "&license_pn=" + $("#license_pn").val() + "&LicenseType=" + $(
						"#LicenseType").val() + "&SeatCount=" + $("#zkl").val() + "&comcode=" + $("#comSelected").val() + "&UseYears=" +
					$("#UseYears").val() + "&CarKindCode=" + $("#CarKindCode").val() + "&oldprice=" + o + "&IsRenewal=" + p +
					"&enrollDate=" + $("#EnrollDate").val() + "&startDate=" + $("#StartDateSY").val() + "&framenoshowc=" + $(
						"#framenoshowc").val();
				var m = function() {
					var q = this.req.responseText.split(",")[0];
					var r = this.req.responseText.split(",")[1];
					var s = this.req.responseText.split(",")[2];
					i = parseFloat(round(o * q, 2));
					g = parseFloat(round(o * r, 2));
					if ($("#comSelected").va().substring(0, 4) == "3204") {
						i = i - Math.floor(i % 1000)
					}
					if ($("#areacode").val() == "31000000") {
						$("#Minprice").val(i)
					}
					if ($("#CarKindCode").va() == "B01" || $("#CarKindCode").va() == "B91" || $("#CarKindCode").va().substring(0, 1) ==
						"C") {
						g = parseFloat(round(o * 6, 2))
					}
					if ((c <= g && c >= i) || o == 0) {
						if (indivProfit_HAINAN_CheckTime() && $("#areacode").val() == "46000000") {
							if (c < o) {
								alert("温馨提示信息：低保将导致低赔，为了您得到更全面的保障，不建议您降低车身价投保。")
							}
						}
					} else {
						if (!($("#areacode").val() == "13000000" && s != undefined && trim(s) != "0")) {}
					}
				}
			} else {
				if (checkSinosoftPlatBIFormVehicle($("#areacode").val())) {
					if ($("#areacode").val() == "32000000") {
						i = parseFloat(round(o * 0.9, 2));
						g = parseFloat(round(o * 1.15, 2))
					} else {
						i = parseFloat(round(o * 0.9, 2));
						g = parseFloat(round(o * 1.1, 2))
					}
				} else {
					if ($("#areacode").val() == "11000000") {
						i = parseFloat(round(o, 2));
						g = parseFloat(round(o * 2, 2))
					} else {
						if ($("#areacode").val() == "12000000") {
							i = parseFloat(round(o * 0.8, 2));
							g = parseFloat(round(o * 1.2, 2))
						} else {
							if ($("#areacode").val() == "21000000") {
								if ($("#comSelected").va().substring(0, 4) == "2103") {
									i = parseFloat(round(o * 0.8, 2));
									g = parseFloat(round(o * 1.1, 2))
								} else {
									if ($("#comSelected").va().substring(0, 4) == "2101") {
										i = parseFloat(round(o * 0.8, 2));
										g = parseFloat(round(o * 1.2, 2))
									} else {
										i = parseFloat(round(o * 0.8, 2));
										g = parseFloat(round(o * 1.1, 2))
									}
								}
							} else {
								if ($("#areacode").val() == "22000000") {
									if ($("#comSelected").va().substring(0, 4) == "2201") {
										if (parseInt($("#useyears").va()) < 1) {
											i = parseFloat(round(o * 0.9, 2))
										} else {
											i = parseFloat(round(o * 0.8, 2))
										}
									} else {
										if (parseInt($("#useyears").va()) < 1) {
											i = parseFloat(round(o * 0.95, 2))
										} else {
											i = parseFloat(round(o * 0.8, 2))
										}
									}
									g = parseFloat(round(o * 1.5, 2))
								} else {
									if ($("#areacode").val() == "31000000") {
										if ($("#useyears").va() < 1 && $("#CarKindCode").va() == "A01") {
											i = parseFloat(round(o * 0.85, 2))
										} else {
											i = parseFloat(round(o * 0.9, 2))
										}
										g = parseFloat(round(o * 1.5, 2))
									} else {
										if ($("#areacode").val() == "33020000") {
											if (indivProfit_NxCheckTime()) {
												if ($("#isTvalue").val() == "1") {
													i = parseFloat(round(o * 0.85, 2));
													g = parseFloat(round(o * 1.1, 2))
												} else {
													i = parseFloat(round(o * 0.9, 2));
													g = parseFloat(round(o * 1.1, 2))
												}
											} else {
												i = parseFloat(round(o * 0.9, 2));
												g = parseFloat(round(o * 1.1, 2))
											}
											if ($("#besttime").val() == "3") {
												i = parseFloat(round(o * 1, 2));
												g = parseFloat(round(o * 1, 2))
											}
										} else {
											if ($("#areacode").val() == "33000000") {
												if ($("#comSelected").va().substring(0, 4) == "3305") {
													i = parseFloat(round(o * 0.9, 2));
													g = parseFloat(round(o * 1.1, 2))
												} else {
													i = parseFloat(round(o * 0.7, 2));
													g = parseFloat(round(o * 1.5, 2))
												}
											} else {
												if ($("#areacode").val() == "34000000") {
													i = parseFloat(round(o * 0.85, 2));
													g = parseFloat(round(o * 1.1, 2))
												} else {
													if ($("#areacode").val() == "35020000") {
														i = parseFloat(round(o * 0.9, 2));
														g = parseFloat(round(o * 1.5, 2))
													} else {
														if ($("#areacode").val() == "36000000") {
															if ($("#comSelected").va().substring(0, 4) == "3624") {
																i = parseFloat(round(o * 0.85, 2));
																g = parseFloat(round(o * 1.5, 2))
															} else {
																i = parseFloat(round(o * 0.7, 2));
																g = parseFloat(round(o * 1.5, 2))
															}
															if (
																"LHA,LHB,AEA,AKA,ASA,AKB,ASB,BNA,BSA,BLC,BLF,FLA,FYB,GGA,HMA,JMA,JBA,LBA,LSA,LNA,LKB,LFC,MSA,MBA,MGA,PDA,SBA,SXI,SPE,TXE,KSB"
																.indexOf(b) > -1) {
																i = parseFloat(round(o * 0.95, 2));
																g = parseFloat(round(o * 1.5, 2))
															}
														} else {
															if ($("#areacode").val() == "37000000") {
																i = parseFloat(round(o * 0.9, 2));
																g = parseFloat(round(o * 1.1, 2))
															} else {
																if ($("#areacode").val() == "37020000") {
																	i = parseFloat(round(o * 1, 2));
																	g = parseFloat(round(o * 1.5, 2))
																} else {
																	if ($("#areacode").val() == "43000000") {
																		if (o < 1000000) {
																			i = parseFloat(round(o * 0.85, 2))
																		} else {
																			if (o >= 1000000 && o < 1800000) {
																				i = parseFloat(round(o * 0.9, 2))
																			} else {
																				i = parseFloat(round(o * 1, 2))
																			}
																		}
																		g = parseFloat(round(o * 1.05, 2))
																	} else {
																		if ($("#areacode").val() == "44000000") {
																			if ($("#comSelected").va().substring(0, 4) == "4404") {
																				if (parseInt($("#UseYears").va()) < 1) {
																					i = parseFloat(round(o * 0.85, 2));
																					g = parseFloat(round(o * 1.2, 2))
																				} else {
																					if (parseInt($("#UseYears").va()) >= 1 && parseInt($("#UseYears").va()) < 5) {
																						i = parseFloat(round(o * 0.9, 2));
																						g = parseFloat(round(o * 1, 2))
																					} else {
																						if (parseInt($("#UseYears").va()) >= 5 && parseInt($("#UseYears").va()) < 10) {
																							i = parseFloat(round(o * 0.85, 2));
																							g = parseFloat(round(o * 1, 2))
																						} else {
																							if (parseInt($("#UseYears").va()) >= 10) {
																								i = parseFloat(round(o * 0.8, 2));
																								g = parseFloat(round(o * 1, 2))
																							} else {
																								i = parseFloat(round(o * 0.9, 2));
																								g = parseFloat(round(o * 1, 2))
																							}
																						}
																					}
																				}
																			} else {
																				i = parseFloat(round(o * 0.7, 2));
																				g = parseFloat(round(o * 1.5, 2))
																			}
																		} else {
																			if ($("#areacode").val() == "45000000") {
																				i = parseFloat(round(o * 0.9, 2));
																				g = parseFloat(round(o * 1.1, 2))
																			} else {
																				if ($("#areacode").val() == "46000000") {
																					i = parseFloat(round(o * 0.8, 2));
																					g = parseFloat(round(o * 1.1, 2))
																				} else {
																					if ($("#areacode").val() == "50000000") {
																						i = parseFloat(round(o * 0.9, 2));
																						g = parseFloat(round(o * 1.1, 2))
																					} else {
																						if ($("#areacode").val() == "52000000") {
																							i = parseFloat(round(o * 0.9, 2));
																							g = parseFloat(round(o * 1.5, 2))
																						} else {
																							if ($("#areacode").val() == "53000000") {
																								i = parseFloat(round(o * 0.7, 2));
																								g = parseFloat(round(o * 1.15, 2))
																							} else {
																								if ($("#areacode").val() == "62000000") {
																									i = parseFloat(round(o * 0.95, 2));
																									g = parseFloat(round(o * 1.5, 2))
																								} else {
																									if ($("#areacode").val() == "63000000") {
																										i = parseFloat(round(o * 0.9, 2));
																										g = parseFloat(round(o * 1.1, 2))
																									} else {
																										if ($("#areacode").val() == "64000000") {
																											i = parseFloat(round(o * 1, 2));
																											g = parseFloat(round(o * 1.2, 2))
																										} else {
																											if ($("#areacode").val() == "65000000") {
																												if ($("#comSelected").va() == "65212500") {
																													i = parseFloat(round(o * 0.7, 2));
																													g = parseFloat(round(o * 1.3, 2))
																												} else {
																													if ($("#comSelected").va().substring(0, 4) == "6542") {
																														i = parseFloat(round(o * 0.85, 2));
																														g = parseFloat(round(o * 1.15, 2))
																													} else {
																														if ($("#comSelected").va().substring(0, 4) == "6541" && indivProfit_xjBaZhouCheckTime()) {
																															i = parseFloat(round(o * 0.7, 2));
																															g = parseFloat(round(o * 1.3, 2))
																														} else {
																															if ($("#comSelected").va().substring(0, 4) == "6528") {
																																i = parseFloat(round(o * 0.75, 2));
																																g = parseFloat(round(o * 1.25, 2))
																															} else {
																																if ($("#comSelected").va().substring(0, 4) == "6502") {
																																	i = parseFloat(round(o * 0.8, 2));
																																	g = parseFloat(round(o * 1.2, 2))
																																} else {
																																	if ($("#comSelected").va().substring(0, 4) == "6501") {
																																		i = parseFloat(round(o * 0.8, 2));
																																		g = parseFloat(round(o * 1.2, 2))
																																	} else {
																																		i = parseFloat(round(o * 0.85, 2));
																																		g = parseFloat(round(o * 1.5, 2))
																																	}
																																}
																															}
																														}
																													}
																												}
																											} else {
																												i = parseFloat(round(o * 0.7, 2));
																												g = parseFloat(round(o * 1.5, 2))
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
				if ($("#CarKindCode").va() == "B01" || $("#CarKindCode").va() == "B91" || $("#CarKindCode").va().substring(0, 1) ==
					"C") {
					g = parseFloat(round(o * 6, 2));
					if ((c <= g && c >= i) || o == 0) {} else {}
				}
			}
		}
	}
}

function checkErrorenc(c, b) {
	var a = checkIllegalCharacter(c);
	if (a == false) {
		b.focus();
		return false
	}
}

function checkIllegalCharacter(c) {
	var e = c.value;
	var a = c.type;
	var f = /\^|<|>|@|\$|'|\\\\|&|\|/;
	var d = /\^/;
	var b = /@{1}/;
	if (a == "text" || a == "textarea" || a == "password") {
		if (f.test(e)) {
			if (d.test(e) && c.name == "BranchCode") {} else {
				if (b && (c.name == "AppliEmail" || c.name == "InsuredEmail")) {} else {
					alert_info(" 您输入了非法字符，请修改:" + e);
					return false
				}
			}
		}
	}
	return true
}

function carInfoPerfect() {
	var a = $("#framenoshowc").val();
	if (a.length < 17) {
		$("#framenoshowc").val("");
		alert_info("温馨提示：请先录入完整的车架号，再进行车型解析。")
	} else {
		vehicleParse()
	}
}

function checkLicenseNoForShanghai(c) {
	if ($("#areacode").val() == "31000000") {
		var a = c.value;
		var b = /^军|^空|^海|^北|^沈|^兰|^济|^南|^广|^成|^京V|^WJ|^外|^警/;
		if (b.test(a)) {
			alert_info("温馨提示：上海地区不承保军牌、武警牌车辆");
			c.focus();
			c.select();
			return false
		}
		return true
	}
}

function communityShop(a) {
	if ($("#ruralworkersstatusn").prop("checked")) {
		$("#ruralworkersdx").val("");
		$("#ruralshopsdx").val("");
		$("#ruralworkersdx").attr("disabled", true);
		$("#ruralshopsdx").attr("disabled", true)
	} else {
		$("#ruralworkersdx").attr("disabled", false);
		$("#ruralshopsdx").attr("disabled", false)
	}
}

function vehicleParse() {
	$("#car_models").show();
	var f = $("#framenoshowc").val();
	f = f.substring(0, 8);
	var d = $("#cityselected").val();
	var e = $("#comselected").val();
	var c = $("#zkl").val();
	var a = $("#toncount").val();
	var g = $("#useyears").val();
	var b = "{'vinNo':'" + f + "','areaCode':'" + d + "','comCode':'" + e + "','seatcount':'" + c + "','toncount':'" + a +
		"','useyears':'" + g + "'}";
	$.ajax({
		type: "post",
		dataType: "JSON",
		async: false,
		url: "vehicle/parse",
		data: {
			jsonData: b
		},
		success: function(i) {
			var j = JSON.parse(i);
			if (showExMessageCheck(j)) {
				return false
			}
			var h = "<option selected value=''>请选择</option>";
			$.each(j, function(k, l) {
				h += "<option factoryId='" + l.factoryid + "' vehicleyear='" + l.vehicleyear + "' searchcode='" + l.searchcode +
					"' vehiclemakerid='" + l.vehiclemakerid + "' value = '" + l.codecode + "'>" + l.codecname + "</option>"
			});
			$("#carqueryselect").html(h)
		}
	})
}

function searchCar(a) {
	var h = $("#carqueryselect option:selected").attr("value");
	var b = $("#carqueryselect option:selected").attr("vehiclemakerid");
	var e = $("#clausetype").val();
	var d = $("#cityselected").val();
	var f = $("#comselected").val();
	var g = $("#useyears").val();
	if (d == "33020000") {
		h = h.substring(0, h.indexOf("-"))
	}
	var c = "{'codecode':'" + h + "','clauseCode':'" + e + "','areacode':'" + d + "','comcode':'" + f + "','useyears':'" +
		g + "','flag':'" + a + "','vehiclemakerid':'" + b + "'}";
	$.ajax({
		type: "post",
		dataType: "JSON",
		async: false,
		url: "models/accur/qry",
		data: {
			json: c
		},
		success: function(m) {
			var k = JSON.parse(m);
			var i = k.ex_status;
			if (null != i) {
				showExMessage(k);
				$("#select2-carqueryselect-container").text("");
				return false
			}
			if (k.vehicle_class_picc == "T" || k.vehicle_class_picc == "J" || k.vehicle_class_picc == "M" || k.vehileClass ==
				"特种车类") {
				alert_info("温馨提示：特种车电销不予承保！");
				$("#castQueryCarFlag").val("0");
				$("#castquerycarflag").val("0");
				$("#car_models").hide();
				return false
			}
			$("#carbrandmodelname").val(k.vehicle_name);
			$("#carbrandmodelname").attr("vehicleid", k.vehicle_id);
			$("#carbrandmodelname").attr("vehiclename", k.vehicle_name);
			$("#purchaseprice").val(k.purchaseprice);
			$("#oripurchaseprice").val(k.purchaseprice);
			$("#carqueryselect option[value='" + k.vehicle_class_picc + "']").attr("selected", true);
			var l = $("#zkl").val();
			if (l == "" || l.length == 0) {
				$("#zkl").val(k.seatcount)
			}
			$("#exhaustscale").val(k.exhaustscale);
			$("#vehicle_name").val(k.vehicle_name);
			$("#modelcode").val(k.vehicle_id);
			$("#toncount").val(k.toncount);
			$("#carloteququality").val(k.vehicle_quality);
			$("#consultactualvalue").val(k.purchaseprice);
			$("#coefficient1").val(k.coefficient0);
			$("#coefficient2").val(k.coefficient1);
			$("#brandName").val(k.brandName);
			$("#carModelaliasName").val(k.carModelaliasName);
			$("#carModelfamilyName").val(k.carModelfamilyName);
			$("#searchCodeNew").val(k.searchCodeNew);
			$("#vehileClass").val(k.vehileClass);
			$("#carModelvehicleType").val(k.carModelvehicleType);
			$("#brandId").val(k.brandId);
			$("#familyId").val(k.familyId);
			$("#vehicleMaker").val(k.vehicleMaker);
			$("#vehicleWeight").val(k.vehicleWeight);
			$("#engineType").val(k.engineType);
			$("#enginePower").val(k.enginePower);
			$("#transmissionType").val(k.transmissionType);
			$("#fAbs").val(k.fAbs);
			$("#fAlarm").val(k.fAlarm);
			$("#nAirBag").val(k.nAirBag);
			$("#equipStandard").val(k.equipStandard);
			$("#equipOptional").val(k.equipOptional);
			$("#vehicleSize").val(k.vehicleSize);
			$("#wheelBase").val(k.wheelBase);
			$("#trackFront").val(k.trackFront);
			$("#trackRear").val(k.trackRear);
			$("#dirRisk").val(k.dirRisk);
			$("#vehicleYearNew").val(k.vehicleYearNew);
			$("#carModelremark").val(k.carModelremark);
			$("#groupId").val(k.groupId);
			$("#vehiclemakeridNew").val(k.vehicle_makerid);
			$("#countrynature").val(k.countryNature);
			$("#coefficient3").val(k.strcoefficient);
			$("#safeDevice").val(k.safeDevice);
			$("#jyAliasName").val(k.aliasname);
			$("#vehicleClassPicc").val(k.vehicle_class_picc);
			$("#groupname").val(k.groupname);
			$("#familyNameNew").val(k.familyNameNew);
			$("#brandIdNew").val(k.brandIdNew);
			$("#brandNameNew").val(k.brandNameNew);
			$("#familyIdNew").val(k.familyIdNew);
			$("#vehicleType").val(k.vehicle_type);
			$("#brandName").val(k.brandname);
			if (OptimizationVehicleMakerID("00000000")) {
				$("#factoryid").val(k.factoryid)
			}
			if (AddEnergyTypeIsEnergyCar(f)) {
				$("#addbooleanEnergyType").removeClass("uicar_1");
				$("#powerTypeCode").val(k.powerTypeCode);
				checkPowerTypeCode($("#powerTypeCode").val())
			}
			realValuePremium();
			changeQuantity($("#zkl"));
			$("#castquerycarflag").val("1");
			yelbaseInfo();
			if ($("#MotoFlag").val() == "N") {
				setModelCodeValues(this.req.responseText);
				var j = $("#cityselected").val();
				if (("11000000" == j)) {
					getCarInfo()
				}
			} else {}
			if ($("#areacode").val() == "31000000") {
				$("#VEHICLE_MODELSH").val($("#CarBrandModelName").val());
				$("#QueryCarBtn").click();
				return false
			}
			if ($("#searchCarFlag").val() != "1") {
				if ($("#clausetype").val() == "F41" || $("#clausetype").val() == "F42") {
					var n = $("#toncount").val();
					if (n != 0) {
						alert_error("当前车辆的载质量不为0,请确认是否正确。")
					}
				}
			}
			$("#searchCarFlag").val("0");
			realValuePremium();
			changeQuantity($("#zkl"))
		}
	})
}

function checkFrameNo(e) {
	var a = e;
	if (indivProfit_VINencryption($("#areacode").val())) {
		a = $("#FrameNoShowc");
		checkLengthenc(e, a)
	} else {
		checkLength(e)
	}
	if ($(e).val().length && addgdVINcheck($("#areacode").val())) {
		var b = $("#useyears").val();
		if (b <= 10) {
			var g = $(e).val();
			var d = /^[\da-z]+$/i;
			flag = d.test(g);
			if (!flag) {
				alert_info("只能输入数字、字母！");
				a.focus();
				a.select();
				return false
			}
		}
	}
	if ($(e).val().length && $("#areacode").val() != "31000000") {
		var g = $(e).val();
		var d = /^[0-9A-Za-z\/\.\-]+$/;
		flag = d.test(g);
		if (!flag) {
			alert_info("只能输入数字、字母和-！");
			a.focus();
			a.select();
			return false
		}
	}
	if ($(e).val().length && $("#areacode").val() == "31000000") {
		var g = $(e).val();
		var d = /^[0-9A-Za-z\/\.\-\*\+]+$/;
		flag = d.test(g);
		if (!flag) {
			alert_info("只能输入数字、字母和-！* +");
			a.focus();
			a.select();
			return false
		}
	}
	if ($("#areacode").val() == "53000000") {
		if ($(e).val().length != 0 && $(e).val().length > 18) {
			alert_info("温馨提示：云南地区 车辆的车架号不能大于18位，请您参照车辆行驶证填写。");
			a.focus();
			a.select();
			return false
		}
	} else {
		if ($(e).val().length != 0 && $(e).val().length > 17 && $("#areacode").val() != "31000000") {
			alert_info("温馨提示：车辆的车架号不能大于17位，请您参照车辆行驶证填写。");
			a.focus();
			a.select();
			return false
		}
	}
	if ($("#areacode").val() == "50000000" && ($("#enrolldate").val() == null || $("#enrolldate").val() == "")) {
		alert_info("温馨提示:请先输入初登日期,再输入车架号");
		if (indivProfit_VINencryption($("#areacode").val())) {
			$("#FrameNoShowc").val("")
		}
		$("#FrameNoShowc").val("")
	} else {
		if ($("#areacode").val() == "50000000" && $(e).val().length < 17 && (($("#enrolldate").val().substring(0, 4) == 2005 &&
				$("#enrolldate").val().substring(5, 7) >= 1) || ($("#enrolldate").val().substring(0, 4) > 2005 && $("#enrolldate")
				.val().substring(5, 7) >= 1))) {
			alert_info("温馨提示：重庆地区初次登记日期为2005年1月以后的车辆必须录齐17位车架号");
			a.focus();
			a.select();
			return false
		}
	}
	var f = "1";
	if (checkProfit_JQ2_10SY1_1_VIN($("#areacode").val())) {
		var c = $("#FrameNo").val();
		if (c != null && c != "" && trim(c).length > 0 && trim(c).length < 17) {
			alert("温馨提示：新车和初登日期03年1月1日以后车辆，车架号不为17位,但是在后续的投保确认中须提交电子联系单!");
			f = "0"
		}
	}
	if (indivProfit_TraControlJS($("#areacode").val())) {
		if (e.value == "") {
			alert_info("请录入车架号！");
			return false
		}
	}
	return true
}

function checkTimes() {
	var h = $("#simulation").val();
	var d = $("#renewaltype").val();
	if (h != "true" && $("#haveRenewalInfo").val() != "1") {
		$("#license_pn").attr("readonly", true);
		var e = $("#enrolldate").val();
		var g = new Date($("#startdatesy").val());
		var c = new Date(replace(e, "-", "/"));
		var f = (((g.getFullYear() - c.getFullYear()) * 12 + g.getMonth()) - c.getMonth());
		var b = c.getDate();
		var a = g.getDate();
		if (f == 9) {
			if ((a - b) > 0) {
				f = f + 1
			}
			if ((a - b) < 0) {
				f = f - 1
			}
		}
		if (f <= 9) {
			$("#license_pn").removeAttr("readonly")
		}
		if (f > 9) {
			$("#license_pn").val(parent.PprDGetPara("PLATENO"));
			$("#license_pn").attr("readonly", true)
		}
	}
}

function checkCarOtherInfor() {
	var c = new Array();
	var d = 0;
	c[d++] = $("#enginenoshowc");
	c[d++] = $("#framenoshowc");
	var a = c.length;
	for (var b = 0; b < a; b++) {
		if (c[b][0].value == null || trim(c[b][0].value) == "") {
			if (c[b][0].value != $("#framenoshowc").val()) {
				alert_info("温馨提示：车架号/VIN码不能为空。");
				return false
			}
		}
	}
}

function checkCarDevice() {
	var c = 0;
	var b = 0;
	if ($("#NewDeviceFlag").val() == "0") {
		return true
	}
	for (b = 0; b < $(".CarDeviceDeviceName").length; b++) {
		if ($(".CarDeviceDeviceName").eq(b - 1).val() == "") {
			alert_info("温馨提示：新增设备名称不应该为空。");
			$(".CarDeviceDeviceName").eq(b - 1).select();
			return false
		}
		if ($(".CarDeviceQuantity").eq(b - 1).val() == "" || parseFloat($(".CarDeviceQuantity").eq(b - 1).val()) == 0) {
			alert_info("温馨提示：新增设备数量不应该为空。");
			$(".CarDeviceQuantity").eq(b - 1).select();
			return false
		}
		if (trim($(".CarDevicePurchasePrice").eq(b - 1).val()) == "" || parseFloat($(".CarDevicePurchasePrice").eq(b - 1).val()) ==
			0) {
			alert_info("温馨提示：请输入新增设备购置价。");
			$(".CarDevicePurchasePrice").select();
			return false
		}
		var a = $("#update_flag_Device").val();
		if (a == "1") {
			for (b = 2; b <= $(".CarDeviceDeviceName").length; b++) {
				if ($(".NewDevice_date").eq(1) == "" || $(".NewDevice_date").eq(1).val() == "") {
					if ($(".NewDevice_date").eq(1).val() != "") {
						alert_info("温馨提示：新增设备购置日期不允许出现部分为空的现象。");
						return false
					}
				} else {
					if ($(".NewDevice_date").eq(1).val() == "") {
						if (isEmpty($(".NewDevice_date")) || $(".NewDevice_date").eq(1).val() == "") {
							alert_info("温馨提示：新增设备购置日期不允许出现部分为空的现象。");
							return false
						}
					}
				}
			}
		} else {
			for (b = 1; b <= $(".CarDeviceDeviceName").length; b++) {
				if (isEmpty($(".NewDevice_date")) || $(".NewDevice_date").eq(b).val() == "") {
					alert_info("温馨提示：新增设备购置日期不能为空。");
					return false
				}
			}
		}
	}
	if ($(".CarDeviceDeviceName").length > 0) {
		for (c = 0; c <= $(".CarDeviceDeviceName").length; c++) {
			for (b = c + 1; b <= $(".CarDeviceDeviceName").length; b++) {
				if ($(".CarDeviceDeviceName").eq(c).val() == $(".CarDeviceDeviceName").eq(b).val()) {
					alert_info("温馨提示：第" + (c + 1) + "条新增设备与第" + (b + 1) + "条新增设备重复,请修改。");
					return false
				}
			}
		}
	}
	return true
}

function checkVehicleYear() {
	if ($("#carqueryselect")) {
		var c = $("#carqueryselect").val();
		var e = document.getElementById("carqueryselect");
		var b = $("option:selected", "#carqueryselect").index();
		if (c != "empty" && e.length > 1 && c != "" && b > -1) {
			var d = e.options[b].getAttribute("vehicleyear");
			if ($("#enrolldate").val().length >= 4) {
				var a = $("#enrolldate").val().substring(0, 4);
				d = d.substring(0, 4);
				a = parseInt(a);
				d = parseInt(d);
				if (a - d < 0) {
					alert_error("初次登记日期与年款不符请认真核实后在出单。")
				}
			}
		}
	}
}

function checkHourImmNull(c) {
	var e = $("#starthourjq").val();
	var b = $("#endhourjq").val();
	var d = $("#starthoursy").val();
	var a = $("#endhoursy").val();
	if (e == null || e == "" || d == null || d == "") {
		alert_info("起保小时不能为空，默认值为0时！");
		if (c.id == "starthourjq") {
			$("#starthourjq").val("0")
		}
		if (c.id == "endhourjq") {
			$("#endhourjq").val("24")
		}
		if (c.id == "starthoursy") {
			$("#starthoursy").val("0")
		}
		if (c.id == "endhoursy") {
			$("#endhoursy").val()
		}
	}
	if (b == null || b == "" || a == null || a == "") {
		alert_info("终保小时不能为空，默认值为24时！");
		if (c.id == "starthourjq") {
			$("#starthourjq").val("0")
		}
		if (c.id == "endhourjq") {
			$("#endhourjq").val("24")
		}
		if (c.id == "starthoursy") {
			$("#starthoursy").val("0")
		}
		if (c.id == "endhoursy") {
			$("#endhoursy").val("24")
		}
	}
}

function checkStartHourImmediate(d) {
	var f = $("#starthourjq").val();
	var c = $("#endhourjq").val();
	var e = $("#starthoursy").val();
	var b = $("#endhoursy").val();
	var a = $("#comselected").val();
	if (d.id == "starthourjq") {
		if (f == "0" && c != "24") {
			alert_info("起保小时为0时，终保小时应为24时！");
			$("#endhourjq").val("24");
			if (d.id == "endhourjq") {
				$("#enddatejq").val(getNextDateFullDate(getNextYearFullDate($("#startdatejq").val(), 1), -1))
			}
			if (d.id == "endhoursy") {
				$("#enddatesy").val(getNextDateFullDate(getNextYearFullDate($("#startdatesy").val(), 1), -1))
			}
		}
	}
	if (d.id == "starthoursy" && b != "24") {
		if (e == "0") {
			alert_info("起保小时为0时，终保小时应为24时！");
			$("#endhoursy").val("24");
			if (d.id == "endhourjq") {
				$("#endhourjq").val(getNextDateFullDate(getNextYearFullDate($("#startdatejq").val(), 1), -1))
			}
			if (d.id == "endhoursy") {
				$("#enddatesy").val(getNextDateFullDate(getNextYearFullDate($("#startdatesy").val(), 1), -1))
			}
		}
	}
	if (f != "0" && f != "24") {
		if (f != c) {
			alert_info("交强起保小时与终保小时应保持一致！")
		}
		if (d.id == "starthourjq") {
			$("#endhourjq").val(f);
			if (d.id == "endhourjq") {
				$("#enddatejq").val(getNextDateFullDate(getNextYearFullDate($("#startdatejq").val(), 1), 0))
			}
		}
	}
	if (e != "0" && e != "24") {
		if (RateChg_CheckTime(a)) {} else {
			if (e != b) {
				alert_info("商业起保小时与终保小时应保持一致！")
			}
			if (d.id == "starthoursy") {
				$("#endhoursy").val(e);
				if (d.id == "endhoursy") {
					$("#enddatesy").val(getNextDateFullDate(getNextYearFullDate($("#startdatesy").val(), 1), 0))
				}
			}
		}
	}
	if (f == "24" || e == "24") {
		alert_info("起保小时须小24时！");
		if (d.id == "starthourjq") {
			$("#starthourjq").val("0")
		}
		if (d.id == "endhourjq") {
			$("#endhourjq").val("24")
		}
		if (d.id == "starthoursy") {
			$("#starthoursy").val("0")
		}
		if (d.id == "endhoursy") {
			$("#endhoursy").val("24")
		}
	}
}

function checkDateImmediate(d) {
	var f = $("#starthourjq").val();
	var c = $("#endhourjq").val();
	var e = $("#starthoursy").val();
	var b = $("#endhoursy").val();
	var a = $("#comselected").val();
	if (f == "0" && c == "24") {
		if (d.id == "starthourjq") {
			$("#enddatejq").val(getNextYearFullDate($("#startdatejq").val(), 1))
		}
	}
	if (e == "0" && b == "24") {
		if (d.id == "starthoursy") {
			$("#enddatesy").val(getNextYearFullDate($("#startdatesy").val(), 1))
		}
	}
	if (f == c || e == b) {
		if (d.id == "starthourjq") {
			$("#enddatejq").val(getNextDateFullDate(getNextYearFullDate($("#startdatejq").val(), 1), 0))
		}
		if (d.id == "starthoursy") {
			$("#enddatesy").val(getNextDateFullDate(getNextYearFullDate($("#startdatesy").val(), 1), 0))
		}
	}
	if (RateChg_CheckTime(a)) {
		if ((e == "0" && b == "24")) {
			if (d.id == "starthoursy") {
				$("#enddatesy").val(getNextDateFullDate(getNextYearFullDate($("#startdatesy").val(), 1), -1))
			}
		}
		if ((f == "0" && c == "24")) {
			if (d.id == "starthourjq") {
				$("#enddatejq").val(getNextDateFullDate(getNextYearFullDate($("#startdatejq").val(), 1), -1))
			}
		}
		if (e != "0") {
			if (d.id == "starthoursy") {
				$("#enddatesy").val(getNextDateFullDate(getNextYearFullDate($("#startdatesy").val(), 1), 0))
			}
		}
	}
}

function checkEndHourImmediate(c) {
	var e = $("#starthourjq").val();
	var b = $("#endhourjq").val();
	var d = $("#starthoursy").val();
	var a = $("#endhoursy").val();
	if (c.id == "endhourjq") {
		if (b == "24" && e != "0") {
			alert_info("终保小时为24时，起保小时应为0时！");
			$("#starthourjq").val("0");
			if (c.id == "endhourjq") {
				$("#enddatejq").val(getNextDateFullDate(getNextYearFullDate($("#startdatejq").val(), 1), -1))
			}
			if (c.id == "endhoursy") {
				$("#enddatesy").val(getNextDateFullDate(getNextYearFullDate($("#tartdatesy").val(), 1), -1))
			}
		}
	}
	if (c.id == "endhoursy") {
		if (a == "24" && d != "0") {
			alert_info("终保小时为24时，起保小时应为0时！");
			$("#starthoursy").val("0");
			if (c.id == "endhourjq") {
				$("#endhourjq").val(getNextDateFullDate(getNextYearFullDate($("#startdatejq").val(), 1), -1))
			}
			if (c.id == "endhoursy") {
				$("#enddatesy").val(getNextDateFullDate(getNextYearFullDate($("3startdatesy").val(), 1), -1))
			}
		}
	}
	if (b != "0" && b != "24") {
		if (e != b) {
			alert_info("交强起保小时与终保小时应保持一致！")
		}
		if (c.id == "endhourjq") {
			$("#starthourjq").val(b);
			if (c.name == "EndHourJQ") {
				$("#startdatejq").val(getNextDateFullDate(getNextYearFullDate($("#startdatejq").val(), 1), 0))
			}
		}
	}
	if (a != "0" && a != "24") {
		if (d != a) {
			alert_info("商业起保小时与终保小时应保持一致！")
		}
		if (c.id == "endhoursy") {
			$("#starthoursy").val(a);
			if (c.id == "endhoursy") {
				$("#enddatesy").val(getNextDateFullDate(getNextYearFullDate($("#startdatesy").val(), 1), 0))
			}
		}
	}
	if (b == "0" || a == "0") {
		alert_info("终保小时须大于0时！");
		if (c.id == "endhourjq") {
			$("#endhourjq").val("24")
		}
		if (c.id == "starthourjq") {
			$("#starthourjq").val("0")
		}
		if (c.id == "endhoursy") {
			$("#endhoursy").val("24")
		}
		if (c.id == "starthoursy") {
			$("#starthoursy").val("0")
		}
	}
}

function priceFloat(c, b, a) {
	var d = 1;
	if (b == "U") {
		if (c == "45000000") {
			d = 1.3
		} else {
			if (c == "37000000") {
				d = 1.3
			} else {
				if (c == "37020000") {
					d = 1.3
				} else {
					if (c == "61000000") {
						d = 1.3
					} else {
						if (c == "50000000") {
							d = 1.3
						} else {
							if (c == "23000000") {
								d = 1.1
							} else {
								if (c == "12000000") {
									d = 1.3
								} else {
									if (c == "15000000") {
										d = 1.3
									} else {
										if (c == "22000000") {
											d = 1.3
										} else {
											if (c == "34000000") {
												d = 1.3
											} else {
												if (c == "41000000") {
													d = 1.3
												} else {
													if (c == "42000000") {
														d = 1.3
													} else {
														if (c == "43000000") {
															d = 1.3
														} else {
															if (c == "44000000") {
																d = 1.3
															} else {
																if (c == "44010000") {
																	d = 1.3
																} else {
																	if (c == "51000000") {
																		d = 1.3
																	} else {
																		if (c == "63000000") {
																			d = 1.3
																		} else {
																			if (c == "64000000") {
																				d = 1.3
																			} else {
																				if (c == "65000000") {
																					d = 1.3
																				} else {
																					if (c == "62000000") {
																						d = 1.3
																					} else {
																						if (c == "46000000") {
																							d = 1.3
																						} else {
																							if (c == "52000000") {
																								d = 1.3
																							} else {
																								if (c == "53000000") {
																									d = 1.3
																								} else {
																									if (c == "13000000") {
																										d = 1.3
																									} else {
																										if (c == "14000000") {
																											d = 1.3
																										} else {
																											if (c == "33020000") {
																												d = 1.3
																											} else {
																												if (c == "35000000") {
																													d = 1.3
																												} else {
																													if (c == "35020000") {
																														d = 1.3
																													} else {
																														if (c == "36000000") {
																															d = 1.3
																														} else {
																															if (c == "21020000") {
																																d = 1.3
																															} else {
																																if (c == "33000000") {
																																	d = 1.3
																																} else {
																																	if (c == "44030000") {
																																		d = 1.3
																																	} else {
																																		if (c == "54000000") {
																																			d = 1.3
																																		} else {
																																			if (c == "21000000") {
																																				d = 1.3
																																			} else {
																																				if (c == "32000000") {
																																					d = 1.3
																																				} else {
																																					if (c == "11000000") {
																																						d = 1.3
																																					} else {
																																						if (c == "31000000") {
																																							d = 1.3
																																						} else {
																																							d = 1
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	} else {
		if (b == "L") {
			if (c == "45000000") {
				d = 0.7
			} else {
				if (c == "37000000") {
					d = 0.7
				} else {
					if (c == "37020000") {
						d = 0.7
					} else {
						if (c == "61000000") {
							d = 0.7
						} else {
							if (c == "50000000") {
								d = 0.7
							} else {
								if (c == "23000000") {
									d = 0.7
								} else {
									if (c == "12000000") {
										d = 0.7
									} else {
										if (c == "15000000") {
											d = 0.7
										} else {
											if (c == "22000000") {
												d = 0.7
											} else {
												if (c == "34000000") {
													d = 0.7
												} else {
													if (c == "41000000") {
														d = 0.7
													} else {
														if (c == "42000000") {
															d = 0.7
														} else {
															if (c == "43000000") {
																d = 0.7
															} else {
																if (c == "44000000") {
																	d = 0.7
																} else {
																	if (c == "44010000") {
																		d = 0.7
																	} else {
																		if (c == "51000000") {
																			d = 0.7
																		} else {
																			if (c == "63000000") {
																				d = 0.7
																			} else {
																				if (c == "64000000") {
																					d = 0.7
																				} else {
																					if (c == "65000000") {
																						d = 0.7
																					} else {
																						if (c == "62000000") {
																							d = 0.7
																						} else {
																							if (c == "46000000") {
																								d = 0.7
																							} else {
																								if (c == "52000000") {
																									d = 0.7
																								} else {
																									if (c == "53000000") {
																										d = 0.7
																									} else {
																										if (c == "13000000") {
																											d = 0.7
																										} else {
																											if (c == "14000000") {
																												d = 0.7
																											} else {
																												if (c == "33020000") {
																													d = 0.7
																												} else {
																													if (c == "35000000") {
																														d = 0.7
																													} else {
																														if (c == "35020000") {
																															d = 0.7
																														} else {
																															if (c == "36000000") {
																																d = 0.7
																															} else {
																																if (c == "21020000") {
																																	d = 0.7
																																} else {
																																	if (c == "33000000") {
																																		d = 0.7
																																	} else {
																																		if (c == "44030000") {
																																			d = 0.7
																																		} else {
																																			if (c == "54000000") {
																																				d = 0.7
																																			} else {
																																				if (c == "21000000") {
																																					d = 0.7
																																				} else {
																																					if (c == "32000000") {
																																						d = 0.7
																																					} else {
																																						if (c == "11000000") {
																																							d = 0.7
																																						} else {
																																							if (c == "31000000") {
																																								d = 0.7
																																							} else {
																																								d = 1
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return d
}

function changeQuantity(b) {
	var a = $(b).val();
	$("#quantity050712").val(a - 1);
	commonCalculate($("#quantity050712"));
	if ($("#quantity050712").val() < 0) {
		$("#quantity050712").val("0")
	}
	$("#slc-size050712").change()
}

function getComQX() {
	var a;
	var b;
	var c;
	if ($("#simulation").val() != "true") {
		a = parent.PprDGetPara("saletype");
		b = parent.PprDGetPara("saledept");
		c = parent.PprDGetPara("branchcode")
	} else {
		a = "";
		b = "T";
		c = ""
	}
	if ("M" == a) {
		a = "B"
	}
	if ("P" == a) {
		a = "B"
	}
	if (a == "") {
		a = "D"
	}
	if (b == "N") {
		a = ""
	}
	var d;
	if (a == "A" || a == "3" || a == "4") {
		d = "A"
	} else {
		if (a == "B" || (a == "1")) {
			d = "B"
		} else {
			if (a == "C") {
				d = "C"
			} else {
				if (a == "D") {
					d = "D"
				} else {
					if (a == "") {
						if (b == "T") {
							d = "ALL"
						} else {
							d = "WXAll"
						}
					}
				}
			}
		}
	}
	return d
}

function comcodeIniQX() {
	var a = getComQX();
	var j;
	var g = $("#comlist").val();
	$("#comQX").val(a);
	if (null != g && g != "") {
		j = JSON.parse(g);
		var f = j.areaselectedlist;
		var c = j.cityselectedlist;
		var h = j.comselectedlist;
		var d;
		var b;
		for (var e = 0; e < c.length; e++) {
			b = c[e].flag.substring(0, 1);
			d = c[e].flag.substring(4);
			if (b == "1" || b == "4" || b == "5") {
				if (a == "A" || a == "B" || a == "C" || a == "D" || a == "") {
					if (b == "4" || (d.indexOf(a) < 0 && d != "")) {
						$("#comselected1 option[value=" + c[e].newcodecode + "]").remove();
						if ($("#select2-comselected1-container").text() == c[e].codecname) {
							$("#select2-comselected1-container").text("")
						}
					}
				} else {
					if (a == "ALL") {
						if (b == "4") {
							$("#comselected1 option[value=" + c[e].newcodecode + "]").remove();
							if ($("#select2-comselected1-container").text() == c[e].codecname) {
								$("#select2-comselected1-container").text("")
							}
						}
					} else {
						if (a == "WXALL") {}
					}
				}
			} else {
				$("#comselected1 option[value=" + c[e].newcodecode + "]").remove();
				if ($("#select2-comselected1-container").text() == c[e].codecname) {
					$("#select2-comselected1-container").text("")
				}
			}
		}
		for (var e = 0; e < h.length; e++) {
			b = h[e].flag.substring(0, 1);
			d = h[e].flag.substring(4);
			if (b == "1" || b == "4" || b == "5") {
				if (a == "A" || a == "B" || a == "C" || a == "D" || a == "") {
					if (b == "4" || (d.indexOf(a) < 0 && d != "")) {
						$("#comselected option[value=" + h[e].newcodecode + "]").remove();
						if ($("#select2-comselected-container").text() == h[e].codecname) {
							$("#select2-comselected-container").text("")
						}
					}
				} else {
					if (a == "ALL") {
						if (b == "4") {
							$("#comselected option[value=" + h[e].newcodecode + "]").remove();
							if ($("#select2-comselected-container").text() == h[e].codecname) {
								$("#select2-comselected-container").text("")
							}
						}
					} else {
						if (a == "WXALL") {}
					}
				}
			} else {
				$("#comselected option[value=" + h[e].newcodecode + "]").remove();
				if ($("#select2-comselected-container").text() == h[e].codecname) {
					$("#select2-comselected-container").text("")
				}
			}
		}
	}
}

function businessAgentchannel(d, e) {
	var c = $("#cityselected").val();
	var f = $("#comselected1").val();
	$("#channel_code").val("");
	$("#channel_name").val("");
	var b = {};
	b.areaCode = c;
	b.cityCode = f;
	b.comCode = d;
	b.YXBindUserCode = e;
	b.allchannelflag = "1";
	var a = "channelbusiness/qry";
	var g = "业务来源信息";
	openDialog(g, a, function(i) {
		var j = $("#businessnaturesource").val();
		if (j == null || j == "null" || j == "") {
			alert("请先选择业务来源");
			return false
		}
		var h = j.split("-");
		$("#source").val(h[1]);
		$("#ByBusinessAgent").val(h[0]);
		$("#businessnature").val(h[0]);
		$("#ByBusinessAgent_2").val(h[2]);
		i.close()
	}, b);
	clearSumPremium()
}

function subordinateCodechannel(e, b) {
	var f = $("#cityselected").val();
	var h = $("#comselected1").val();
	var c = $("#comselected").val();
	var d = $("#source").val();
	$("#channel_name").val("");
	var i = {};
	i.areaCode = f;
	i.cityCode = h;
	i.comCode = c;
	i.YXBindUserCode = b;
	i.businessAgent = e;
	i.byBusinessAgent = d;
	i.allchannelflag = "2";
	var a = "channelbusiness/qry";
	var g = "渠道代码信息";
	openDialog(g, a, function(k) {
		var j = $("#allchannelcode").val();
		if (j == null || j == "null" || j == "") {
			alert("请先选择渠道代码");
			return false
		}
		$("#channel_code").val(j);
		k.close()
	}, i);
	clearSumPremium()
}

function subordinateNamechannel(f, b) {
	var e = $("#cityselected").val();
	var h = $("#comselected1").val();
	var c = $("#comselected").val();
	var d = $("#source").val();
	var i = {};
	i.areaCode = e;
	i.cityCode = h;
	i.comCode = c;
	i.YXBindUserCode = b;
	i.channelCode = f;
	i.byBusinessAgent = d;
	i.allchannelflag = "3";
	var a = "channelbusiness/qry";
	var g = "渠道名称信息";
	openDialog(g, a, function(j) {
		var k = $("#allchannelname").val();
		if (k == null || k == "null" || k == "") {
			alert("请先选择渠道名称");
			return false
		}
		$("#channel_name").val(k);
		j.close()
	}, i);
	clearSumPremium();
	if (allchannel_Switch(areaCode)) {
		if ($("#spanShowItemCar_d1").css("display") == "block") {
			$("#spanShowItemCar_d1").click()
		}
	}
}

function getAllchannelMessage() {
	var f = $("#YXBindUserCode").val();
	var g = $("#cityselected").val();
	var h = $("#comselected1").val();
	var e = $("#comselected").val();
	if (f != null && f != "") {
		var b = $("#channel_code").val();
		var a = $("#ByBusinessAgent").val()
	}
	var c = "/tmgsp/proposal/allchannel/getTranSource";
	var d = "{'YXBindUserCode':'" + f + "','procode':'" + g + "','citycode':'" + h + "','countrycode':'" + e + "'}";
	$.ajax({
		type: "POST",
		url: c,
		dataType: "json",
		data: {
			jsonData: d
		},
		success: function(l) {
			var k = JSON.parse(l);
			if (showExMessageCheck(k)) {
				return false
			}
			var j = k.listStr;
			var i = j.split(",");
			if (i != "") {
				if (i[0] != "" && i[0] != null) {
					var m = i[0].split("-");
					$("#source").val(m[1].replace(/(^\s*)|(\s*$)/g, ""));
					$("#ByBusinessAgent_1").val(m[0].replace(/(^\s*)|(\s*$)/g, ""));
					$("#ByBusinessAgent_2").val(m[2].replace(/(^\s*)|(\s*$)/g, ""));
					$("#ByBusinessAgent").val(m[0].replace(/(^\s*)|(\s*$)/g, ""));
					$("#businessnature").val(m[2].replace(/(^\s*)|(\s*$)/g, ""));
					changeAllchannelMonopoly()
				}
				if (i[1] != "" && i[1] != null) {
					$("#channel_code").val(i[1].replace(/(^\s*)|(\s*$)/g, ""))
				}
				if (i[2] != "" && i[2] != null) {
					$("#channel_name").val(i[2].replace(/(^\s*)|(\s*$)/g, ""))
				}
			}
			clearSumPremium()
		},
		error: function() {
			return false
		}
	})
}

function changeAllchannelMonopoly() {
	var i = "";
	var b = "";
	var h = "";
	var f = "";
	var j = "";
	var d = $("#YXBindUserCode").val();
	var c = $("#comselected").val();
	var g = $("#comselected1").val();
	var e = $("#cityselected").val();
	if (g == "33020000" || g == "35020000" || g == "21020000" || g == "37020000" || g == "44030000") {
		c = g
	} else {
		c = c.substring(0, 2) + "000000"
	}
	if (allchannel_Switch(e)) {
		var a = "/tmgsp/proposal/channel/monopoly";
		var k = "{'YXBindUserCode':'" + YXBindUserCode + "','comcode':'" + c + "'}";
		$.ajax({
			type: "POST",
			url: a,
			data: {
				jsonData: k
			},
			dataType: "json",
			success: function(n) {
				var l = $("#ByBusinessAgent_2").val();
				if (l == "3H1") {
					var m = JSON.parse(n);
					if (showExMessageCheck(m)) {
						return false
					}
					i = m.sbAll;
					j = i.split(",");
					if (j != "") {
						h = j[0].replace(/(^\s*)|(\s*$)/g, "");
						f = j[1].replace(/(^\s*)|(\s*$)/g, "");
						if ($("#resourcecode").val() == "") {
							$("#spanShowItemCar_n").click()
						}
						$("#resourcecode").val(h);
						$("#resourcename").val(f)
					}
				} else {
					if ($("#resourcecode").val() != "") {
						$("#spanShowItemCar_n").click()
					}
					$("#resourcecode").val("");
					$("#resourcename").val("")
				}
			},
			error: function() {
				return false
			}
		})
	}
}

function setFieldValue() {
	if ($("#codeselectid").val() == null) {
		alert_info("请先选择指定查询区域");
		return false
	}
	var a = $("#codeselectid").find("option:selected").text();
	var b = $("#codeselectid").find("option:selected").val();
	$("#assignQueryAreaShow").val(a);
	$("#assignQueryArea").val(b);
	return true
}

function lessThanOneHour(j) {
	if (insuredPeriodCheck($("#cityselected").val())) {
		var c = $("#cityselected").val();
		var b = $("#paravalue").val();
		var f = $("#operatedate").val();
		f = replace(f, "-", "/");
		var a = j.id;
		var d;
		var e;
		var h;
		if (a == "StartDateJQ" || a == "StartHourJQ" || a == "StartMinuteJQ") {
			d = $("#startdatejq").val();
			e = $("#starthourjq").val();
			if (addMinute(c)) {
				h = $("#startdatejq").val()
			}
		} else {
			if (a == "StartDateSY" || a == "StartHourSY" || a == "StartMinuteSY") {
				d = $("#startdatesy").val();
				e = $("#starthoursy").val();
				if (addMinute(c)) {
					h = document.fm.StartMinuteSY.value
				}
			}
		}
		e = parseInt(e);
		h = parseInt(h);
		var l = new Date();
		var g = parseInt(l.getHours());
		var i = parseInt(l.getMinutes());
		if (b == "1") {
			if (compareFullDate(d, getNextDateFullDate(f, 0)) == 0) {
				if (e >= g) {
					var k = 0;
					if (e - g == 0) {
						if (addMinute(c)) {
							k = h - i;
							if (k > 0) {
								alert("起保时间距离当前时间已不足" + k + "分钟，请及时出单！")
							}
						}
					}
					if (e - g == 1) {
						if (addMinute(c)) {
							k = h + (60 - i);
							if (k < 60) {
								alert("起保时间距离当前时间已不足" + k + "分钟，请及时出单！")
							}
						} else {
							k = 60 - i;
							if (k < 60) {
								alert("起保时间距离当前时间已不足" + k + "分钟，请及时出单！")
							}
						}
					}
				}
			}
		}
	}
}

function checkPowerTypeCode(b) {
	var c = "";
	var a = "0";
	if (b != "" && b != null) {
		if (b == "D1") {
			c = "0"
		} else {
			if (b == "D2") {
				c = "0"
			} else {
				if (b == "D13") {
					c = "0"
				} else {
					if (b == "D3") {
						c = "0"
					} else {
						if (b == "D4") {
							c = "0"
						} else {
							if (b == "D7") {
								c = "0"
							} else {
								if (b == "D9") {
									c = "0"
								} else {
									if (b == "D11") {
										c = "0"
									} else {
										if (b == "D14") {
											c = "0"
										} else {
											if (b == "D15") {
												c = "0"
											} else {
												if (b == "D6") {
													c = "1";
													a = "1"
												} else {
													if (b == "D8") {
														c = "2";
														a = "1"
													} else {
														if (b == "D12") {
															c = "3";
															a = "1"
														} else {
															if (b == "D5") {
																c = "4"
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		$("#BJFUEL_TYPE").val(c);
		$("#BJFUEL_TYPE").attr("disabled", true);
		if (a == "0") {
			$("#isEnergyCar").prop("checked", true)
		} else {
			if (a == "1") {
				$("#isEnergyCar1").prop("checked", true)
			}
		}
		$("#isEnergy_CarHidden").val(a)
	} else {
		$("#BJFUEL_TYPE").attr("disabled", false)
	}
}

function checkFrameNoJS(j) {
	var b = j;
	if (j.val() == "") {
		alert("请录入车架号！");
		return false
	}
	if (indivProfit_VINencryption($("#areacode").val())) {
		b = $("#framenoshowc");
		checkLengthenc(j, b)
	} else {
		checkLength(j)
	}
	if (j.val().length && addgdVINcheck($("#areacode").val())) {
		var k = $("#useyears").val();
		if (k <= 10) {
			var f = j.val();
			var h = /^[\da-z]+$/i;
			flag = h.test(f);
			if (!flag) {
				alert("只能输入数字、字母！");
				b.focus();
				b.select();
				return false
			}
		}
	}
	if (j.val().length && $("#areacode").val() != "31000000") {
		var f = j.val();
		var h = /^[0-9A-Za-z\/\.\-]+$/;
		flag = h.test(f);
		if (!flag) {
			alert("只能输入数字、字母和-！");
			b.focus();
			b.select();
			return false
		}
	}
	if ($("#areacode").val() == "53000000") {} else {
		if (j.val().length != 0 && j.val().length > 17 && $("#areacode").val() != "31000000") {
			errorMessage("温馨提示：车辆的车架号不能大于17位，请您参照车辆行驶证填写。");
			b.focus();
			b.select();
			return false
		}
	}
	if (indivProfit_ComCodeALL_CheckTime()) {
		if (($("#VINNo").val() != null && $("#VINNo").val() != "" && $("#VINNo").val().length > 0) && ($("#frameno").val() !=
				null && $("#frameno").val() != "" && $("#frameno").val().length > 0) && $("#VINNo").val() != $("#frameno").val()) {
			if ($("#VINNo").val() != null && $("#VINNo").val() != "" && $("#VINNo").val().length > 0) {
				var i;
				try {
					i = window.parent.parent.frames.page_YEJ.document;
					i.getElementById("YEJ_VINNo").value = $("#VINNo").val();
					i.getElementById("YEJ_VINNo").value = $("#frameno").val()
				} catch (g) {}
			}
			alert("温馨提示：VIN码与车架号不一致!");
			return false
		}
	}
	if (checkProfit_JQ2_10SY1_1_VIN($("#areacode").val())) {
		var c = $("#frameno").val();
		if (c != null && c != "" && trim(c).length > 0 && trim(c).length < 17) {
			alert("温馨提示：新车和初登日期03年1月1日以后车辆，车架号不为17位,但是在后续的投保确认中须提交电子联系单!");
			return false
		}
	}
	if (indivProfit_TraControlJS($("#areacode").val())) {
		var a = $("#framenooldjg").val();
		var d = $("#frameno").val();
		checkJGoptionsJS()
	}
	return true
}

function HiddenFieldPric() {
	var b = "交管车辆查询校验";
	var a = "/piccallweb/DAA3g/tb/business/UIVEHICLEQueryListJGJSTwo.jsp";
	var e = document.createElement("form");
	e.id = "tempForm1";
	e.method = "post";
	e.action = a;
	e.target = b;
	var d = $("#checkNo").val();
	var c = document.createElement("input");
	c.type = "hidden";
	c.name = "checkNo";
	c.value = d;
	e.appendChild(c);
	var g = document.fm.checkCodeImage1.value;
	var f = document.createElement("input");
	f.type = "hidden";
	f.name = "checkCodeImage1";
	f.value = g;
	e.appendChild(f);
	e.attachEvent("onsubmit", function() {
		openWindow(b)
	});
	document.body.appendChild(e);
	e.fireEvent("onsubmit");
	e.submit();
	document.body.removeChild(e)
}

function castJGplatJS() {
	var b = $("#checkNo").val();
	var a = "/piccallweb/DAA3g/tb/business/UIVEHICLEQueryListJGJScfm.jsp?LicenseNo=" + $("#license_pn").val() +
		"&checkNo=" + b + "&VinNo=" + $("#frameno").val() + "&checkCode=" + $("#checkCode").val() + "&AreaCode=" + $(
			"#comselected").val() + "&ControlKind=T";
	window.open(a, "交管车辆信息",
		"left=300,top=150,height=450,width=900,menubar=no,toolbar=no,location=no,status=yes,scrollbars=yes")
}

function checkJGoptions() {
	var c = $("#license_pn").val();
	var a = /^[0-9a-zA-Z]*$/g.test(c);
	var b = $("#frameno").val();
	if (c == null || c == "" || c == undefined) {
		alert("请将车牌号录入完毕后再查询交管车辆信息!")
	} else {
		if (b == null || b == "" || b == undefined) {
			alert("请将车架号录入完毕后再查询交管车辆信息!!")
		} else {
			if (!a && c.length < 6) {
				alert("车牌号不足6位，请重新录入!")
			} else {
				if (a == true || c.indexOf("新车") > -1 || c.indexOf("暂未上牌") > -1 || c.indexOf("使") > -1 || c.indexOf("警") > -1 || !c
					.indexOf("苏") == 0) {
					alert("未上牌车辆、使馆车、外地车、军车警车不能查询交管车辆信息!");
					document.getElementsByName("QueryCarBtn")[0].disabled = ""
				} else {
					castJGplat()
				}
			}
		}
	}
}

function JSJGplat() {
	if (indivProfit_TraControlJS($("#areacode").val())) {
		var a = $("#frameno").val()
	}
}

function checkJGoptionsJS() {
	if (indivProfit_TraControlJS($("#comselected").val())) {
		var c = $("#license_pn").val();
		var a = /^[0-9a-zA-Z]*$/g.test(c);
		var b = $("#frameno").val();
		if (!(b == null || b == "" || b == undefined)) {
			if (a == true || c.indexOf("新车") > -1 || c.indexOf("暂未上牌") > -1 || c.indexOf("使") > -1 || c.indexOf("警") > -1 || !c.indexOf(
					"苏") == 0) {
				alert("未上牌车辆、使馆车、外地车、军车警车不能查询交管车辆信息!");
				document.getElementsByName("QueryCarBtn")[0].disabled = ""
			} else {
				if (!a && c.length < 6) {
					alert("车牌号不足6位，请重新录入!")
				} else {
					JSJGplat()
				}
			}
		}
	}
}
$("document").ready(function() {
	var a = $("#areacode").val();
	if (indivProfit_TraControlJS(a)) {
		$(".queryjgplatjs_box").show()
	}
});

function car_Initialdate() {
	var a = $("#iKType").val();
	if (a == "01") {
		checkTimes()
	}
	$("#enrolldate1").val($("#enrolldate").val())
}

function carRegisterdate() {
	if ($("#enrolldate1").val() != $("#enrolldate").val()) {
		$("#spanShowItemCar_a").show();
		$("#spanShowItemCar_a1").hide();
		$("#carWarranty").hide()
	}
}

function carLicenseNumber(b) {
	$(b).val($(b).val().toUpperCase());
	var a = $("#license_pn").val();
	$("#YEL_deviceno").val(a);
	$("#EDD_deviceno").val(a)
}

function carPlate() {
	var a = $("#iKType").val();
	if (a == "01") {
		checkTimes()
	}
	if ($("#renewal_insur").attr("disabled")) {
		$("#renewal_insur").attr("disabled", false)
	}
}

function carBrandmodel() {
	var a = $("#carbrandmodelname").val();
	$("#YEL_makefactory").val(a);
	$("#EDD__makefactory").val(a)
}

function carQuery() {
	if ($("#purchaseprice").val() != "") {
		$("#purchaseprice").val("");
		$("#consultactualvalue").val("");
		changeCarType()
	}
	$("#carbrandmodelname").change()
}

function carIntersectionquery() {
	if (indivProfit_TraControlJS($("#areacode").val())) {
		checkFrameNoJS($("#framenoshowc"))
	}
	if (indivProfit_PlatJS_540_430($("#areacode").val())) {
		checkJGoptions()
	}
}

function specifiedQuery1(a) {
	var a = a || window.event;
	if (a.keyCode == 13) {
		$("#assignQueryAreaShow").dblclick()
	}
}

function carFramenumber() {
	$("#frameno").val($("#framenoshowc").val());
	var a = $("#framenoshowc").val();
	$("#YEL_fuelname").val(a);
	$("#EDD_fuelname").val(a)
}

function systartDate() {
	var a = $("#iKType").val();
	if (a == "01") {
		checkTimes()
	}
}

function syendDate() {
	var a = $("#iKType").val();
	if (a == "01") {
		checkTimes()
	}
}

function mechanismCode(c) {
	var a = $("#comselected").val();
	var b = $("#YXBindUserCode").val();
	if (a == "" || a == "undefind") {
		alert("请先选择机构代码。");
		return
	}
	if (c.type == "keydown") {
		if (c.keyCode != 13) {
			return
		}
	}
	if ((c.type == "keydown" && c.keyCode == 13) || c.type == "dblclick") {
		$("#commissioninfo").empty();
		clearSumPremium();
		businessAgentchannel(a, b);
		QuickGetCommissionswitch()
	}
}

function mechanismCode1(a) {
	var a = a || window.event;
	if (a.keyCode == 13) {
		$("#source").dblclick()
	}
}

function mechanismCode2(c) {
	var b = $("#source").val();
	var a = $("#YXBindUserCode").val();
	if (b == "" || b == "undefind") {
		alert("请先选择业务来源。");
		return
	}
	if (c.type == "keydown") {
		if (c.keyCode != 13) {
			return
		}
	}
	if ((c.type == "keydown" && c.keyCode == 13) || c.type == "dblclick") {
		$("#commissioninfo").empty();
		clearSumPremium();
		subordinateCodechannel(b, a);
		QuickGetCommissionswitch()
	}
}

function mechanismCode3(a) {
	var a = a || window.event;
	if (a.keyCode == 13) {
		$("#channel_code").dblclick()
	}
}

function carChannel(b) {
	var c = $("#channel_code").val();
	var a = $("#YXBindUserCode").val();
	if (c == "" || c == "undefind") {
		alert("请先选择渠道代码。");
		return
	}
	if (b.type == "keydown") {
		if (b.keyCode != 13) {
			return
		}
	}
	if ((b.type == "keydown" && b.keyCode == 13) || b.type == "dblclick") {
		$("#commissioninfo").empty();
		clearSumPremium();
		subordinateNamechannel(c, a);
		QuickGetCommissionswitch()
	}
}

function carChannel1(a) {
	var a = a || window.event;
	if (a.keyCode == 13) {
		$("#channel_name").dblclick()
	}
}

function bindUsercode() {
	var a = $("#YXBindUserCode").val();
	if (a != "") {
		$("#source").val("");
		$("#channel_name").val("");
		$("#channel_code").val("")
	}
}

function bindUsercode1() {
	var a = $("#YXBindUserCode").val();
	if (a != "") {
		$("#source").val("");
		$("#channel_name").val("");
		$("#channel_code").val("")
	}
}

function dispCarCheck(a) {
	if ($(a).val() == "1") {
		$("#carchecker").css("display", "");
		$("#carchecktime").css("display", "");
		if (indivProfit_addVehicleExaminerCode($("#proSelected").val())) {
			$("#carcheckercode").css("display", "")
		}
		if (indivProfit_YCCheckTime()) {
			$("#CarCheckFlag").val("1")
		}
	} else {
		$("#carchecker").css("display", "none");
		$("#carchecktime").css("display", "none");
		$("#carchecker").val("");
		$("#carchecktime").val("");
		if (indivProfit_addVehicleExaminerCode($("#proSelected").val())) {
			$("#carcheckercode").css("display", "none");
			$("#carcheckercode").val("")
		}
		if (indivProfit_YCCheckTime()) {
			$("#CarCheckFlag").val("0")
		}
	}
}

function changeSeatCount() {
	if (CheckFCarEBS_CheckTime($("#areacode").val())) {
		eEBSMsg()
	}
}

function eEBSMsg() {
	var a = $("#areacode").val();
	if (!CheckFCarEBS_CheckTime(a)) {
		return true
	} else {
		var b = window.parent.page_EBS;
		if (b == "" || b == "undefined" || b == null) {
			return true
		} else {
			clearSumPremium();
			$("#biaozhunbaofeijisuan").click();
			alert("修改车辆核载量，已从新计算保费，请查询驾乘人员补充意外伤害保险配置方案。")
		}
	}
}

function chgJqEpolicyTpye() {
	var a = $("#comselected").val();
	if (a.substring(0, 4) == "3301") {
		$("#jqpolicytype").val("1")
	} else {
		$("#jqpolicytype").val("0")
	}
};
