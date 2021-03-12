# Preval test case

# undefined.md

> Normalize > Unary > Inv > Undefined
>
> Inverting literals should be statically resolved

#TODO

## Input

`````js filename=intro
$(!undefined);
`````

## Pre Normal

`````js filename=intro
$(!undefined);
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

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
