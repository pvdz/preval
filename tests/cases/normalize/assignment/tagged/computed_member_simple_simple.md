# Preval test case

# computed_member_simple_simple.md

> normalize > assignment > tagged > computed_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$`abc ${a[$('x')] = b} def`
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpArg$1;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpArg = ['abc ', ' def'];
tmpNestedAssignComMemberObj = a;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = b;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpArg$1 = tmpNestedPropAssignRhs;
$(tmpArg, tmpArg$1);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpArg$1;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedPropAssignRhs;
let a = { x: 10 };
tmpArg = ['abc ', ' def'];
tmpNestedAssignComMemberObj = a;
tmpNestedAssignComMemberProp = $('x');
tmpNestedPropAssignRhs = 2;
tmpNestedAssignComMemberObj[tmpNestedAssignComMemberProp] = tmpNestedPropAssignRhs;
tmpArg$1 = tmpNestedPropAssignRhs;
$(tmpArg, tmpArg$1);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: ["abc "," def"],2
 - 2: {"x":2},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
