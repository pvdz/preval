# Preval test case

# double_const.md

> Normalize > Hoisting > Var > Double const
>
> Duplicate var statements is legit but we should drop the duplicate version

#TODO

## Input

`````js filename=intro
var x = 1;
var x = 2;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
x = 1;
x = 2;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
x = 1;
x = 2;
$(x);
`````

## Output


`````js filename=intro
$(2);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
