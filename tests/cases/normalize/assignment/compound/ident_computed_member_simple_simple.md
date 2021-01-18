# Preval test case

# ident_computed_member_simple_simple.md

> normalize > assignment > stmt > ident_computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
a *= b[$('x')] += c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpAssignMemLhsObj = tmpNestedAssignComMemberObj;
tmpBinaryLeft = tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp];
tmpAssignMemRhs = tmpBinaryLeft + c;
tmpAssignMemLhsObj[tmpNestedAssignComMemberProp] = tmpAssignMemRhs;
a = a * c;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpAssignMemLhsObj;
var tmpAssignMemRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
tmpNestedAssignComMemberObj = b;
tmpNestedAssignComMemberProp = $('x');
tmpAssignMemLhsObj = tmpNestedAssignComMemberObj;
tmpBinaryLeft = tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp];
tmpAssignMemRhs = tmpBinaryLeft + 3;
tmpAssignMemLhsObj[tmpNestedAssignComMemberProp] = tmpAssignMemRhs;
a = a * 3;
$(a, b, 3);
`````

## Result

Should call `$` with:
[['x'], [null, { x: 2, undefined: null }, 3], null];

Normalized calls: BAD?!
[['x'], [3, { x: 2, undefined: null }, 3], null];

Final output calls: BAD!!
[['x'], [3, { x: 2, undefined: null }, 3], null];

