# Preval test case

# zero.md

> Normalize > Unary > Inv > Zero
>
> Inverting literals should be statically resolved

## Input

`````js filename=intro
$(!0);
`````

## Pre Normal


`````js filename=intro
$(!0);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = true;
tmpCallCallee(tmpCalleeParam);
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
