# Preval test case

# auto_ident_call_complex.md

> normalize > expressions > statement > throw > auto_ident_call_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw $($)(1);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $($);
const tmpThrowArg = tmpCallCallee(1);
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $($);
const tmpThrowArg = tmpCallCallee(1);
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: Same