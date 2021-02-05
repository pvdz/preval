# Preval test case

# auto_ident_delete_prop_complex.md

> normalize > expressions > assignments > if > auto_ident_delete_prop_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = { y: 1 };

let a = { a: 999, b: 1000 };
if ((a = delete $(x).y));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpDeleteObj = $(x);
const tmpNestedComplexRhs = delete tmpDeleteObj.y;
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
tmpIfTest;
$(a, x);
`````

## Output

`````js filename=intro
let x = { y: 1 };
let a = { a: 999, b: 1000 };
let tmpIfTest;
const tmpDeleteObj = $(x);
const tmpNestedComplexRhs = delete tmpDeleteObj.y;
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
$(a, x);
`````

## Result

Should call `$` with:
 - 1: { y: '1' }
 - 2: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
