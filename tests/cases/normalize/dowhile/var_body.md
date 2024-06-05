# Preval test case

# var_body.md

> Normalize > Dowhile > Var body
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
do var x = 0; while (false);
`````

## Pre Normal

`````js filename=intro
let x = undefined;
while (true) {
  x = 0;
  if (false) {
  } else {
    break;
  }
}
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

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
