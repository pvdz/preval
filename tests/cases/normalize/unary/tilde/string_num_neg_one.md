# Preval test case

# string_num_neg_one.md

> Normalize > Unary > Tilde > String num neg one
>
> Unaries should be statically resolved where possible

## Input

`````js filename=intro
$(~"-1");
`````

## Pre Normal


`````js filename=intro
$(~`-1`);
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = 0;
$(tmpCalleeParam);
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
