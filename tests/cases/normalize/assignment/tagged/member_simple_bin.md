# Preval test case

# member_simple_bin.md

> normalize > assignment > tagged > member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$`abc ${a.x = b + c} def`
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpArg = ['abc ', ' def'];
tmpNestedAssignMemberObj = a;
tmpNestedAssignMemberRhs = b + c;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpArg_1 = tmpNestedAssignMemberRhs;
$(tmpArg, tmpArg_1);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg_1;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
let a = { x: 10 };
tmpArg = ['abc ', ' def'];
tmpNestedAssignMemberObj = a;
tmpNestedAssignMemberRhs = 5;
tmpNestedAssignMemberObj.x = tmpNestedAssignMemberRhs;
tmpArg_1 = tmpNestedAssignMemberRhs;
$(tmpArg, tmpArg_1);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: ["abc "," def"],5
 - 1: {"x":5},2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[['abc ', ' def'], 5], [{ x: 5 }, 5, 3], null];

