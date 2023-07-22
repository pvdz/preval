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
while (true) {
  if (tmpDoWhileFlag) {
    tmpDoWhileFlag = $(x);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let tmpDoWhileFlag = $(undefined);
const $tmpLoopUnrollCheck = tmpDoWhileFlag;
if (tmpDoWhileFlag) {
  tmpDoWhileFlag = $(undefined);
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      tmpDoWhileFlag = $(undefined);
    } else {
      break;
    }
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = $( undefined );
const b = a;
if (a) {
  a = $( undefined );
}
if (b) {
  while ($LOOP_UNROLL_9) {
    if (a) {
      a = $( undefined );
    }
    else {
      break;
    }
  }
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
