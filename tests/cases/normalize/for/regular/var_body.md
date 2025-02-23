# Preval test case

# var_body.md

> Normalize > For > Regular > Var body
>
> Var as body of a do-while

## Input

`````js filename=intro
for(;$(false);) var x = 0;
`````

## Pre Normal


`````js filename=intro
let x = undefined;
{
  while ($(false)) {
    x = 0;
  }
}
`````

## Normalized


`````js filename=intro
let x = undefined;
while (true) {
  const tmpIfTest = $(false);
  if (tmpIfTest) {
    x = 0;
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(false);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(false);
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
const a = $( false );
if (a) {
  while ($LOOP_UNROLL_10) {
    const b = $( false );
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
 - 1: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
