# Preval test case

# ident.md

> Normalize > Member access > Assign rhs > Ident
>
> Ident property access should not be changed

#TODO

## Input

`````js filename=intro
let x = 10;
x = $.length;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = 10;
x = $.length;
$(x);
`````

## Normalized


`````js filename=intro
let x = 10;
x = $.length;
$(x);
`````

## Output


`````js filename=intro
const x = $.length;
$(x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $.length;
$( a );
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
