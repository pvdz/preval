# Preval test case

# static_computed_property.md

> Normalize > Unary > Delete > Static computed property
>
> The property be normalized

## Input

`````js filename=intro
const obj = {x: 1};
delete obj['x'];
`````

## Pre Normal


`````js filename=intro
const obj = { x: 1 };
delete obj[`x`];
`````

## Normalized


`````js filename=intro
const obj = { x: 1 };
delete obj.x;
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
