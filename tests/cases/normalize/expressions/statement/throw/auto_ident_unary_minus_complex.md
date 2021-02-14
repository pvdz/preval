# Preval test case

# auto_ident_unary_minus_complex.md

> normalize > expressions > statement > throw > auto_ident_unary_minus_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw -$(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
const tmpThrowArg = -tmpUnaryArg;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpUnaryArg = $(100);
const tmpThrowArg = -tmpUnaryArg;
throw tmpThrowArg;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ -100 ]>')

Normalized calls: Same

Final output calls: Same
