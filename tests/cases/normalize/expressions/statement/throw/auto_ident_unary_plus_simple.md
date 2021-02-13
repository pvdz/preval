# Preval test case

# auto_ident_unary_plus_simple.md

> normalize > expressions > statement > throw > auto_ident_unary_plus_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
throw +arg;
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpThrowArg = +arg;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpThrowArg = +arg;
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ 1 ]>')

Normalized calls: Same

Final output calls: Same
