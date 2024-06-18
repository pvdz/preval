# Preval test case

# init_double_member_call.md

> Normalize > Binding > Init double member call
>
> Binding declaration with a long init should be outlined

## Input

`````js filename=intro
let x = "foo".length.toString();
$(x);
`````

## Pre Normal


`````js filename=intro
let x = `foo`.length.toString();
$(x);
`````

## Normalized


`````js filename=intro
const tmpCallObj = 3;
let x = tmpCallObj.toString();
$(x);
`````

## Output


`````js filename=intro
$(`3`);
`````

## PST Output

With rename=true

`````js filename=intro
$( "3" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '3'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
