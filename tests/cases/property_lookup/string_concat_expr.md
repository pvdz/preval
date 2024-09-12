# Preval test case

# string_concat_expr.md

> Property lookup > String concat expr

## Input

`````js filename=intro
const x = $StringPrototype.lastIndexOf;
$( x );
`````

## Pre Normal


`````js filename=intro
const x = $StringPrototype.lastIndexOf;
$(x);
`````

## Normalized


`````js filename=intro
const x = $string_lastIndexOf;
$(x);
`````

## Output


`````js filename=intro
$($string_lastIndexOf);
`````

## PST Output

With rename=true

`````js filename=intro
$( $string_lastIndexOf );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
