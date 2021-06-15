# Preval test case

# number_int_string_flt.md

> Normalize > Builtins > Math > Pow > Number int string flt
>
> Static expressions can be inlined under certain conditions

#TODO

## Input

`````js filename=intro
$(Math.pow(3, '3.7'));
`````

## Pre Normal

`````js filename=intro
$(Math.pow(3, `3.7`));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = Math.pow(3, `3.7`);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam = Math.pow(3, `3.7`);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 58.25707055931402
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
