# Preval test case

# instanceof.md

> Normalize > Binary > Instanceof
>
> Baseline binary expressions to cover ops

#TODO

## Input

`````js filename=intro
$(5 instanceof Infinity);
`````

## Pre Normal


`````js filename=intro
$(5 instanceof Infinity);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 5 instanceof Infinity;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam = 5 instanceof Infinity;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 5 instanceof Infinity;
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not an object ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
