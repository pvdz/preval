# Preval test case

# init_double_member_expr.md

> Normalize > Binding > Init double member expr
>
> Binding declaration with a long init should be outlined

## Input

`````js filename=intro
let x = "foo".length.toString;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = `foo`.length.toString;
$(x);
`````

## Normalized


`````js filename=intro
const tmpCompObj = 3;
let x = tmpCompObj.toString;
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
