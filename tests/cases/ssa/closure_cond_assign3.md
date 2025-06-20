# Preval test case

# closure_cond_assign3.md

> Ssa > Closure cond assign3
>
> Cannot SSA because g(true) g(false) should not have the same value for x

Regression; x was ending up an implicit global.

The problem is that the function is being promoted to global while the binding was created inside a block.

Since the function won't have access to the binding when placed at the top of global, the binding is eliminated and the original usage becomes an implicit global. Uups.

The fix was to properly move functions outward one block at a time, rather than anywhere in the root of the scope.

## Input

`````js filename=intro
if ($) {
  let x = $();
  let g = function (t) {
    const tmpBranchingC = function () {
      if ($) $(x);
    };
    if ($) {
      tmpBranchingC();
    }
  };
  g();
}
`````


## Settled


`````js filename=intro
if ($) {
  const x /*:unknown*/ = $();
  if ($) {
    $(x);
  } else {
  }
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  const x = $();
  if ($) {
    $(x);
  }
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = $();
  if ($) {
    $( a );
  }
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
if ($) {
  let x = $();
  let g = function ($$0) {
    let t = $$0;
    debugger;
    const tmpBranchingC = function () {
      debugger;
      if ($) {
        $(x);
        return undefined;
      } else {
        return undefined;
      }
    };
    if ($) {
      tmpBranchingC();
      return undefined;
    } else {
      return undefined;
    }
  };
  g();
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
