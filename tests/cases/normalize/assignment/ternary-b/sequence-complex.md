# Preval test case

# sequence-complex.md

> normalize > assignment > stmt > sequence-complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$($(true) ? ((a, $(b)).c = d) : false);
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  a;
  tmpNestedAssignObj = $(b);
  tmpNestedAssignObj.c = d;
  tmpTernaryConsequent = d;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  tmpNestedAssignObj = $(b);
  tmpNestedAssignObj.c = 3;
  tmpTernaryConsequent = 3;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
[[true], [false], '<crash[ <ref> is not defined ]>'];

Normalized calls: Same

Final output calls: Same
