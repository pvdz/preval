# Preval test case

# ident_bin.md

> normalize > assignment > ternary-a > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
$( (a = b + c ) ? true : false);
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
tmpNestedComplexRhs = b + c;
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
tmpNestedComplexRhs = 5;
a = tmpNestedComplexRhs;
tmpTernaryTest = tmpNestedComplexRhs;
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
 - 0: true
 - 1: 5,2,3
 - 2: undefined

Normalized calls: Same

Final output calls: BAD!!
[[true], [5, 5, 3], null];

