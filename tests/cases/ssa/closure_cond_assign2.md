# Preval test case

# closure_cond_assign2.md

> Ssa > Closure cond assign2
>
> Cannot SSA because g(true) g(false) should not have the same value for x

Regression; x was ending up an implicit global

## Input

`````js filename=intro
function f() {
  let x = 0;
  let g = function(t) {
    if (t) {
      x = x + 1;
    }
    $(x);
    $();
  }
  g(true);
  g(false);
  g(true);
  g(false);
  g(false);
  g(true);
  g(true);
}
if ($) $(f());
`````


## Settled


`````js filename=intro
if ($) {
  let x /*:number*/ = 0;
  const g_t /*:()=>unknown*/ = function () {
    debugger;
    x = x + 1;
    $(x);
    $();
    return undefined;
  };
  const g_f /*:()=>unknown*/ = function () {
    debugger;
    $(x);
    $();
    return undefined;
  };
  g_t();
  g_f();
  g_t();
  g_f();
  g_f();
  g_t();
  g_t();
  $(undefined);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  let x = 0;
  const g_t = function () {
    x = x + 1;
    $(x);
    $();
  };
  const g_f = function () {
    $(x);
    $();
  };
  g_t();
  g_f();
  g_t();
  g_f();
  g_f();
  g_t();
  g_t();
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  let a = 0;
  const b = function() {
    debugger;
    a = a + 1;
    $( a );
    $();
    return undefined;
  };
  const c = function() {
    debugger;
    $( a );
    $();
    return undefined;
  };
  b();
  c();
  b();
  c();
  c();
  b();
  b();
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = 0;
  let g = function ($$0) {
    let t = $$0;
    debugger;
    if (t) {
      x = x + 1;
      $(x);
      $();
      return undefined;
    } else {
      $(x);
      $();
      return undefined;
    }
  };
  g(true);
  g(false);
  g(true);
  g(false);
  g(false);
  g(true);
  g(true);
  return undefined;
};
if ($) {
  let tmpCalleeParam = f();
  $(tmpCalleeParam);
} else {
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 
 - 3: 1
 - 4: 
 - 5: 2
 - 6: 
 - 7: 2
 - 8: 
 - 9: 2
 - 10: 
 - 11: 3
 - 12: 
 - 13: 4
 - 14: 
 - 15: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
