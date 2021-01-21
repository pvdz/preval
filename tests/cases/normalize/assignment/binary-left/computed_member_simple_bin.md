# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > binary-left > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$((a[$('x')] = b + c) + 500);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignCompMemberObj = a;
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberRhs = b + c;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpBinaryLeft = tmpNestedAssignCompMemberRhs;
tmpArg = tmpBinaryLeft + 500;
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpBinaryLeft;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = { x: 10 };
tmpNestedAssignCompMemberObj = a;
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberRhs = 5;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpBinaryLeft = tmpNestedAssignCompMemberRhs;
tmpArg = tmpBinaryLeft + 500;
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: 505
 - 2: {"x":10,"undefined":5},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[['x'], [505], [{ x: 10, undefined: 5 }, 5, 3], null];

