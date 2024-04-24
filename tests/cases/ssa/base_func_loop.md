# Preval test case

# base_func_loop.md

> Ssa > Base func loop
>
> Contrived example

#TODO

## Input

`````js filename=intro
function f() {
    let x = $(3);
    $(x);
    while (true) {
      $(++x);
      if (x > 5) break;
    }
    $(x);
}
if ($) $(f()); // The branching prevents certain flattening
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  let x = $(3);
  $(x);
  while (true) {
    $(++x);
    if (x > 5) break;
  }
  $(x);
};
if ($) $(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let x = $(3);
  $(x);
  while (true) {
    const tmpCallCallee = $;
    x = x + 1;
    let tmpCalleeParam = x;
    tmpCallCallee(tmpCalleeParam);
    const tmpIfTest = x > 5;
    if (tmpIfTest) {
      break;
    } else {
    }
  }
  $(x);
  return undefined;
};
if ($) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = f();
  tmpCallCallee$1(tmpCalleeParam$1);
} else {
}
`````

## Output

`````js filename=intro
if ($) {
  let x = $(3);
  $(x);
  let $tmpLoopUnrollCheck = true;
  x = x + 1;
  $(x);
  const tmpIfTest = x > 5;
  if (tmpIfTest) {
    $tmpLoopUnrollCheck = false;
  } else {
  }
  if ($tmpLoopUnrollCheck) {
    while ($LOOP_UNROLL_10) {
      x = x + 1;
      $(x);
      const tmpIfTest$1 = x > 5;
      if (tmpIfTest$1) {
        break;
      } else {
      }
    }
  } else {
  }
  $(x);
  $(undefined);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  let a = $( 3 );
  $( a );
  let b = true;
  a = a + 1;
  $( a );
  const c = a > 5;
  if (c) {
    b = false;
  }
  if (b) {
    while ($LOOP_UNROLL_10) {
      a = a + 1;
      $( a );
      const d = a > 5;
      if (d) {
        break;
      }
    }
  }
  $( a );
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3
 - 2: 3
 - 3: 4
 - 4: 5
 - 5: 6
 - 6: 6
 - 7: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
