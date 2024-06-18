# Preval test case

# stmt_hoisted.md

> Normalize > Identifier > Stmt hoisted
>
> Hoisted global statement should be eliminated

## Input

`````js filename=intro
x;
var x = 10;
`````

## Pre Normal


`````js filename=intro
let x = undefined;
null;
x = 10;
`````

## Normalized


`````js filename=intro
let x = undefined;
x = 10;
`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
