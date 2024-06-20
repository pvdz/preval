# Preval test case

# base_low_bound.md

> Normalize > Loops > Base low bound
>
> How do you do loops?

This is the simple case with a bound loop

## Input

`````js filename=intro
function f() {
  for (let i=0; i<3; ++i) $(i);
  return 100;
}
const r = f();
$(r);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let i = 0;
    while (i < 3) {
      $(i);
      ++i;
    }
  }
  return 100;
};
const r = f();
$(r);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let i = 0;
  while (true) {
    const tmpIfTest = i < 3;
    if (tmpIfTest) {
      $(i);
      i = i + 1;
    } else {
      break;
    }
  }
  return 100;
};
const r = f();
$(r);
`````

## Output


`````js filename=intro
$(0);
$(1);
$(2);
$(100);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
$( 1 );
$( 2 );
$( 100 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 1
 - 3: 2
 - 4: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
