# Preval test case

# var_body2.md

> Normalize > Try > Try > Var body2
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
try {
  var x = 10;
} catch {

}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
try {
  x = 10;
} catch (e) {}
$(x);
`````

## Normalized

`````js filename=intro
let x = undefined;
try {
  x = 10;
} catch (e) {}
$(x);
`````

## Output

`````js filename=intro
$(10);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
