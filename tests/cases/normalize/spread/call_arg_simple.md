# Preval test case

# call_arg_simple.md

> Normalize > Spread > Call arg simple
>
> Spread should normalize itself

#TODO

## Input

`````js filename=intro
$(...[1, 2, 3]);
`````

## Pre Normal

`````js filename=intro
$(...[1, 2, 3]);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParamSpread = [1, 2, 3];
tmpCallCallee(...tmpCalleeParamSpread);
`````

## Output

`````js filename=intro
const tmpCalleeParamSpread = [1, 2, 3];
$(...tmpCalleeParamSpread);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2, 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
