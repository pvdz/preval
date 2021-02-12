# Preval test case

# auto_ident_unary_tilde_simple.md

> normalize > expressions > statement > throw > auto_ident_unary_tilde_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
throw ~x;
$(a);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpThrowArg = ~x;
throw tmpThrowArg;
`````

## Output

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
let tmpThrowArg = ~x;
throw tmpThrowArg;
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ -2 ]>')

Normalized calls: Same

Final output calls: Same
