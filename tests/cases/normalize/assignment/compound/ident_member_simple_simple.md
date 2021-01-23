# Preval test case

# ident_member_simple_simple.md

> normalize > assignment > stmt > ident_member_simple_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2}, c = 3;
a *= b.x += c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
var tmpBinaryLeft;
var tmpNestedPropCompoundComplexRhs;
let a = 1;
let b = { x: 2 };
let c = 3;
tmpBinaryLeft = b.x;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + c;
b.x = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, c);
`````

## Output

`````js filename=intro
var tmpBinaryLeft;
var tmpNestedPropCompoundComplexRhs;
let a = 1;
let b = { x: 2 };
tmpBinaryLeft = b.x;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + 3;
b.x = tmpNestedPropCompoundComplexRhs;
a = a * tmpNestedPropCompoundComplexRhs;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 5,{"x":5},3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
