# Preval test case

# minus_one.md

> Normalize > Unary > Inv > Minus one
>
> Inverting literals should be statically resolved

## Input

`````js filename=intro
$(!-1);
`````

## Pre Normal


`````js filename=intro
$(!-1);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = false;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(false);
`````

## PST Output

With rename=true

`````js filename=intro
$( false );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
