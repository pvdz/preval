# Preval test case

# var_body.md

> Normalize > Label > Var body
>
> Var as body of a do-while

## Input

`````js filename=intro
test: var x = 0;
`````

## Pre Normal


`````js filename=intro
let x = undefined;
test: x = 0;
`````

## Normalized


`````js filename=intro
let x = undefined;
x = 0;
`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Denormalized

(This ought to be the final result)


`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
