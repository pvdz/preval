# Preval test case

# spread_string.md

> Normalize > Spread > Spread string
>
> Literal operations can be extrapolated and reduced

#TODO

## Input

`````js filename=intro
const x = [..."hello"];
$(x);
`````

## Pre Normal

`````js filename=intro
const x = [...'hello'];
$(x);
`````

## Normalized

`````js filename=intro
const x = ['h', 'e', 'l', 'l', 'o'];
$(x);
`````

## Output

`````js filename=intro
const x = ['h', 'e', 'l', 'l', 'o'];
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['h', 'e', 'l', 'l', 'o']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
