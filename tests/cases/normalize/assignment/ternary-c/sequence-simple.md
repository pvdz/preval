# Preval test case

# sequence-simple.md

> normalize > assignment > ternary-c > sequence-simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {c: 2}, d = 3;
$($(false) ? true : ((a, b).c = d));
$(a, b, c, d);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpNestedAssignObj;
let a = 1;
let b = { c: 2 };
let d = 3;
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  a;
  tmpNestedAssignObj = b;
  tmpNestedAssignObj.c = d;
  tmpTernaryAlternate = d;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(a, b, c, d);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpNestedAssignObj;
let b = { c: 2 };
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpNestedAssignObj = b;
  tmpNestedAssignObj.c = 3;
  tmpTernaryAlternate = 3;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(1, b, c, 3);
`````

## Result

Should call `$` with:
 - 0: false
 - 1: 3
 - 2: <crash[ <ref> is not defined ]>

Normalized calls: Same

Final output calls: Same