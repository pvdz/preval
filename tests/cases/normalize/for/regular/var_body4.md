# Preval test case

# var_body4.md

> Normalize > For > Regular > Var body4
>
> Var as body of a do-while

#TODO

## Input

`````js filename=intro
for(;$(x);) var x = undefined;
`````

## Pre Normal

`````js filename=intro
let x = undefined;
{
  while ($(x)) {
    x = undefined;
  }
}
`````

## Normalized

`````js filename=intro
let x = undefined;
let tmpIfTest = $(x);
while (true) {
  if (tmpIfTest) {
    x = undefined;
    tmpIfTest = $(x);
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let tmpIfTest = $(undefined);
const $tmpLoopUnrollCheck = tmpIfTest;
if (tmpIfTest) {
  tmpIfTest = $(undefined);
} else {
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    if (tmpIfTest) {
      tmpIfTest = $(undefined);
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
  while ($LOOP_UNROLL_10) {
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
