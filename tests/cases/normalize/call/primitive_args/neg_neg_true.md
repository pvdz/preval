# Preval test case

# neg_neg_true.md

> Normalize > Call > Primitive args > Neg neg true
>
> Primitive args that may need to be simplified

#TODO

## Input

`````js filename=intro
$(-(-true));
`````

## Pre Normal

`````js filename=intro
$(-(-true));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpUnaryArg = -1;
const tmpCalleeParam = -tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
