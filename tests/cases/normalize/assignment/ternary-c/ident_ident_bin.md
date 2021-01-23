# Preval test case

# ident_ident_bin.md

> normalize > assignment > ternary-c > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3, d = 4;
$($(false) ? true : (a = b = c + d));
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpArg;
var tmpTernaryTest;
var tmpTernaryAlternate;
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
let a = 1;
let b = 2;
let c = 3;
let d = 4;
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpNestedComplexRhs$1 = c + d;
  b = tmpNestedComplexRhs$1;
  tmpNestedComplexRhs = tmpNestedComplexRhs$1;
  a = tmpNestedComplexRhs;
  tmpTernaryAlternate = tmpNestedComplexRhs;
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
var tmpNestedComplexRhs;
var tmpNestedComplexRhs$1;
let a = 1;
let b = 2;
tmpTernaryTest = $(false);
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpNestedComplexRhs$1 = 7;
  b = tmpNestedComplexRhs$1;
  tmpNestedComplexRhs = tmpNestedComplexRhs$1;
  a = tmpNestedComplexRhs;
  tmpTernaryAlternate = tmpNestedComplexRhs;
  tmpArg = tmpTernaryAlternate;
}
$(tmpArg);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: false
 - 1: 7
 - 2: 7,7,3
 - 3: undefined

Normalized calls: Same

Final output calls: BAD!!
[[false], [7], [7, 7, 7], null];

