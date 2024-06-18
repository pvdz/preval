# Preval test case

# tilde_minus_1.md

> Normalize > Binary > Tilde minus 1
>
> This wasn't getting normalized...

## Input

`````js filename=intro
~-0x1;
$(~-0x1);
`````

## Pre Normal


`````js filename=intro
~-1;
$(~-1);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 0;
tmpCallCallee(tmpCalleeParam);
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
