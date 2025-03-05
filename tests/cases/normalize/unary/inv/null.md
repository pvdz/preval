# Preval test case

# null.md

> Normalize > Unary > Inv > Null
>
> Inverting literals should be statically resolved

## Input

`````js filename=intro
$(!null);
`````

## Pre Normal


`````js filename=intro
$(!null);
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
