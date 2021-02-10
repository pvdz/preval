# Preval test case

# auto_ident_upd_pi_simple.md

> normalize > expressions > assignments > if > auto_ident_upd_pi_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
if ((a = ++b));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
let tmpIfTest;
let tmpNestedComplexRhs;
const tmpNestedCompoundLhs = b;
const tmpNestedComplexRhs$1 = tmpNestedCompoundLhs + 1;
b = tmpNestedComplexRhs$1;
tmpNestedComplexRhs = tmpNestedComplexRhs$1;
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
$(a, b);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
