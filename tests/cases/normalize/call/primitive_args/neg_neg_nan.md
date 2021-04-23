# Preval test case

# neg_neg_nan.md

> Normalize > Call > Primitive args > Neg neg nan
>
> Primitive args that may need to be simplified

#TODO

## Input

`````js filename=intro
$(-(-NaN));
`````

## Pre Normal

`````js filename=intro
$(-(-NaN));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = -(-NaN);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = -(-NaN);
$(tmpCalleeParam);
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
