# Preval test case

# computed_member_complex_bin.md

> normalize > assignment > ternary-c > computed_member_complex_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = {x: 10}, b = 2, c = 3;
$($(false) ? true : ($(a)[$('x')] = b + c));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
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
  tmpNestedAssignCompMemberObj = $(a);
  tmpNestedAssignCompMemberProp = $('x');
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
var tmpNestedAssignCompMemberObj;
var tmpNestedAssignCompMemberProp;
var tmpNestedAssignCompMemberRhs;
let a = { x: 10 };
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpNestedAssignCompMemberObj = $(a);
  tmpNestedAssignCompMemberProp = $('x');
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
 - 1: {"x":5}
 - 2: "x"
 - 3: 5
 - 4: {"x":5},2,3
 - 5: undefined

Normalized calls: Same

Final output calls: BAD!!
[[false], [{ x: 5 }], ['x'], [5], [{ x: 5 }, 5, 3], null];

