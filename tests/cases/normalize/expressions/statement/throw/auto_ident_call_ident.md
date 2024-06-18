# Preval test case

# auto_ident_call_ident.md

> Normalize > Expressions > Statement > Throw > Auto ident call ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw $(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw $(1);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpThrowArg = $(1);
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const tmpThrowArg = $(1);
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
