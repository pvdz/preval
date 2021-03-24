# Preval test case

# string_any_string_any.md

> Normalize > Builtins > Math > Pow > String any string any
>
> Static expressions can be inlined under certain conditions

#TODO

## Input

`````js filename=intro
$(Math.pow('nope', 'foo'));
`````

## Pre Normal

`````js filename=intro
$(Math.pow('nope', 'foo'));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = Math.pow('nope', 'foo');
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = Math.pow('nope', 'foo');
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