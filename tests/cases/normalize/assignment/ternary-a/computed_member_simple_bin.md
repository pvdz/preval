# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > ternary-a > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$( (a[$('x')] = b + c ) ? true : false);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpArg;
var tmpTernaryTest;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignCompMemberObj = a;
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberRhs = b + c;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpTernaryTest = tmpNestedAssignCompMemberRhs;
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpArg;
var tmpTernaryTest;
let a = { x: 10 };
tmpNestedAssignCompMemberObj = a;
tmpNestedAssignCompMemberProp = $('x');
tmpNestedAssignCompMemberRhs = 5;
tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
tmpTernaryTest = tmpNestedAssignCompMemberRhs;
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: "x"
 - 1: true
 - 2: {"x":10,"undefined":5},2,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[['x'], [true], [{ x: 10, undefined: 5 }, 5, 3], null];

