# Preval test case

# mem_static_computed_prop_lhs.md

> Normalize > Member access > Mem static computed prop lhs
>
> assigning to member expression where the lhs is a computed member expression with a static property

## Input

`````js filename=intro
const obj = {x: 1};
obj['x'] = 2;
$(obj);
`````

## Pre Normal


`````js filename=intro
const obj = { x: 1 };
obj[`x`] = 2;
$(obj);
`````

## Normalized


`````js filename=intro
const obj = { x: 2 };
$(obj);
`````

## Output


`````js filename=intro
const obj = { x: 2 };
$(obj);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { x: 2 };
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
