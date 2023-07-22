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
while (true) {
  if (tmpDoWhileFlag) {
    x = 0;
    tmpDoWhileFlag = $(x);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let tmpDoWhileFlag = $(0);
let $tmpLoopUnrollCheck = true;
if (tmpDoWhileFlag) {
  tmpDoWhileFlag = $(0);
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_9) {
    if (tmpDoWhileFlag) {
      tmpDoWhileFlag = $(0);
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
let a = $( 0 );
let b = true;
if (a) {
  a = $( 0 );
}
else {
  b = false;
}
if (b) {
  while ($LOOP_UNROLL_9) {
    if (a) {
      a = $( 0 );
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
 - 1: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
