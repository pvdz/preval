# Preval test case

# ident_ident_bin.md

> normalize > assignment > ternary-b > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
$($(true) ? (a = b = c + d) : false);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  tmpNestedComplexRhs$1 = c + d;
  b = tmpNestedComplexRhs$1;
  tmpNestedComplexRhs = tmpNestedComplexRhs$1;
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
var tmpTernaryTest;
var tmpTernaryConsequent;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
let a = 1;
let b = 2;
tmpTernaryTest = $(true);
if (tmpTernaryTest) {
  tmpNestedComplexRhs$1 = 7;
  b = tmpNestedComplexRhs$1;
  tmpNestedComplexRhs = tmpNestedComplexRhs$1;
  a = tmpNestedComplexRhs;
  tmpTernaryConsequent = tmpNestedComplexRhs;
  tmpArg = tmpTernaryConsequent;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: true
 - 1: 7
 - 2: 7,7,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[true], [7], [7, 7, 7], null];

