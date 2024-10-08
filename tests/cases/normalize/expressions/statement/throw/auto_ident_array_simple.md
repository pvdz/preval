# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Statement > Throw > Auto ident array simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw [1, 2, 3];
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw [1, 2, 3];
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpThrowArg = [1, 2, 3];
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const tmpThrowArg /*:array*/ = [1, 2, 3];
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ 1,2,3 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
