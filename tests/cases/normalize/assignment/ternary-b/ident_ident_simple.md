# Preval test case

# ident_ident_simple.md

> normalize > assignment > ternary-b > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$($(true) ? (a = b = c) : false);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
var tmpTernaryConsequent;
var tmpTernaryTest;
let a = 1;
let b = 2;
let c = 3;
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  b = c;
  tmpNestedComplexRhs = c;
  a = tmpNestedComplexRhs;
  tmpTernaryConsequent = tmpNestedComplexRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpArg;
var tmpNestedComplexRhs;
var tmpTernaryConsequent;
var tmpTernaryTest;
let a = 1;
let b = 2;
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  b = 3;
  tmpNestedComplexRhs = 3;
  a = tmpNestedComplexRhs;
  tmpTernaryConsequent = tmpNestedComplexRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: 3
 - 2: 3,3,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
