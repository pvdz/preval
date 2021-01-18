# Preval test case

# ident_computed_member_simple_bin.md

> normalize > assignment > stmt > ident_computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
a *= b[$('x')] *= c + d;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpNestedAssignCompMemberObj = b;
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberRhs = c + d;
tmpAssignMemLhsObj = tmpNestedAssignCompMemberObj;
tmpBinaryLeft = tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp];
tmpAssignMemRhs = tmpBinaryLeft * tmpNestedAssignCompMemberRhs;
tmpAssignMemLhsObj[tmpNestedAssignCompMemberProp] = tmpAssignMemRhs;
a = a * tmpNestedAssignCompMemberRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
tmpNestedAssignCompMemberObj = b;
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberRhs = 7;
tmpAssignMemLhsObj = tmpNestedAssignCompMemberObj;
tmpBinaryLeft = tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp];
tmpAssignMemRhs = tmpBinaryLeft * tmpNestedAssignCompMemberRhs;
tmpAssignMemLhsObj[tmpNestedAssignCompMemberProp] = tmpAssignMemRhs;
a = a * tmpNestedAssignCompMemberRhs;
$(a, b, 7);
`````

## Result

Should call `$` with:
[['x'], [null, { x: 2, undefined: null }, 3], null];

Normalized calls: BAD?!
[['x'], [7, { x: 2, undefined: null }, 3], null];

Final output calls: BAD!!
[['x'], [7, { x: 2, undefined: null }, 7], null];

