# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident upd mi simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
throw --b;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
throw --b;
$(a, b);
`````

## Normalized


`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = b - 1;
let tmpThrowArg = b;
throw tmpThrowArg;
`````

## Output


`````js filename=intro
throw 0;
`````

## PST Output

With rename=true

`````js filename=intro
throw 0;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ 0 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
