# Preval test case

# number_tostring_expr.md

> Property lookup > Number tostring expr

## Input

`````js filename=intro
const x = $NumberPrototype.toString;
$(x);
`````

## Pre Normal


`````js filename=intro
const x = $NumberPrototype.toString;
$(x);
`````

## Normalized


`````js filename=intro
const x = $number_toString;
$(x);
`````

## Output


`````js filename=intro
$($number_toString);
`````

## PST Output

With rename=true

`````js filename=intro
$( $number_toString );
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
