# Preval test case

# string_any_number_int.md

> Normalize > Builtins > Math > Pow > String any number int
>
> Static expressions can be inlined under certain conditions

#TODO

## Input

`````js filename=intro
$(Math.pow('foo', 5));
`````

## Pre Normal

`````js filename=intro
$(Math.pow('foo', 5));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = Math.pow('foo', 5);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = Math.pow('foo', 5);
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
