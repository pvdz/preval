# Preval test case

# minus_true.md

> Normalize > Unary > Tilde > Minus true
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~(-true));
`````

## Pre Normal


`````js filename=intro
$(~-true);
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
