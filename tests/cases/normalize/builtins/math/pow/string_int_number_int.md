# Preval test case

# string_int_number_int.md

> Normalize > Builtins > Math > Pow > String int number int
>
> Static expressions can be inlined under certain conditions

#TODO

## Input

`````js filename=intro
$(Math.pow('3', 5));
`````

## Pre Normal

`````js filename=intro
$(Math.pow('3', 5));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 243;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(243);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 243
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
