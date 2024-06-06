# Preval test case

# auto_ident_new_ident.md

> Normalize > Expressions > Statement > Throw > Auto ident new ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw new $(1);
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw new $(1);
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpThrowArg = new $(1);
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const tmpThrowArg = new $(1);
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = new $( 1 );
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ [object Object] ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
