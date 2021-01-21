# Preval test case

# ident_ident_bin.md

> normalize > assignment > stmt > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 10, b = 2, c = 3, d = 4;
a *= b += c + d;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedComplexRhs;
var tmpNestedCompoundComplexRhs;
let a = 10;
let b = 2;
let c = 3;
let d = 4;
tmpNestedComplexRhs = c + d;
tmpNestedCompoundComplexRhs = b + tmpNestedComplexRhs;
b = tmpNestedCompoundComplexRhs;
a = a * tmpNestedCompoundComplexRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedComplexRhs;
var tmpNestedCompoundComplexRhs;
let a = 10;
let b = 2;
tmpNestedComplexRhs = 7;
tmpNestedCompoundComplexRhs = b + tmpNestedComplexRhs;
b = tmpNestedCompoundComplexRhs;
a = a * tmpNestedCompoundComplexRhs;
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: 90,9,3
 - 1: undefined

Normalized calls: Same

Final output calls: BAD!!
[[90, 9, 7], null];

