"use strict";
/*

Copyright 2010-2015 Scott Fortmann-Roe. All rights reserved.

This file may distributed and/or modified under the
terms of the Insight Maker Public License (https://InsightMaker.com/impl).

*/

var graph;
var primitiveBank = {};
var defaultSolver = '{"enabled": false, "algorithm": "RK1", "timeStep": 1}';

var doc = document.implementation.createDocument("", "", null);

primitiveBank.text = doc.createElement('Text');
primitiveBank.text.setAttribute('name', getText('文本区域'));
primitiveBank.text.setAttribute('LabelPosition', "Middle");

primitiveBank.folder = doc.createElement('Folder');
primitiveBank.folder.setAttribute('name', getText('新文件夹'));
primitiveBank.folder.setAttribute('Note', '');
primitiveBank.folder.setAttribute('Type', 'None');
primitiveBank.folder.setAttribute('Solver', defaultSolver);
primitiveBank.folder.setAttribute('Image', 'None');
primitiveBank.folder.setAttribute('FlipHorizontal', false);
primitiveBank.folder.setAttribute('FlipVertical', false);
primitiveBank.folder.setAttribute('LabelPosition', "Middle");
primitiveBank.folder.setAttribute('AgentBase', "");

primitiveBank.ghost = doc.createElement('Ghost');
primitiveBank.ghost.setAttribute('Source', '');

primitiveBank.picture = doc.createElement('Picture');
primitiveBank.picture.setAttribute('name', '');
primitiveBank.picture.setAttribute('Note', '');
primitiveBank.picture.setAttribute('Image', 'Growth');
primitiveBank.picture.setAttribute('FlipHorizontal', false);
primitiveBank.picture.setAttribute('FlipVertical', false);
primitiveBank.picture.setAttribute('LabelPosition', "Bottom");

primitiveBank.display = doc.createElement('Display');
primitiveBank.display.setAttribute('name', getText('默认显示'));
primitiveBank.display.setAttribute('Note', '');
primitiveBank.display.setAttribute('Type', 'Time Series');
primitiveBank.display.setAttribute('xAxis', getText("时间") + ' (%u)');
primitiveBank.display.setAttribute('yAxis', '');
primitiveBank.display.setAttribute('yAxis2', '');
primitiveBank.display.setAttribute('showMarkers', false);
primitiveBank.display.setAttribute('showLines', true);
primitiveBank.display.setAttribute('showArea', false);
primitiveBank.display.setAttribute('ThreeDimensional', false);
primitiveBank.display.setAttribute('Primitives', '');
primitiveBank.display.setAttribute('Primitives2', '');
primitiveBank.display.setAttribute('AutoAddPrimitives', false);
primitiveBank.display.setAttribute('ScatterplotOrder', 'X Primitive, Y Primitive');
primitiveBank.display.setAttribute('Image', 'Display');
primitiveBank.display.setAttribute('FlipHorizontal', false);
primitiveBank.display.setAttribute('FlipVertical', false);
primitiveBank.display.setAttribute('LabelPosition', "Bottom");
primitiveBank.display.setAttribute('legendPosition', "Automatic");

function setValuedProperties(cell) {
    cell.setAttribute('Units', "Unitless")
    cell.setAttribute('MaxConstraintUsed', false)
    cell.setAttribute('MinConstraintUsed', false)
    cell.setAttribute('MaxConstraint', '100');
    cell.setAttribute('MinConstraint', '0');
    cell.setAttribute('ShowSlider', false);
    cell.setAttribute('SliderMax', 100);
    cell.setAttribute('SliderMin', 0);
    cell.setAttribute('SliderStep', '');
}

primitiveBank.stock = doc.createElement('Stock');
primitiveBank.stock.setAttribute('name', getText('新库'));
primitiveBank.stock.setAttribute('Note', '');
primitiveBank.stock.setAttribute('InitialValue', '0');
primitiveBank.stock.setAttribute('StockMode', 'Store');
primitiveBank.stock.setAttribute('Delay', '10');
primitiveBank.stock.setAttribute('Volume', '100');
primitiveBank.stock.setAttribute('NonNegative', false);
setValuedProperties(primitiveBank.stock);
primitiveBank.stock.setAttribute('Image', 'None');
primitiveBank.stock.setAttribute('FlipHorizontal', false);
primitiveBank.stock.setAttribute('FlipVertical', false);
primitiveBank.stock.setAttribute('LabelPosition', "Middle");

