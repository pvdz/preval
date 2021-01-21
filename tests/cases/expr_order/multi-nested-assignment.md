# Preval test case

# multi-nested-assignment.md

> expr_order > multi-nested-assignment
>
> Check whether transform is correct even with multiple nesting levels. The runtime expects to call abcde in that order.

#TODO

## Input

`````js filename=intro
var a = function(){ $('a'); return 1; }
var b = function(){ $('b'); a = 21; return 2; }
var c = function(){ $('c'); a = 31; b = 32; return 3; }
var d = function(){ $('d'); a = 41; b = 42; c = 43; return 4; }
var e = function(){ $('e'); a = 51; b = 52; c = 53; d = 54; return 5; }
a().x = b().x = c().x = d().x = e()
$(a, b, c, d, e);
`````

## Normalized

`````js filename=intro
var a;
var b;
var c;
var d;
var e;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpNestedAssignObj_2;
var tmpNestedAssignMemberObj_2;
var tmpNestedAssignMemberRhs_2;
a = function () {
  $('a');
  return 1;
};
b = function () {
  $('b');
  a = 21;
  return 2;
};
c = function () {
  $('c');
  a = 31;
  b = 32;
  return 3;
};
d = function () {
  $('d');
  a = 41;
  b = 42;
  c = 43;
  return 4;
};
e = function () {
  $('e');
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return 5;
};
tmpAssignMemLhsObj = a();
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpNestedAssignObj = b();
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj_1 = c();
tmpNestedAssignMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignObj_2 = d();
tmpNestedAssignMemberObj_2 = tmpNestedAssignObj_2;
tmpNestedAssignMemberRhs_2 = e();
tmpNestedAssignMemberObj_2.x = tmpNestedAssignMemberRhs_2;
tmpNestedAssignMemberRhs_1 = tmpNestedAssignMemberRhs_2;
tmpNestedAssignMemberObj_1.x = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpAssignMemRhs = tmpNestedAssignMemberRhs;
tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
tmpAssignMemLhsObj_2.x = tmpAssignMemRhs;
$(a, b, c, d, e);
`````

## Output

`````js filename=intro
var a;
var b;
var c;
var d;
var e;
var tmpAssignMemLhsObj;
var tmpAssignMemLhsObj_1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj_2;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedAssignMemberObj_1;
var tmpNestedAssignMemberRhs_1;
var tmpNestedAssignObj_2;
var tmpNestedAssignMemberObj_2;
var tmpNestedAssignMemberRhs_2;
a = function () {
  $('a');
  return 1;
};
b = function () {
  $('b');
  a = 21;
  return 2;
};
c = function () {
  $('c');
  a = 31;
  b = 32;
  return 3;
};
d = function () {
  $('d');
  a = 41;
  b = 42;
  c = 43;
  return 4;
};
e = function () {
  $('e');
  a = 51;
  b = 52;
  c = 53;
  d = 54;
  return 5;
};
tmpAssignMemLhsObj = a();
tmpAssignMemLhsObj_1 = tmpAssignMemLhsObj;
tmpNestedAssignObj = b();
tmpNestedAssignMemberObj = tmpNestedAssignObj;
tmpNestedAssignObj_1 = c();
tmpNestedAssignMemberObj_1 = tmpNestedAssignObj_1;
tmpNestedAssignObj_2 = d();
tmpNestedAssignMemberObj_2 = tmpNestedAssignObj_2;
tmpNestedAssignMemberRhs_2 = e();
tmpNestedAssignMemberObj_2.x = tmpNestedAssignMemberRhs_2;
tmpNestedAssignMemberRhs_1 = tmpNestedAssignMemberRhs_2;
tmpNestedAssignMemberObj_1.x = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberRhs = tmpNestedAssignMemberRhs_1;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpAssignMemRhs = tmpNestedAssignMemberRhs;
tmpAssignMemLhsObj_2 = tmpAssignMemLhsObj_1;
tmpAssignMemLhsObj_2.x = tmpAssignMemRhs;
$(a, b, c, d, e);
`````

## Result

Should call `$` with:
 - 0: "a"
 - 1: "b"
 - 2: "c"
 - 3: "d"
 - 4: "e"
 - 5: 51,52,53,54,null
 - 6: undefined

Normalized calls: Same

Final output calls: Same
