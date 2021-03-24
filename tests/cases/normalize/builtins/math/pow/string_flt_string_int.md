# Preval test case

# string_flt_string_int.md

> Normalize > Builtins > Math > Pow > String flt string int
>
> Static expressions can be inlined under certain conditions

#TODO

## Input

`````js filename=intro
$(Math.pow('3.7', '2'));
`````

## Pre Normal

`````js filename=intro
$(Math.pow('3.7', '2'));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = Math.pow('3.7', '2');
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = Math.pow('3.7', '2');
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 13.690000000000001
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same