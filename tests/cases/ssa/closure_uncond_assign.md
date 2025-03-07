# Preval test case

# closure_uncond_assign.md

> Ssa > Closure uncond assign
>
> Can SSA because all reads in g happen after an unconditional assign

## Input

`````js filename=intro
function f() {
  let x = undefined;
  let g = function() {
    x = function(){};
    $();
    $(x);
  }
  if ($) {
    g();
    return x;
  }
}
if ($) $(f());
`````

## Settled


`````js filename=intro
if ($) {
  const tmpClusterSSA_x /*:()=>unknown*/ = function () {
    debugger;
    return undefined;
  };
  $();
  $(tmpClusterSSA_x);
  $(tmpClusterSSA_x);
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const tmpClusterSSA_x = function () {};
  $();
  $(tmpClusterSSA_x);
  $(tmpClusterSSA_x);
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  let g = function () {
    debugger;
    x = function () {
      debugger;
    };
    $();
    $(x);
  };
  if ($) {
    g();
    return x;
  }
};
if ($) $(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = undefined;
  let g = function () {
    debugger;
    x = function () {
      debugger;
      return undefined;
    };
    $();
    $(x);
    return undefined;
  };
  if ($) {
    g();
    return x;
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

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = function() {
    debugger;
    return undefined;
  };
  $();
  $( a );
  $( a );
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: '<function>'
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
