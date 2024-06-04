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
while (true) {
  x = 0;
  if ($(x)) {
  } else {
    break;
  }
}
`````

## Normalized

`````js filename=intro
let x = undefined;
while (true) {
  x = 0;
  const tmpIfTest = $(x);
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## Output

`````js filename=intro
let $tmpLoopUnrollCheck = true;
const tmpIfTest = $(0);
if (tmpIfTest) {
} else {
  $tmpLoopUnrollCheck = false;
}
if ($tmpLoopUnrollCheck) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 = $(0);
    if (tmpIfTest$1) {
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
let a = true;
const b = $( 0 );
if (b) {

}
else {
  a = false;
}
if (a) {
  while ($LOOP_UNROLL_10) {
    const c = $( 0 );
    if (c) {

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
