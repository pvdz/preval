# Preval test case

# auto_ident_unary_void_complex.md

> normalize > expressions > statement > throw > auto_ident_unary_void_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw void $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
let tmpThrowArg = undefined;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100);
let tmpThrowArg = undefined;
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - 1: 100
 - eval returned: ('<crash[ undefined ]>')

Normalized calls: Same

Final output calls: Same
