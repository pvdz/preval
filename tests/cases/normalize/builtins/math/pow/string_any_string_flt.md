# Preval test case

# string_any_string_flt.md

> Normalize > Builtins > Math > Pow > String any string flt
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow('nope', '3.2'));
`````

## Pre Normal


`````js filename=intro
$(Math.pow(`nope`, `3.2`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = NaN;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(NaN);
`````

## PST Output

With rename=true

`````js filename=intro
$( NaN );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
