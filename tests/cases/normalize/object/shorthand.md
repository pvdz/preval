# Preval test case

# shorthand.md

> Normalize > Object > Shorthand
>
> Shorthand should normalize to a regular property

## Input

`````js filename=intro
const x = 10;
const obj = {x};
$(obj);
`````

## Pre Normal


`````js filename=intro
const x = 10;
const obj = { x: x };
$(obj);
`````

## Normalized


`````js filename=intro
const x = 10;
const obj = { x: x };
$(obj);
`````

## Output


`````js filename=intro
const obj /*:object*/ = { x: 10 };
$(obj);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 10 };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '10' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
