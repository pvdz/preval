# Preval test case

# back2back_ref.md

> Ssa > Back2back ref
>
> This may be an artifact through using ++x

## Input

`````js filename=intro
function f() {
  if ($) {
    let x = $(5);
    ++x;
    $(x);
  }
}
if ($) f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let x = $(5);
    ++x;
    $(x);
  }
};
if ($) f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let x = $(5);
    x = x + 1;
    $(x);
    return undefined;
  } else {
    return undefined;
  }
};
if ($) {
  f();
} else {
}
`````

## Output


`````js filename=intro
if ($) {
  const x = $(5);
  const tmpClusterSSA_x /*:primitive*/ = x + 1;
  $(tmpClusterSSA_x);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if ($) {
  const a = $( 5 );
  const b = a + 1;
  $( b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 5
 - 2: 6
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
