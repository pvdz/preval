# Preval test case

# null.md

> Normalize > Unary > Plus > Null
>
> Unaries should be statically resolved where possible

#TODO

## Input

`````js filename=intro
$(+null);
`````

## Pre Normal

`````js filename=intro
$(+null);
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
