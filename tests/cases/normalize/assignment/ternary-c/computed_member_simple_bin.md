# Preval test case

# computed_member_simple_bin.md

> normalize > assignment > ternary-c > computed_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(false) ? true : (a[$('x')] = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = { x: 10 };
let b = 2;
let c = 3;
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpNestedAssignComMemberObj = a;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
  tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
  tmpNestedAssignCompMemberRhs = b + c;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  tmpTernaryAlternate = tmpNestedAssignCompMemberRhs;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpNestedAssignComMemberObj;
var tmpNestedAssignComMemberProp;
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = { x: 10 };
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpNestedAssignComMemberObj = a;
  tmpNestedAssignComMemberProp = $('x');
  tmpNestedAssignCompMemberObj = tmpNestedAssignComMemberObj;
  tmpNestedAssignCompMemberProp = tmpNestedAssignComMemberProp;
  tmpNestedAssignCompMemberRhs = 5;
  tmpNestedAssignCompMemberObj[tmpNestedAssignCompMemberProp] = tmpNestedAssignCompMemberRhs;
  tmpTernaryAlternate = tmpNestedAssignCompMemberRhs;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(a, 5, 3);
`````

## Result

Should call `$` with:
 - 0: false
 - 1: "x"
 - 2: 5
 - 3: {"x":5},2,3
 - 4: undefined

Normalized calls: Same

Final output calls: BAD!!
[[false], ['x'], [5], [{ x: 5 }, 5, 3], null];

