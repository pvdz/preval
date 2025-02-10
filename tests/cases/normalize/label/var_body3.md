# Preval test case

# var_body3.md

> Normalize > Label > Var body3
>
> Var as body of a do-while

## Input

`````js filename=intro
test: var x;
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
test:;
$(x);
`````

## Normalized


`````js filename=intro
let x = undefined;
$(x);
`````

## Output


`````js filename=intro
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
