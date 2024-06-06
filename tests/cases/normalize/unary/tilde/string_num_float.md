# Preval test case

# string_num_float.md

> Normalize > Unary > Tilde > String num float
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(~"10.05");
`````

## Pre Normal


`````js filename=intro
$(~`10.05`);
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -11;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(-11);
`````

## PST Output

With rename=true

`````js filename=intro
$( -11 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -11
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
