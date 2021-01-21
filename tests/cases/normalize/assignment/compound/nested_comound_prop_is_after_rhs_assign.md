# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > stmt > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

Test case to demonstrate that `a = b += c` assigns `b+c` to `a`, not just `c`.

#TODO

## Input

`````js filename=intro
let a = 1, b = {x: 2};
a = b.x += 500
$(a, b);
`````

## Normalized

`````js filename=intro
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
tmpBinaryLeft = b.x;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + 500;
b.x = tmpNestedPropCompoundComplexRhs;
a = tmpNestedPropCompoundComplexRhs;
$(a, b);
`````

## Output

`````js filename=intro
var tmpNestedPropCompoundComplexRhs;
var tmpBinaryLeft;
let a = 1;
let b = { x: 2 };
tmpBinaryLeft = b.x;
tmpNestedPropCompoundComplexRhs = tmpBinaryLeft + 500;
b.x = tmpNestedPropCompoundComplexRhs;
a = tmpNestedPropCompoundComplexRhs;
$(a, b);
`````

## Result

Should call `$` with:
 - 0: 502,{"x":502}
 - 1: undefined

Normalized calls: Same

Final output calls: Same
