# Preval test case

# spread.md

> normalize > call > spread
>
> Spread should be fine

#TODO

## Input

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

Normalized calls: Same

Final output calls: Same
