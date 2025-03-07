# Preval test case

# back2back_arr_with_many_refs_assign_assign.md

> Ssa > Back2back arr with many refs assign assign
>
> Silly case but trying to catch something on a generic level; a double assign where the rhs contains multiple references.

## Input

`````js filename=intro
function f() {
  if ($) {
    let x = $(undefined);
    // This assign should be SSA but all the refs in the rhs must keep the same name
    x = [1, x, 2, x, 3, x, 4, x];
    $(x);
    // This bit prevents other optimizations from eliminating the above entirely immediately
    const g = function(){ if ($) $(x); };
    g();
  }
}
if ($) f();
`````

## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $(undefined);
  const tmpSSA_x /*:array*/ = [1, x, 2, x, 3, x, 4, x];
  $(tmpSSA_x);
  if ($) {
    $(tmpSSA_x);
  } else {
  }
} else {
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const x = $(undefined);
  const tmpSSA_x = [1, x, 2, x, 3, x, 4, x];
  $(tmpSSA_x);
  if ($) {
    $(tmpSSA_x);
  }
}
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let x = $(undefined);
    x = [1, x, 2, x, 3, x, 4, x];
    $(x);
    const g = function () {
      debugger;
      if ($) $(x);
    };
    g();
  }
};
if ($) f();
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  if ($) {
    let x = $(undefined);
    x = [1, x, 2, x, 3, x, 4, x];
    $(x);
    const g = function () {
      debugger;
      if ($) {
        $(x);
        return undefined;
      } else {
        return undefined;
      }
    };
    g();
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

## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $( undefined );
  const b = [ 1, a, 2, a, 3, a, 4, a ];
  $( b );
  if ($) {
    $( b );
  }
}
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: undefined
 - 2: [1, undefined, 2, undefined, 3, undefined, 4, undefined]
 - 3: [1, undefined, 2, undefined, 3, undefined, 4, undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
