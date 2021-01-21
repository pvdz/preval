# Preval test case

# ident_member_simple_bin.md

> normalize > assignment > stmt > ident_member_simple_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3, d = 4;
a *= b.x += c + d;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
let a = 1;
let b = { x: 2 };
let c = 3;
let d = 4;
tmpBinaryLeft = b.x;
tmpBinaryRight = c + d;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + tmpBinaryRight;
b.x = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
var tmpBinaryRight;
let a = 1;
let b = { x: 2 };
tmpBinaryLeft = b.x;
tmpBinaryRight = 7;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + tmpBinaryRight;
b.x = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: 9,{"x":9},3
 - 1: undefined

Normalized calls: Same

Final output calls: BAD!!
[[9, { x: 9 }, 7], null];

