# Preval test case

# early_access.md

> Normalize > Var > Early access
>
> Actual early access case

## Input

`````js filename=intro
$(x); // We shouldn't break this being undefined
var x = 10; 
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
$(x);
x = 10;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
$(x);
x = 10;
$(x);
`````

## Output


`````js filename=intro
$(undefined);
$(10);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
$( 10 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
