# Preval test case

# minus_builtin.md

> Constants > Minus builtin
>
> Negative Infinity should be treated as a constant as well

## Input

`````js filename=intro
const x = -Infinity;
const y = x;
$(y); // Should be inlined to -5
`````

## Pre Normal


`````js filename=intro
const x = -Infinity;
const y = x;
$(y);
`````

## Normalized


`````js filename=intro
const x = -Infinity;
const y = x;
$(y);
`````

## Output


`````js filename=intro
$(-Infinity);
`````

## PST Output

With rename=true

`````js filename=intro
$( -Infinity );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -Infinity
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
