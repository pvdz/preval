# Preval test case

# number_int_string_flt.md

> Normalize > Builtins > Math > Pow > Number int string flt
>
> Static expressions can be inlined under certain conditions

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
const tmpCalleeParam = $Math_pow(3, `3.7`);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:number*/ = $Math_pow(3, `3.7`);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $Math_pow( 3, "3.7" );
$( a );
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
