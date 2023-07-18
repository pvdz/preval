# Preval test case

# star.md

> Normalize > Binary > Star
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(5 * 3);
`````

## Pre Normal

`````js filename=intro
$(5 * 3);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 15;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(15);
`````

## PST Output

With rename=true

`````js filename=intro
$( 15 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 15
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
