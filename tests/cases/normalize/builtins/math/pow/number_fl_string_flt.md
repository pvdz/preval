# Preval test case

# number_fl_string_flt.md

> Normalize > Builtins > Math > Pow > Number fl string flt
>
> Static expressions can be inlined under certain conditions

## Input

`````js filename=intro
$(Math.pow(3.3, '4.3'));
`````

## Pre Normal


`````js filename=intro
$(Math.pow(3.3, `4.3`));
`````

## Normalized


`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = Math.pow(3.3, `4.3`);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam = Math.pow(3.3, `4.3`);
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = Math.pow( 3.3, "4.3" );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 169.67190716541973
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
