# Preval test case

# var_body2.md

> Normalize > Try > Catch > Var body2
>
> Var as body of a do-while

## Input

`````js filename=intro
try {
} catch {
  var x = 10;
}
$(x);
`````

## Pre Normal


`````js filename=intro
let x = undefined;
try {
} catch (e) {
  x = 10;
}
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
