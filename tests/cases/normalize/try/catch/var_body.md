# Preval test case

# var_body.md

> Normalize > Try > Catch > Var body
>
> Var as body of a do-while

## Input

`````js filename=intro
try {
} catch {
  var x;
}
`````

## Pre Normal


`````js filename=intro
let x = undefined;
try {
} catch (e) {}
`````

## Normalized


`````js filename=intro
let x = undefined;
`````

## Output


`````js filename=intro

`````

## PST Output

With rename=true

`````js filename=intro

`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
