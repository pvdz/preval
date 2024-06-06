# Preval test case

# tilde_minus_expr_stmt.md

> Type tracked > Tilde minus expr stmt
>
> Something that caught my eye

#TODO

## Input

`````js filename=intro
const x = ~-0x4;
x >> NaN;
$('finished');
`````

## Pre Normal


`````js filename=intro
const x = ~-4;
x >> NaN;
$(`finished`);
`````

## Normalized


`````js filename=intro
const x = 3;
x >> 0;
$(`finished`);
`````

## Output


`````js filename=intro
$(`finished`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "finished" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'finished'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
