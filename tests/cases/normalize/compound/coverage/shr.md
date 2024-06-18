# Preval test case

# shr.md

> Normalize > Compound > Coverage > Shr
>
> Compound assignments should destructure to regular assignments

## Input

`````js filename=intro
let a = 1, b = 2;
a >>= b;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = 1,
  b = 2;
a >>= b;
$(a);
`````

## Normalized


`````js filename=intro
let a = 1;
let b = 2;
a = a >> b;
$(a);
`````

## Output


`````js filename=intro
$(0);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
