# Preval test case

# auto_ident_unary_plus_complex.md

> normalize > expressions > assignments > throw > auto_ident_unary_plus_complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw (a = +$(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = +tmpUnaryArg;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
a = +tmpUnaryArg;
let tmpThrowArg = a;
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ 100 ]>')

Normalized calls: Same

Final output calls: Same