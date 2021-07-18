# Preval test case

# var_body2.md

> Normalize > Dowhile > Var body2
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
do var x = 0; while ($(x));
`````

## Pre Normal

`````js filename=intro
let x = undefined;
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    x = 0;
    tmpDoWhileFlag = $(x);
  }
}
`````

## Normalized

`````js filename=intro
let x = undefined;
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  x = 0;
  tmpDoWhileFlag = $(x);
}
`````

## Output

`````js filename=intro
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  tmpDoWhileFlag = $(0);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
