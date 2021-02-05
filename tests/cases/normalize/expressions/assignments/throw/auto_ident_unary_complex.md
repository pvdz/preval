# Preval test case

# auto_ident_unary_complex.md

> normalize > expressions > assignments > throw > auto_ident_unary_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
throw (a = typeof $(x));
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpUnaryArg = $(x);
const tmpNestedComplexRhs = typeof tmpUnaryArg;
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a, x);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpThrowArg;
const tmpUnaryArg = $(1);
const tmpNestedComplexRhs = typeof tmpUnaryArg;
a = tmpNestedComplexRhs;
tmpThrowArg = tmpNestedComplexRhs;
throw tmpThrowArg;
$(a, 1);
`````

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ number ]>')

Normalized calls: Same

Final output calls: Same
