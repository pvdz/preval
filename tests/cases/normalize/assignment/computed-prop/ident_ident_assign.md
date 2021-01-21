# Preval test case

# ident_ident_assign.md

> normalize > assignment > computed-prop > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
let obj = {};
obj[a = b = $(c).y = $(d)] = 1000;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
let obj = {};
{
  tmpAssignComputedObj = obj;
  tmpNestedAssignMemberObj = $(c);
  tmpNestedAssignMemberRhs = $(d);
  tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
  tmpNestedComplexRhs_1 = tmpNestedAssignMemberRhs;
  b = tmpNestedComplexRhs_1;
  tmpNestedComplexRhs = tmpNestedComplexRhs_1;
  a = tmpNestedComplexRhs;
  tmpAssignComputedProp = tmpNestedComplexRhs;
  tmpAssignComputedRhs = 1000;
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
}
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpAssignComputedObj;
var tmpAssignComputedProp;
var tmpAssignComputedRhs;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs_1;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = 1;
let b = 2;
let obj = {};
tmpAssignComputedObj = obj;
tmpNestedAssignMemberObj = $(3);
tmpNestedAssignMemberRhs = $(4);
tmpNestedAssignMemberObj.y = tmpNestedAssignMemberRhs;
tmpNestedComplexRhs_1 = tmpNestedAssignMemberRhs;
b = tmpNestedComplexRhs_1;
tmpNestedComplexRhs = tmpNestedComplexRhs_1;
a = tmpNestedComplexRhs;
tmpAssignComputedProp = tmpNestedComplexRhs;
tmpAssignComputedRhs = 1000;
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3
 - 1: 4
 - 2: 4,4,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