primitiveBank.state = doc.createElement('State');
primitiveBank.state.setAttribute('name', getText('新状态'));
primitiveBank.state.setAttribute('Note', '');
primitiveBank.state.setAttribute('Active', 'false');
primitiveBank.state.setAttribute('Residency', '0');
primitiveBank.state.setAttribute('Image', 'None');
primitiveBank.state.setAttribute('FlipHorizontal', false);
primitiveBank.state.setAttribute('FlipVertical', false);
primitiveBank.state.setAttribute('LabelPosition', "Middle");

primitiveBank.transition = doc.createElement('Transition');
primitiveBank.transition.setAttribute('name', getText('交换'));
primitiveBank.transition.setAttribute('Note', '');
primitiveBank.transition.setAttribute('Trigger', 'Timeout');
primitiveBank.transition.setAttribute('Value', '1');
primitiveBank.transition.setAttribute('Repeat', false);
primitiveBank.transition.setAttribute('Recalculate', false);
setValuedProperties(primitiveBank.transition);

primitiveBank.action = doc.createElement('Action');
primitiveBank.action.setAttribute('name', getText('新动作'));
primitiveBank.action.setAttribute('Note', '');
primitiveBank.action.setAttribute('Trigger', 'Probability');
primitiveBank.action.setAttribute('Value', '0.5');
primitiveBank.action.setAttribute('Repeat', true);
primitiveBank.action.setAttribute('Recalculate', false);
primitiveBank.action.setAttribute('Action', 'Self.Move({Rand(), Rand()})');

primitiveBank.agents = doc.createElement('Agents');
primitiveBank.agents.setAttribute('name', getText('新主体群'));
primitiveBank.agents.setAttribute('Note', '');
primitiveBank.agents.setAttribute('Size', 100);
primitiveBank.agents.setAttribute('GeoWrap', false);
primitiveBank.agents.setAttribute('GeoDimUnits', 'Unitless');
primitiveBank.agents.setAttribute('GeoWidth', 200);
primitiveBank.agents.setAttribute('GeoHeight', 100);
primitiveBank.agents.setAttribute('Placement', "Random");
primitiveBank.agents.setAttribute('PlacementFunction', "{Rand()*Width(Self), Rand()*Height(Self)}");
primitiveBank.agents.setAttribute('Network', "None");
primitiveBank.agents.setAttribute('NetworkFunction', "RandBoolean(0.02)");
primitiveBank.agents.setAttribute('Agent', '');
primitiveBank.agents.setAttribute('Image', 'None');
primitiveBank.agents.setAttribute('FlipHorizontal', false);
primitiveBank.agents.setAttribute('FlipVertical', false);
primitiveBank.agents.setAttribute('LabelPosition', "Middle");
primitiveBank.agents.setAttribute('ShowSlider', false);
primitiveBank.agents.setAttribute('SliderMax', 100);
primitiveBank.agents.setAttribute('SliderMin', 0);
primitiveBank.agents.setAttribute('SliderStep', 1);

primitiveBank.variable = doc.createElement('Variable');
primitiveBank.variable.setAttribute('name', getText('新变量'));
primitiveBank.variable.setAttribute('Note', '');
primitiveBank.variable.setAttribute('Equation', '0');
setValuedProperties(primitiveBank.variable);
primitiveBank.variable.setAttribute('Image', 'None');
primitiveBank.variable.setAttribute('FlipHorizontal', false);
primitiveBank.variable.setAttribute('FlipVertical', false);
primitiveBank.variable.setAttribute('LabelPosition', "Middle");

primitiveBank.button = doc.createElement('Button');
primitiveBank.button.setAttribute('name', getText('新按钮'));
primitiveBank.button.setAttribute('Note', '');
primitiveBank.button.setAttribute('Function', 'showMessage("触发按钮操作！\\ in \\如果要编辑此操作，请在按住键盘上的Shift键的同时单击按钮。")');
primitiveBank.button.setAttribute('Image', 'None');
primitiveBank.button.setAttribute('FlipHorizontal', false);
primitiveBank.button.setAttribute('FlipVertical', false);
primitiveBank.button.setAttribute('LabelPosition', "Middle");

