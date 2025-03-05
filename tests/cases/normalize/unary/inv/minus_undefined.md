# Preval test case

# minus_undefined.md

> Normalize > Unary > Inv > Minus undefined
>
> Inverting literals should be statically resolved

## Input

`````js filename=intro
$(!-undefined);
`````

## Pre Normal


`````js filename=intro
$(!-undefined);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = true;
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(true);
`````

## PST Output

With rename=true

`````js filename=intro
$( true );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
