# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident unary void simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
throw void arg;
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
throw void arg;
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpThrowArg = undefined;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
throw undefined;
`````

## PST Output

With rename=true

`````js filename=intro
throw undefined;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ undefined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
