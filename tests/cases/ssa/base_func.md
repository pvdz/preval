# Preval test case

# base_func.md

> Ssa > Base func
>
> Contrived example

## Input

`````js filename=intro
function f() {
  if ($) {
    let x = $(5);
    $(x);
    // Next write can be SSA'd
    x = $(10);
    $(x);
  }
}
if ($) $(f()); // The branching prevents certain flattening
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let x = $(5);
    $(x);
    x = $(10);
    $(x);
  }
};
if ($) $(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let x = $(5);
    $(x);
    x = $(10);
    $(x);
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  const tmpCalleeParam = f();
  $(tmpCalleeParam);
} else {
}
`````

## Output


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(5);
  $(x);
  const tmpClusterSSA_x /*:unknown*/ = $(10);
  $(tmpClusterSSA_x);
  $(undefined);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = $( 5 );
  $( a );
  const b = $( 10 );
  $( b );
  $( undefined );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 5
 - 3: 10
 - 4: 10
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
