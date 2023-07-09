# Preval test case

# var_body3.md

> Normalize > Try > Try > Var body3
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
try {
  var x;
} catch {

}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
try {
} catch (e) {}
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

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
