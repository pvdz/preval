# Preval test case

# in.md

> Normalize > Binary > In
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(5 in Infinity);
`````

## Pre Normal

`````js filename=intro
$(5 in Infinity);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 5 in Infinity;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = 5 in Infinity;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 5 in Infinity;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '5' in Infinity ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
