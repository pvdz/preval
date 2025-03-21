# Preval test case

# closure_to_catch.md

> Static arg ops > Assignment > Closure to catch
>
>

## Input

`````js filename=intro
try {
  $();
} catch (e) {
  let a = $();
  const f = function() {
    e = a;
    $('filler');
    $('more filler');
    return
  }
  $(f(1, 2));
  $(f(3, 4));
}
`````


## Settled


`````js filename=intro
try {
  $();
} catch (e) {
  const a /*:unknown*/ = $();
  const f /*:()=>undefined*/ = function () {
    debugger;
    e = a;
    $(`filler`);
    $(`more filler`);
    return undefined;
  };
  f();
  $(undefined);
  f();
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $();
} catch (e) {
  const a = $();
  const f = function () {
    e = a;
    $(`filler`);
    $(`more filler`);
  };
  f();
  $(undefined);
  f();
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $();
}
catch (a) {
  const b = $();
  const c = function() {
    debugger;
    a = b;
    $( "filler" );
    $( "more filler" );
    return undefined;
  };
  c();
  $( undefined );
  c();
  $( undefined );
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
