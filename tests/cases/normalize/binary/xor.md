# Preval test case

# xor.md

> Normalize > Binary > Xor
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(5 ^ 3);
`````

## Pre Normal


`````js filename=intro
$(5 ^ 3);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 6;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(6);
`````

## PST Output

With rename=true

`````js filename=intro
$( 6 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
