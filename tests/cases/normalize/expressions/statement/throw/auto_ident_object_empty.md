# Preval test case

# auto_ident_object_empty.md

> Normalize > Expressions > Statement > Throw > Auto ident object empty
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
throw {};
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
throw {};
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpThrowArg = {};
throw tmpThrowArg;
`````

## Output


`````js filename=intro
const tmpThrowArg = {};
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = {};
throw a;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ [object Object] ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
