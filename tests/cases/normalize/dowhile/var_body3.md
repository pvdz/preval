# Preval test case

# var_body3.md

> Normalize > Dowhile > Var body3
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
do var x; while ($(x));
`````

## Pre Normal

`````js filename=intro
let x = undefined;
{
  let tmpDoWhileFlag = true;
  while (tmpDoWhileFlag) {
    tmpDoWhileFlag = $(x);
  }
}
`````

## Normalized

`````js filename=intro
let x = undefined;
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  tmpDoWhileFlag = $(x);
}
`````

## Output

`````js filename=intro
let tmpDoWhileFlag = true;
while (tmpDoWhileFlag) {
  tmpDoWhileFlag = $(undefined);
}
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
