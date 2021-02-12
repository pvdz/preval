# Preval test case

# auto_ident_unary_void_complex.md

> normalize > expressions > assignments > if > auto_ident_unary_void_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((a = void $(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest;
$(100);
const tmpNestedComplexRhs = undefined;
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest;
$(100);
const tmpNestedComplexRhs = undefined;
a = tmpNestedComplexRhs;
tmpIfTest = tmpNestedComplexRhs;
$(a);
`````

## Result

Should call `$` with:
 - 1: 100
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
