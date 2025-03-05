# Preval test case

# one.md

> Normalize > Unary > Inv > One
>
> Inverting literals should be statically resolved

## Input

`````js filename=intro
$(!1);
`````

## Pre Normal


`````js filename=intro
$(!1);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = false;
$(tmpCalleeParam);
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