primitiveBank.converter = doc.createElement('Converter');
primitiveBank.converter.setAttribute('name', getText('新转换器'));
primitiveBank.converter.setAttribute('Note', '');
primitiveBank.converter.setAttribute('Source', 'Time');
primitiveBank.converter.setAttribute('Data', '0,0; 1,1; 2,4; 3,9');
primitiveBank.converter.setAttribute('Interpolation', 'Linear');
setValuedProperties(primitiveBank.converter);
primitiveBank.converter.setAttribute('Image', 'None');
primitiveBank.converter.setAttribute('FlipHorizontal', false);
primitiveBank.converter.setAttribute('FlipVertical', false);
primitiveBank.converter.setAttribute('LabelPosition', "Middle");

primitiveBank.flow = doc.createElement('Flow');
primitiveBank.flow.setAttribute('name', getText('流'));
primitiveBank.flow.setAttribute('Note', '');
primitiveBank.flow.setAttribute('FlowRate', '0');
primitiveBank.flow.setAttribute('OnlyPositive', true);
primitiveBank.flow.setAttribute('TimeIndependent', false);
setValuedProperties(primitiveBank.flow);

primitiveBank.link = doc.createElement('Link');
primitiveBank.link.setAttribute('name', getText('链接'));
primitiveBank.link.setAttribute('Note', '');
primitiveBank.link.setAttribute('BiDirectional', false);

primitiveBank.setting = doc.createElement('Setting');
primitiveBank.setting.setAttribute('Note', '');
primitiveBank.setting.setAttribute('Version', '36');
primitiveBank.setting.setAttribute('Throttle', '1');
primitiveBank.setting.setAttribute('TimeLength', '100');
primitiveBank.setting.setAttribute('TimeStart', '0');
primitiveBank.setting.setAttribute('TimeStep', '1');
primitiveBank.setting.setAttribute('TimeUnits', 'Years');
primitiveBank.setting.setAttribute('Units', "");
primitiveBank.setting.setAttribute("SolutionAlgorithm", "RK1");
primitiveBank.setting.setAttribute("BackgroundColor", "white");
primitiveBank.setting.setAttribute("Macros", "");
primitiveBank.setting.setAttribute("SensitivityPrimitives", "");
primitiveBank.setting.setAttribute("SensitivityRuns", 50);
primitiveBank.setting.setAttribute("SensitivityBounds", "50, 80, 95, 100");
primitiveBank.setting.setAttribute("SensitivityShowRuns", "false");
primitiveBank.setting.setAttribute("StrictUnits", "true");
primitiveBank.setting.setAttribute("StrictLinks", "true");
primitiveBank.setting.setAttribute("StrictAgentResolution", "true");
primitiveBank.setting.setAttribute("StyleSheet", "{}");


