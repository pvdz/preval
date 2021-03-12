# Preval test case

# auto_ident_unary_plus_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident unary plus simple
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

## Pre Normal

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
throw 1;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
