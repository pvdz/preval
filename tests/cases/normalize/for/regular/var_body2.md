# Preval test case

# var_body2.md

> Normalize > For > Regular > Var body2
>
> Var as body of a do-while

## Input

`````js filename=intro
for(;$(x);) var x = 0;
`````

## Pre Normal


`````js filename=intro
let x = undefined;
{
  while ($(x)) {
    x = 0;
  }
}
`````

## Normalized


`````js filename=intro
let x = undefined;
while (true) {
  const tmpIfTest = $(x);
  if (tmpIfTest) {
    x = 0;
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(undefined);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(0);
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
    const b = $( 0 );
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
