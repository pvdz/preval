# Preval test case

# ident_computed_member_complex_assign.md

> normalize > assignment > stmt > ident_computed_member_complex_assign
>
> Assignments of all kinds should be normalized in all circumstances

Test case to demonstrate that `a = b += c` assigns `b+c` to `a`, not just `c`.

#TODO

## Input

`````js filename=intro
let a = 1, b = 2;
a = b += 500
$(a, b);
`````

## Normalized

`````js filename=intro
var tmpNestedCompoundComplexRhs;
let a = 1;
let b = 2;
tmpNestedCompoundComplexRhs = b + 500;
b = tmpNestedCompoundComplexRhs;
a = tmpNestedCompoundComplexRhs;
$(a, b);
`````

## Output

`````js filename=intro
var tmpNestedCompoundComplexRhs;
let a = 1;
let b = 2;
tmpNestedCompoundComplexRhs = b + 500;
b = tmpNestedCompoundComplexRhs;
a = tmpNestedCompoundComplexRhs;
$(a, b);
`````

## Result

Should call `$` with:
 - 0: 502,502
 - 1: undefined

Normalized calls: Same

Final output calls: Same
