# Preval test case

# auto_ident_unary_void_simple.md

> normalize > expressions > statement > throw > auto_ident_unary_void_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
throw void x;
$(a);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
const tmpThrowArg = undefined;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
throw undefined;
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ undefined ]>')

Normalized calls: Same

Final output calls: Same
