# Preval test case

# var_body.md

> Normalize > Try > Finally > Var body
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
try {
} finally {
  var x;
}
`````

## Pre Normal

`````js filename=intro
let x = undefined;
try {
} finally {
}
`````

## Normalized

`````js filename=intro
let x = undefined;
try {
} finally {
}
`````

## Output

`````js filename=intro
try {
} finally {
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
