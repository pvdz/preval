# Preval test case

# prefix_minus.md

> Normalize > Update > Prefix minus
>
> Update expressions should be transformed to regular binary expression assignments

## Input

`````js filename=intro
let x = 1;
$(--x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
$(--x);
`````

## Normalized


`````js filename=intro
let x = 1;
x = x - 1;
let tmpCalleeParam = x;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(0);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
