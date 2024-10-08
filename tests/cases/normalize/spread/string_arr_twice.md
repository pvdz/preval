# Preval test case

# string_arr_twice.md

> Normalize > Spread > String arr twice
>
> Literal operations can be extrapolated and reduced

## Input

`````js filename=intro
const x = [..."hello", ..."world"];
$(x);
`````

## Pre Normal


`````js filename=intro
const x = [...`hello`, ...`world`];
$(x);
`````

## Normalized


`````js filename=intro
const x = [`h`, `e`, `l`, `l`, `o`, `w`, `o`, `r`, `l`, `d`];
$(x);
`````

## Output


`````js filename=intro
const x /*:array*/ = [`h`, `e`, `l`, `l`, `o`, `w`, `o`, `r`, `l`, `d`];
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "h", "e", "l", "l", "o", "w", "o", "r", "l", "d" ];
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
