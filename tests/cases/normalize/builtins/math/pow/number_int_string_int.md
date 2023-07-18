# Preval test case

# number_int_string_int.md

> Normalize > Builtins > Math > Pow > Number int string int
>
> Static expressions can be inlined under certain conditions

#TODO

## Input

`````js filename=intro
$(Math.pow(3, '3'));
`````

## Pre Normal

`````js filename=intro
$(Math.pow(3, `3`));
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = 27;
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(27);
`````

## PST Output

With rename=true

`````js filename=intro
$( 27 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 27
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
