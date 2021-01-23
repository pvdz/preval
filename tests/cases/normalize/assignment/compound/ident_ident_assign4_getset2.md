# Preval test case

# ident_ident_assign.md

> normalize > assignment > stmt > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

Double compound regular prop assignment with all parts complex

#TODO

## Input

`````js filename=intro
let a = {
  get x() { $('a.x.get'); return 3; },
  set x(z) { $('a.x.get', z); },
};
let b = {
  get x() { $('b.x.get'); return 7; },
  set x(z) { $('b.x.get', z); },
};
let c = {
  get x() { $('c.x.get'); return 11; },
  set x(z) { $('c.x.get', z); },
};

$(a, 'a()').x += $(b, 'b()').x += $(c, 'c()').x;

$('final:', a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpCompoundAssignLhs;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj$2;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft$1;
var tmpBinaryRight$1;
var tmpMemberComplexObj;
let a = {
  get x() {
    $('a.x.get');
    return 3;
  },
  set x(z) {
    $('a.x.get', z);
  },
};
let b = {
  get x() {
    $('b.x.get');
    return 7;
  },
  set x(z_1) {
    $('b.x.get', z_1);
  },
};
let c = {
  get x() {
    $('c.x.get');
    return 11;
  },
  set x(z_2) {
    $('c.x.get', z_2);
  },
};
tmpAssignMemLhsObj = $(a, 'a()');
tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpNestedAssignObj = $(b, 'b()');
tmpBinaryLeft$1 = tmpNestedAssignObj.x;
tmpMemberComplexObj = $(c, 'c()');
tmpBinaryRight$1 = tmpMemberComplexObj.x;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft$1 + tmpBinaryRight$1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs;
tmpAssignMemRhs = tmpBinaryLeft + tmpBinaryRight;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
$('final:', a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpCompoundAssignLhs;
var tmpAssignMemLhsObj$1;
var tmpAssignMemRhs;
var tmpAssignMemLhsObj$2;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft$1;
var tmpBinaryRight$1;
var tmpMemberComplexObj;
let a = {
  get x() {
    $('a.x.get');
    return 3;
  },
  set x(z) {
    $('a.x.get', z);
  },
};
let b = {
  get x() {
    $('b.x.get');
    return 7;
  },
  set x(z_1) {
    $('b.x.get', z_1);
  },
};
let c = {
  get x() {
    $('c.x.get');
    return 11;
  },
  set x(z_2) {
    $('c.x.get', z_2);
  },
};
tmpAssignMemLhsObj = $(a, 'a()');
tmpCompoundAssignLhs = tmpAssignMemLhsObj.x;
tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpNestedAssignObj = $(b, 'b()');
tmpBinaryLeft$1 = tmpNestedAssignObj.x;
tmpMemberComplexObj = $(c, 'c()');
tmpBinaryRight$1 = tmpMemberComplexObj.x;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft$1 + tmpBinaryRight$1;
tmpNestedAssignObj.x = tmpNestedPropCompoundComplexRhs;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs;
tmpAssignMemRhs = tmpBinaryLeft + tmpBinaryRight;
tmpAssignMemLhsObj$2 = tmpAssignMemLhsObj$1;
tmpAssignMemLhsObj$2.x = tmpAssignMemRhs;
$('final:', a, b, c);
`````

## Result

Should call `$` with:
 - 0: {"x":3},"a()"
 - 1: "a.x.get"
 - 2: {"x":7},"b()"
 - 3: "b.x.get"
 - 4: {"x":11},"c()"
 - 5: "c.x.get"
 - 6: "b.x.get",18
 - 7: "a.x.get",21
 - 8: "final:",{"x":3},{"x":7},{"x":11}
 - 9: undefined

Normalized calls: Same

Final output calls: Same
