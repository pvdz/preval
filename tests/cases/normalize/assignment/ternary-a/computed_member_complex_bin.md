# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > ternary-a > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$( ($(a)[$('x')] = b + c ) ? true : false);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpArg;
var tmpTernaryTest;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpNestedAssignObj = $(a);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
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
var tmpNestedAssignObj;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
var tmpArg;
var tmpTernaryTest;
let a = { x: 10 };
tmpNestedAssignObj = $(a);
tmpNestedAssignComMemberObj = tmpNestedAssignObj;
tmpNestedAssignComMemberProp = $('x');
tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
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
 - 0: {"x":5}
 - 1: "x"
 - 2: true
 - 3: {"x":5},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[[{ x: 5 }], ['x'], [true], [{ x: 5 }, 5, 3], null];

