# Preval test case

# ident_ident_assign.md

> normalize > assignment > stmt > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

Double compound computed prop assignment with all parts complex

#TODO

## Input

`````js filename=intro
let 
    a = {
      get x() { $('a.x.get'); return 3; },
      set x(z) { $('a.x.get', z); },
    }, 
    b = {
      get x() { $('b.x.get'); return 7; },
      set x(z) { $('b.x.get', z); },
    },
    c = {
      get x() { $('c.x.get'); return 11; },
      set x(z) { $('c.x.get', z); },
    } 

$(a, 'a()')[$('x', 'a')] += $(b, 'b()')[$('x', 'b')] += $(c, 'c()')[$('x', 'c')];


$('final:', a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpCompoundAssignLhs;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj_1;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft_1;
var tmpBinaryRight_1;
var tmpMemberComplexObj;
var tmpComputedObj;
var tmpComputedProp;
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
tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
tmpAssignComMemLhsProp = $('x', 'a');
tmpCompoundAssignLhs = tmpAssignComMemLhsObj[tmpAssignComMemLhsProp];
tmpAssignComputedObj = tmpAssignComMemLhsObj;
tmpAssignComputedProp = tmpAssignComMemLhsProp;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpNestedAssignObj = $(b, 'b()');
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x', 'b');
tmpBinaryLeft_1 = tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp];
tmpMemberComplexObj = $(c, 'c()');
tmpComputedObj = tmpMemberComplexObj;
tmpComputedProp = $('x', 'c');
tmpBinaryRight_1 = tmpComputedObj[tmpComputedProp];
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft_1 + tmpBinaryRight_1;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropCompoundComplexRhs;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs;
tmpAssignComputedRhs = tmpBinaryLeft + tmpBinaryRight;
tmpAssignMemLhsObj_1 = tmpAssignComputedObj;
tmpAssignMemLhsObj_1[tmpAssignComputedProp] = tmpAssignComputedRhs;
$('final:', a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignMemLhsObj;
var tmpAssignComMemLhsObj;
var tmpAssignComMemLhsProp;
var tmpCompoundAssignLhs;
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpAssignMemLhsObj_1;
var tmpBinaryLeft;
var tmpBinaryRight;
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft_1;
var tmpBinaryRight_1;
var tmpMemberComplexObj;
var tmpComputedObj;
var tmpComputedProp;
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
tmpAssignComMemLhsObj = tmpAssignMemLhsObj;
tmpAssignComMemLhsProp = $('x', 'a');
tmpCompoundAssignLhs = tmpAssignComMemLhsObj[tmpAssignComMemLhsProp];
tmpAssignComputedObj = tmpAssignComMemLhsObj;
tmpAssignComputedProp = tmpAssignComMemLhsProp;
tmpBinaryLeft = tmpCompoundAssignLhs;
tmpNestedAssignObj = $(b, 'b()');
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x', 'b');
tmpBinaryLeft_1 = tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp];
tmpMemberComplexObj = $(c, 'c()');
tmpComputedObj = tmpMemberComplexObj;
tmpComputedProp = $('x', 'c');
tmpBinaryRight_1 = tmpComputedObj[tmpComputedProp];
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft_1 + tmpBinaryRight_1;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropCompoundComplexRhs;
tmpBinaryRight = tmpNestedPropCompoundComplexRhs;
tmpAssignComputedRhs = tmpBinaryLeft + tmpBinaryRight;
tmpAssignMemLhsObj_1 = tmpAssignComputedObj;
tmpAssignMemLhsObj_1[tmpAssignComputedProp] = tmpAssignComputedRhs;
$('final:', a, b, c);
`````

## Result

Should call `$` with:
 - 0: {"x":3},"a()"
 - 1: "x","a"
 - 2: "a.x.get"
 - 3: {"x":7},"b()"
 - 4: "x","b"
 - 5: "b.x.get"
 - 6: {"x":11},"c()"
 - 7: "x","c"
 - 8: "c.x.get"
 - 9: "b.x.get",18
 - 10: "a.x.get",21
 - 11: "final:",{"x":3},{"x":7},{"x":11}
 - 12: undefined

Normalized calls: Same

Final output calls: Same
