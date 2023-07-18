# Preval test case

# var_body3.md

> Normalize > Try > Finally > Var body3
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
try {
} finally {
  var x;
}
$(x);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
try {
} finally {
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
