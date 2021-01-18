# Preval test case

# ident_ident_simple.md

> normalize > assignment > ternary-a > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$( (a = b = c ) ? true : false);
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpArg;
var tmpTernaryTest;
let a = 1;
let b = 2;
let c = 3;
b = c;
tmpNestedComplexRhs = c;
a = tmpNestedComplexRhs;
tmpTernaryTest = tmpNestedComplexRhs;
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
var tmpNestedComplexRhs;
var tmpArg;
var tmpTernaryTest;
let a = 1;
let b = 2;
b = 3;
tmpNestedComplexRhs = 3;
a = tmpNestedComplexRhs;
tmpTernaryTest = tmpNestedComplexRhs;
if (tmpTernaryTest) {
  tmpArg = true;
} else {
  tmpArg = false;
}
$(tmpArg);
$(a, b, 3);
`````

## Result

Should call `$` with:
[[true], [3, 3, 3], null];

Normalized calls: Same

Final output calls: Same
