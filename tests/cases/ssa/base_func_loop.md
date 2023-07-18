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
  const x = $(3);
  $(x);
  let $tmpLoopUnrollCheck = true;
  let tmpClusterSSA_x = x + 1;
  $(tmpClusterSSA_x);
  const tmpIfTest = tmpClusterSSA_x > 5;
  if (tmpIfTest) {
    $tmpLoopUnrollCheck = false;
  } else {
  }
  if ($tmpLoopUnrollCheck) {
    while ($LOOP_UNROLL_10) {
      tmpClusterSSA_x = tmpClusterSSA_x + 1;
      $(tmpClusterSSA_x);
      const tmpIfTest$1 = tmpClusterSSA_x > 5;
      if (tmpIfTest$1) {
        break;
      } else {
      }
    }
  } else {
  }
  $(tmpClusterSSA_x);
  $(undefined);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = $( 3 );
  $( a );
  let b = true;
  let c = a + 1;
  $( c );
  const d = c > 5;
  if (d) {
    b = false;
  }
  if (b) {
    while ($LOOP_UNROLL_10) {
      c = c + 1;
      $( c );
      const e = c > 5;
      if (e) {
        break;
      }
    }
  }
  $( c );
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
