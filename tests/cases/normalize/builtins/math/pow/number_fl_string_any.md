# Preval test case

# number_fl_string_any.md

> Normalize > Builtins > Math > Pow > Number fl string any
>
> Static expressions can be inlined under certain conditions

#TODO

## Input

`````js filename=intro
$(Math.pow(3.3, 'foo'));
`````

## Pre Normal

`````js filename=intro
$(Math.pow(3.3, 'foo'));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = Math.pow(3.3, 'foo');
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = Math.pow(3.3, 'foo');
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
