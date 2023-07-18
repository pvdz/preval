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
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    x = 0;
    tmpDoWhileFlag = false;
  }
}
`````

## Normalized

`````js filename=intro
let x = undefined;
let tmpDoWhileFlag = true;
while (true) {
  if (tmpDoWhileFlag) {
    x = 0;
    tmpDoWhileFlag = false;
  } else {
    break;
  }
}
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
