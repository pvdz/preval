# Preval test case

# string_any_number_flt.md

> Normalize > Builtins > Math > Pow > String any number flt
>
> Static expressions can be inlined under certain conditions

#TODO

## Input

`````js filename=intro
$(Math.pow('foo', 5.4));
`````

## Pre Normal

`````js filename=intro
$(Math.pow(`foo`, 5.4));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = Math.pow(`foo`, 5.4);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = Math.pow(`foo`, 5.4);
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
