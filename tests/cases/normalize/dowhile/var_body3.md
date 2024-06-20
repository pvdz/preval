# Preval test case

# var_body3.md

> Normalize > Dowhile > Var body3
>
> Var as body of a do-while

## Input

`````js filename=intro
do var x; while ($(x));
`````

## Pre Normal


`````js filename=intro
let x = undefined;
while (true) {
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
  const tmpIfTest = $(x);
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
const tmpIfTest = $(undefined);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 = $(undefined);
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
const a = $( undefined );
if (a) {
  while ($LOOP_UNROLL_10) {
    const b = $( undefined );
    if (b) {

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