var blankGraphTemplate = "<mxGraphModel>\n  <root>\n    <mxCell id=\"0\"\/>\n    <mxCell id=\"1\" parent=\"0\"\/>\n    <Folder name=\"\u6b65\u9aa42. \u5206\u4eab\u4f60\u7684\u6a21\u578b\" Note=\"\" Type=\"None\" Solver=\"{&quot;enabled&quot;: false, &quot;algorithm&quot;: &quot;RK1&quot;, &quot;timeStep&quot;: 1}\" Image=\"None\" FlipHorizontal=\"false\" FlipVertical=\"false\" LabelPosition=\"Top\" AgentBase=\"\" id=\"44\">\n      <mxCell style=\"folder;dashed=0;fontSize=18;fontFamily=Verdana;fontStyle=1;rounded=0;strokeColor=#C0C0C0;strokeWidth=1;30=10;fillColor=#FFFFFF\" parent=\"1\" vertex=\"1\">\n        <mxGeometry x=\"710\" y=\"90\" width=\"320\" height=\"522\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Folder>\n    <Setting Note=\"\" Version=\"36\" TimeLength=\"20\" TimeStart=\"0\" TimeStep=\"1\" TimeUnits=\"Years\" StrictUnits=\"true\" StrictLinks=\"true\" StrictAgentResolution=\"true\" Units=\"\" HiddenUIGroups=\"Validation,User Interface\" SolutionAlgorithm=\"RK1\" BackgroundColor=\"white\" Throttle=\"1\" Macros=\"\" SensitivityPrimitives=\"\" SensitivityRuns=\"50\" SensitivityBounds=\"50, 80, 95, 100\" SensitivityShowRuns=\"false\" article=\"{&quot;comments&quot;:true, &quot;facebookUID&quot;: &quot;&quot;}\" StyleSheet=\"{}\" id=\"2\">\n      <mxCell parent=\"1\" vertex=\"1\" visible=\"0\">\n        <mxGeometry x=\"20\" y=\"20\" width=\"80\" height=\"40\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Setting>\n    <Display name=\"Default Display\" Note=\"\" Type=\"Time Series\" xAxis=\"Time (%u)\" yAxis=\"%o\" ThreeDimensional=\"false\" Primitives=\"35\" AutoAddPrimitives=\"true\" ScatterplotOrder=\"X Primitive, Y Primitive\" Image=\"Display\" yAxis2=\"\" Primitives2=\"\" showMarkers=\"false\" showLines=\"true\" showArea=\"false\" legendPosition=\"None\" id=\"3\">\n      <mxCell style=\"roundImage;image=\/builder\/images\/DisplayFull.png;\" parent=\"1\" vertex=\"1\" visible=\"0\">\n        <mxGeometry x=\"50\" y=\"20\" width=\"64\" height=\"64\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Display>\n    <Button name=\"单击新建空白画布\" Note=\"\" Function=\"clearModel()\" Image=\"None\" FlipHorizontal=\"false\" FlipVertical=\"false\" LabelPosition=\"Middle\" id=\"23\">\n      <mxCell style=\"button;fontSize=18;fillColor=#FFFF99;strokeColor=#FF9900;fontColor=#FF6600;fontStyle=1;fontFamily=Verdana\" parent=\"1\" vertex=\"1\">\n        <mxGeometry x=\"510\" y=\"12\" width=\"520\" height=\"58\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Button>\n    <Picture name=\"\" Note=\"\" Image=\"List\" FlipHorizontal=\"false\" FlipVertical=\"false\" LabelPosition=\"Bottom\" id=\"46\">\n      <mxCell style=\"picture;image=https:\/\/insightmaker.com\/builder\/images\/SD\/List.png;imageFlipV=0;imageFlipH=0;shape=image\" parent=\"1\" vertex=\"1\">\n        <mxGeometry x=\"30\" y=\"10\" width=\"64\" height=\"64\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Picture>\n    <Text name=\"\u6a21\u578b\u5efa\u7acb\u57fa\u7840\" LabelPosition=\"Middle\" id=\"47\">\n      <mxCell style=\"text;fontStyle=1;fontFamily=Helvetica\" parent=\"1\" vertex=\"1\">\n        <mxGeometry x=\"100\" y=\"17\" width=\"320\" height=\"50\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Text>\n    <Picture name=\"\" Note=\"\" Image=\"Network\" FlipHorizontal=\"false\" FlipVertical=\"false\" LabelPosition=\"Bottom\" id=\"48\">\n      <mxCell style=\"picture;image=https:\/\/insightmaker.com\/builder\/images\/SD\/Network.png;imageFlipV=0;imageFlipH=0;shape=image\" parent=\"1\" vertex=\"1\">\n        <mxGeometry x=\"950\" y=\"492\" width=\"132\" height=\"132\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Picture>\n    <Text name=\"&lt;i style=&quot;float:left;margin-right:8px;margin-bottom:5px;color:lightgrey&quot; class=&quot;fa fa-3x fa-share-alt&quot;&gt;&lt;\/i&gt; Insight Maker\u6a21\u578b\u662f\u7f51\u9875\uff0c\u6240\u4ee5\u5206\u4eab\u5b83\u4eec\u5c31\u50cf\u901a\u8fc7\u7535\u5b50\u90ae\u4ef6\u53d1\u9001\u94fe\u63a5\u6216\u5c06\u5176\u53d1\u5e03\u5230Twitter\u6216Facebook\u4e00\u6837\u7b80\u5355\u3002\u5982\u679c\u60a8\u6709\u81ea\u5df1\u7684\u7f51\u9875\u6216\u535a\u5ba2\uff0c\u5219\u53ef\u4ee5\u5728\u9875\u9762\u4e2d\u5d4c\u5165Insight Maker\u6a21\u578b\u3002&#xa;&lt;hr style=&quot;width:50%; margin-top:16px;margin-bottom:16px&quot;&gt;&lt;i style=&quot;float:left;margin-right:10px;margin-bottom:5px;color:lightgrey&quot; class=&quot;fa fa-4x fa-file-text-o&quot;&gt;&lt;\/i&gt; Insight Maker\u63d0\u4f9b\u4e86\u4e24\u79cd\u5f88\u597d\u7684\u65b9\u6cd5\u6765\u5e2e\u52a9\u60a8\u89e3\u91ca\u6a21\u578b\uff1a\u6545\u4e8b\u548c\u6587\u7ae0\u3002&#xa;&#xa;&lt;a href=&quot;\/storytelling&quot; target=&quot;_blank&quot;&gt; Stories &lt;\/a&gt;\u521b\u5efa\u6a21\u578b\u7684\u6f14\u7ec3\uff0c\u60a8\u53ef\u4ee5\u5728\u5176\u4e2d\u9010\u6b65\u663e\u793a\u6d88\u606f\u5e76\u663e\u793a\u6a21\u578b\u3002\u6587\u7ae0\u5c06\u6545\u4e8b\u8f6c\u6362\u4e3a\u6e05\u6670\u7684\u9759\u6001\u7f51\u9875\u3002&#xa;&#xa;\u4ee5\u4e0b\u662f\u4f7f\u7528Insight Maker\u5236\u4f5c\u7684\u4e00\u4e9b\u793a\u4f8b\u6587\u7ae0\u3002\u4f60\u4f1a\u5199\u4ec0\u4e48\u6587\u7ae0\uff1f&#xa;&#xa; \u2022 &quot;&lt;a href=&quot;https:\/\/insightmaker.com\/article\/20382&quot; target=&quot;_blank&quot;&gt;Air Pollution Dynamics&lt;\/a&gt;&quot;&#xa; \u2022 &quot;&lt;a href=&quot;https:\/\/insightmaker.com\/article\/8872&quot; target=&quot;_blank&quot;&gt;Bird Feeder Dilemma&lt;\/a&gt;&quot;&#xa; \u2022 &quot;&lt;a href=&quot;https:\/\/insightmaker.com\/article\/133&quot; target=&quot;_blank&quot;&gt;Balancing Loop with Delay&lt;\/a&gt;&quot;\" LabelPosition=\"Middle\" id=\"55\">\n      <mxCell style=\"text;fontFamily=Helvetica;fontStyle=0;fontSize=15;align=left;labelPosition=middle;verticalLabelPosition=middle;verticalAlign=middle\" parent=\"1\" vertex=\"1\">\n        <mxGeometry x=\"730\" y=\"138\" width=\"280\" height=\"455\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Text>\n    <Folder name=\"\u6b65\u9aa41. \u5efa\u7acb\u6a21\u578b\" Note=\"\" Type=\"None\" Solver=\"{&quot;enabled&quot;: false, &quot;algorithm&quot;: &quot;RK1&quot;, &quot;timeStep&quot;: 1}\" Image=\"None\" FlipHorizontal=\"false\" FlipVertical=\"false\" LabelPosition=\"Middle\" AgentBase=\"\" id=\"42\">\n      <mxCell style=\"folder;dashed=0;fontSize=18;fontFamily=Verdana;fontStyle=1;image=None;shape=rectangle;rounded=0;strokeColor=#C0C0C0;strokeWidth=1;30=10\" parent=\"1\" vertex=\"1\">\n        <mxGeometry x=\"15\" y=\"90\" width=\"680\" height=\"522\" as=\"geometry\">\n          <mxRectangle x=\"15\" y=\"98\" width=\"250\" height=\"30\" as=\"alternateBounds\"\/>\n        <\/mxGeometry>\n      <\/mxCell>\n    <\/Folder>\n    <Link name=\"Link\" Note=\"\" BiDirectional=\"false\" id=\"28\">\n      <mxCell style=\"link;dashed=0;strokeColor=#003366;strokeWidth=5;30=50;endArrow=block\" parent=\"42\" source=\"51\" target=\"49\" edge=\"1\">\n        <mxGeometry x=\"35\" width=\"100\" height=\"100\" as=\"geometry\">\n          <mxPoint x=\"35\" y=\"100\" as=\"sourcePoint\"\/>\n          <mxPoint x=\"135\" as=\"targetPoint\"\/>\n        <\/mxGeometry>\n      <\/mxCell>\n    <\/Link>\n    <Link name=\"Link\" Note=\"\" BiDirectional=\"false\" id=\"29\">\n      <mxCell style=\"link;strokeColor=#003366;dashed=0;strokeWidth=5;30=50;endArrow=block\" parent=\"42\" source=\"49\" target=\"50\" edge=\"1\">\n        <mxGeometry x=\"35\" width=\"100\" height=\"100\" as=\"geometry\">\n          <mxPoint x=\"35\" y=\"100\" as=\"sourcePoint\"\/>\n          <mxPoint x=\"135\" as=\"targetPoint\"\/>\n          <Array as=\"points\"\/>\n        <\/mxGeometry>\n      <\/mxCell>\n    <\/Link>\n    <Text name=\"\u4f7f\u7528\u4e00\u5957\u5e7f\u6cdb\u7684&lt;a href=&quot;\/diagramming&quot; target=&quot;_blank&quot;&gt;\u7ed8\u56fe\u5de5\u5177\u6765\u521b\u5efa&lt;\/a&gt;\u56e0\u679c\u5faa\u73af\u56fe\uff0c\u6d41\u7a0b\u56fe\u6216\u4e30\u5bcc\u7684\u56fe\u7247\u3002 \u6784\u5efa\u7528\u4e8e\u4f20\u8fbe\u60a8\u7684\u89c1\u89e3\u548c\u601d\u60f3\u6a21\u578b\u7684\u56fe\u8868\u3002&#xa;&#xa;\u6b64\u56fe\u662fInsight Maker\u6a21\u578b\u3002 \u968f\u610f\u6539\u53d8\u5b83\u3002 \u6bcf\u4e2a\u56fe\u7247\uff0c\u6587\u672c\u6846\u6216\u5176\u4ed6\u5143\u7d20\u79f0\u4e3a\u201c&lt;a href=&quot;\/primitives&quot; target=&quot;_blank&quot;&gt;\u539f\u59cb&lt;\/a&gt;\u201d\u3002 \u60a8\u53ef\u4ee5\u5355\u51fb\u5e76\u62d6\u52a8\u57fa\u5143\u4ee5\u79fb\u52a8\u5b83\u4eec\u6216\u5728\u4fa7\u680f\u4e2d\u7f16\u8f91\u5176\u5185\u5bb9\u3002\" LabelPosition=\"Middle\" id=\"45\">\n      <mxCell style=\"text;fontFamily=Helvetica;fontStyle=0;fontSize=15;align=left;labelPosition=middle;verticalLabelPosition=middle;verticalAlign=middle\" parent=\"42\" vertex=\"1\">\n        <mxGeometry x=\"185\" y=\"36\" width=\"475\" height=\"136\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Text>\n    <Picture name=\"\u6a21\u62df\" Note=\"\" Image=\"https:\/\/insightmaker.com\/sites\/default\/files\/misc\/kchart.png\" FlipHorizontal=\"false\" FlipVertical=\"false\" LabelPosition=\"Left\" id=\"49\">\n      <mxCell style=\"picture;image=https:\/\/insightmaker.com\/sites\/default\/files\/misc\/kchart.png;imageFlipV=0;imageFlipH=0;shape=image;verticalLabelPosition=middle;verticalAlign=middle;labelPosition=left;align=right;fontStyle=1\" parent=\"42\" vertex=\"1\">\n        <mxGeometry x=\"79\" y=\"223\" width=\"90\" height=\"90\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Picture>\n    <Picture name=\"\u5206\u6790\" Note=\"\" Image=\"https:\/\/insightmaker.com\/sites\/default\/files\/misc\/kformula.png\" FlipHorizontal=\"false\" FlipVertical=\"false\" LabelPosition=\"Left\" id=\"50\">\n      <mxCell style=\"picture;image=https:\/\/insightmaker.com\/sites\/default\/files\/misc\/kformula.png;imageFlipV=0;imageFlipH=0;shape=image;verticalLabelPosition=middle;verticalAlign=middle;labelPosition=left;align=right;fontStyle=1\" parent=\"42\" vertex=\"1\">\n        <mxGeometry x=\"79\" y=\"402\" width=\"90\" height=\"90\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Picture>\n    <Picture name=\"\u56fe\u8868\" Note=\"\" Image=\"https:\/\/insightmaker.com\/sites\/default\/files\/misc\/kivio.png\" FlipHorizontal=\"false\" FlipVertical=\"false\" LabelPosition=\"Left\" id=\"51\">\n      <mxCell style=\"picture;image=https:\/\/insightmaker.com\/sites\/default\/files\/misc\/kivio.png;imageFlipV=0;imageFlipH=0;shape=image;verticalLabelPosition=middle;verticalAlign=middle;labelPosition=left;align=right;fontStyle=1\" parent=\"42\" vertex=\"1\">\n        <mxGeometry x=\"79\" y=\"40\" width=\"90\" height=\"90\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Picture>\n    <Text name=\"\u5c06\u65b9\u7a0b\u5f0f\u6dfb\u52a0\u5230\u6a21\u578b\u4e2d\u4ee5&lt;a href=&quot;\/simulating&quot; target=&quot;_blank&quot;&gt;\u6a21\u62df&lt;\/a&gt;\u672a\u6765\u7684\u884c\u4e3a\u548c\u53d8\u5316\u3002 \u4f7f\u7528\u529f\u80fd\u5f3a\u5927\u7684&lt;a href=&quot;\/equations&quot; target=&quot;_blank&quot;&gt;\u7b49\u5f0f\u8bed\u8a00&lt;\/a&gt;\u548c\u5927\u578b&lt;a href=&quot;\/functions&quot; target=&quot;_blank&quot;&gt;\u5185\u7f6e\u51fd\u6570&lt;\/a&gt;\u5e93 \u6a21\u62df&lt;a href=&quot;\/systemdynamics&quot; target=&quot;_blank&quot;&gt;\u7cfb\u7edf\u52a8\u529b\u5b66&lt;\/a&gt;\u6216&lt;a href=&quot;\/agentbased&quot; target=&quot;_blank&quot;&gt;\u57fa\u4e8e\u4ee3\u7406\u7684\u6a21\u578b&lt;\/a&gt;\u3002 \u76f4\u63a5\u5728Insight Maker\u4e2d\u67e5\u770b\u548c\u6d4f\u89c8\u7ed3\u679c\u3002\" LabelPosition=\"Middle\" id=\"52\">\n      <mxCell style=\"text;fontFamily=Helvetica;fontStyle=0;fontSize=15;align=left;labelPosition=middle;verticalLabelPosition=middle;verticalAlign=middle\" parent=\"42\" vertex=\"1\">\n        <mxGeometry x=\"185\" y=\"215\" width=\"290\" height=\"120\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Text>\n    <Text name=\"\u5206\u6790\u60a8\u7684\u6a21\u578b\u7ed3\u679c\u3002 \u7814\u7a76\u8d8b\u52bf\u4ee5\u4e86\u89e3\u7cfb\u7edf\u7684\u52a8\u6001\u3002 \u4f7f\u7528Insight Maker\u7684&lt;a href=&quot;\/sensitivitytesting&quot; target=&quot;_blank&quot;&gt;\u654f\u611f\u5ea6\u6d4b\u8bd5\u5de5\u5177&lt;\/a&gt;\u6765\u4e86\u89e3\u968f\u673a\u6027\u7684\u5f71\u54cd\u3002 \u5e94\u7528Insight Maker\u7684&lt;a href=&quot;\/optimization&quot; target=&quot;_blank&quot;&gt;\u4f18\u5316\u5de5\u5177&lt;\/a&gt;\u4ee5\u6700\u5927\u5316\u6216\u6700\u5c0f\u5316\u76ee\u6807\u3002 \u5229\u7528Insight Maker\u7684&lt;a href=&quot;\/scripting&quot; target=&quot;_blank&quot;&gt;\u811a\u672c&lt;\/a&gt;\u529f\u80fd\u6765\u5b8c\u5168\u63a7\u5236\u60a8\u7684\u5206\u6790\u3002\" LabelPosition=\"Middle\" id=\"53\">\n      <mxCell style=\"text;fontFamily=Helvetica;fontStyle=0;fontSize=15;align=left;labelPosition=middle;verticalLabelPosition=middle;verticalAlign=middle\" parent=\"42\" vertex=\"1\">\n        <mxGeometry x=\"185\" y=\"387\" width=\"475\" height=\"120\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Text>\n    <Folder name=\"产品采用\" Note=\"\" Type=\"None\" Solver=\"{&quot;enabled&quot;: false, &quot;algorithm&quot;: &quot;RK1&quot;, &quot;timeStep&quot;: 1}\" Image=\"None\" FlipHorizontal=\"false\" FlipVertical=\"false\" LabelPosition=\"Middle\" AgentBase=\"\" id=\"41\">\n      <mxCell style=\"folder;strokeWidth=1;30=10;fontSize=13;image=None;shape=rectangle;\" parent=\"42\" vertex=\"1\">\n        <mxGeometry x=\"490\" y=\"213\" width=\"170\" height=\"122\" as=\"geometry\">\n          <mxRectangle x=\"490\" y=\"213\" width=\"170\" height=\"27\" as=\"alternateBounds\"\/>\n        <\/mxGeometry>\n      <\/mxCell>\n    <\/Folder>\n    <Stock name=\"用户\" Note=\"\" InitialValue=\"1000\" StockMode=\"Store\" Delay=\"10\" Volume=\"100\" NonNegative=\"false\" Units=\"Unitless\" MaxConstraintUsed=\"false\" MinConstraintUsed=\"false\" MaxConstraint=\"100\" MinConstraint=\"0\" ShowSlider=\"false\" SliderMax=\"100\" SliderMin=\"0\" SliderStep=\"\" Image=\"None\" FlipHorizontal=\"false\" FlipVertical=\"false\" LabelPosition=\"Middle\" id=\"35\">\n      <mxCell style=\"stock;fontSize=9;strokeWidth=1;30=10\" parent=\"41\" vertex=\"1\">\n        <mxGeometry x=\"20\" y=\"90\" width=\"40\" height=\"20\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Stock>\n    <Flow name=\"采用\" Note=\"\" FlowRate=\"[用户]*[速率]\" OnlyPositive=\"true\" TimeIndependent=\"false\" Units=\"Unitless\" MaxConstraintUsed=\"false\" MinConstraintUsed=\"false\" MaxConstraint=\"100\" MinConstraint=\"0\" ShowSlider=\"false\" SliderMax=\"100\" SliderMin=\"0\" SliderStep=\"\" id=\"36\">\n      <mxCell style=\"flow;fontSize=9;strokeWidth=2;30=20\" parent=\"41\" target=\"35\" edge=\"1\">\n        <mxGeometry x=\"-680\" y=\"-150\" width=\"100\" height=\"100\" as=\"geometry\">\n          <mxPoint x=\"40\" y=\"40\" as=\"sourcePoint\"\/>\n          <mxPoint x=\"-680\" y=\"-50\" as=\"targetPoint\"\/>\n        <\/mxGeometry>\n      <\/mxCell>\n    <\/Flow>\n    <Variable name=\"速率\" Note=\"\" Equation=\"0.2\" Units=\"Unitless\" MaxConstraintUsed=\"false\" MinConstraintUsed=\"false\" MaxConstraint=\"100\" MinConstraint=\"0\" ShowSlider=\"false\" SliderMax=\"100\" SliderMin=\"0\" SliderStep=\"\" Image=\"None\" FlipHorizontal=\"false\" FlipVertical=\"false\" LabelPosition=\"Middle\" id=\"37\">\n      <mxCell style=\"variable;fontSize=9;strokeWidth=1;30=10\" parent=\"41\" vertex=\"1\">\n        <mxGeometry x=\"60\" y=\"25\" width=\"40\" height=\"20\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Variable>\n    <Link name=\"Link\" Note=\"\" BiDirectional=\"false\" id=\"38\">\n      <mxCell style=\"link;strokeWidth=1;30=10\" parent=\"41\" source=\"37\" target=\"36\" edge=\"1\">\n        <mxGeometry x=\"-650\" y=\"-150\" width=\"100\" height=\"100\" as=\"geometry\">\n          <mxPoint x=\"-650\" y=\"-50\" as=\"sourcePoint\"\/>\n          <mxPoint x=\"-550\" y=\"-150\" as=\"targetPoint\"\/>\n          <Array as=\"points\">\n            <mxPoint x=\"50\" y=\"42\"\/>\n          <\/Array>\n        <\/mxGeometry>\n      <\/mxCell>\n    <\/Link>\n    <Button name=\"单击模拟\" Note=\"\" Function=\"runModel();\" Image=\"None\" FlipHorizontal=\"false\" FlipVertical=\"false\" LabelPosition=\"Middle\" id=\"40\">\n      <mxCell style=\"button;fillColor=#B3E2CD;strokeWidth=2;30=20;fontSize=12\" parent=\"41\" vertex=\"1\">\n        <mxGeometry x=\"80\" y=\"63\" width=\"75\" height=\"35\" as=\"geometry\"\/>\n      <\/mxCell>\n    <\/Button>\n  <\/root>\n<\/mxGraphModel>\n";

function setConverterInit(converter) {
    var start = parseFloat(getTimeStart(), 10);
    var end = parseFloat(getTimeStart(), 10) + parseFloat(getTimeLength(), 10);

    converter.setAttribute("Data", start + "," + Math.pow(start, 2) + "; " + (start + end) / 2 + "," + Math.pow((start + end) / 2, 2) + "; " + end + "," + Math.pow(end, 2))
}