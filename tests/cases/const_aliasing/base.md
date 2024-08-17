# Preval test case

# base.md

> Const aliasing > Base
>
>

## Input

`````js filename=intro
const x = 1;
const y = x;
$(x, y);
`````

## Pre Normal


`````js filename=intro
const x = 1;
const y = x;
$(x, y);
`````

## Normalized


`````js filename=intro
const x = 1;
const y = x;
$(x, y);
`````

## Output


`````js filename=intro
$(1, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
