# Preval test case

# sequence-complex-sequence-complex.md

> normalize > assignment > do-while > sequence-complex-sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, c = 'unused', d = 3;
let n = 0;
do { if ($(n++)) break; } while ((a, $(b)).c = (a, $(b)).c = d);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedPropAssignRhs;
let a = 1;
let b = { c: 2 };
let c = 'unused';
let d = 3;
let n = 0;
do {
  {
    tmpPostfixArg = n;
    n = n + 1;
    tmpArg = tmpPostfixArg;
    let ifTestTmp_1 = $(tmpArg);
    if (ifTestTmp_1) {
      break;
    }
  }
  a;
  tmpNestedAssignObj = $(b);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  a;
  tmpNestedAssignObj_1 = $(b);
  tmpNestedPropAssignRhs = d;
  tmpNestedAssignObj_1.c = tmpNestedPropAssignRhs;
  tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
  tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
  ifTestTmp = tmpNestedAssignMemberRhs;
} while (ifTestTmp);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var ifTestTmp;
var tmpArg;
var tmpPostfixArg;
var tmpNestedAssignObj;
var tmpNestedAssignMemberObj;
var tmpNestedAssignMemberRhs;
var tmpNestedAssignObj_1;
var tmpNestedPropAssignRhs;
let b = { c: 2 };
let n = 0;
do {
  tmpPostfixArg = n;
  n = n + 1;
  tmpArg = tmpPostfixArg;
  let ifTestTmp_1 = $(tmpArg);
  if (ifTestTmp_1) {
    break;
  }
  tmpNestedAssignObj = $(b);
  tmpNestedAssignMemberObj = tmpNestedAssignObj;
  tmpNestedAssignObj_1 = $(b);
  tmpNestedPropAssignRhs = 3;
  tmpNestedAssignObj_1.c = tmpNestedPropAssignRhs;
  tmpNestedAssignMemberRhs = tmpNestedPropAssignRhs;
  tmpNestedAssignMemberObj.c = tmpNestedAssignMemberRhs;
  ifTestTmp = tmpNestedAssignMemberRhs;
} while (ifTestTmp);
$(1, b, 'unused', 3);
`````

## Result

Should call `$` with:
 - 0: 0
 - 1: {"c":3}
 - 2: {"c":3}
 - 3: 1
 - 4: 1,{"c":3},"unused",3
 - 5: undefined

Normalized calls: Same

Final output calls: Same
