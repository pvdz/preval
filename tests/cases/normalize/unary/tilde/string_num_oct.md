# Preval test case

# string_num_oct.md

> Normalize > Unary > Tilde > String num oct
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~"0o1005");
`````

## Pre Normal


`````js filename=intro
$(~`0o1005`);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -518;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(-518);
`````

## PST Output

With rename=true

`````js filename=intro
$( -518 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -518
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
