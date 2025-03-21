# Preval test case

# param_to_catch.md

> Static arg ops > Assignment > Param to catch
>
>

## Input

`````js filename=intro
try {
  $();
} catch (e) {
  const f = function(a, b) {
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
  const f /*:(number)=>undefined*/ = function ($$0) {
    const a /*:number*/ = $$0;
    debugger;
    e = a;
    $(`filler`);
    $(`more filler`);
    return undefined;
  };
  f(1);
  $(undefined);
  f(3);
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $();
} catch (e) {
  const f = function (a) {
    e = a;
    $(`filler`);
    $(`more filler`);
  };
  f(1);
  $(undefined);
  f(3);
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
  const b = function($$0 ) {
    const c = $$0;
    debugger;
    a = c;
    $( "filler" );
    $( "more filler" );
    return undefined;
  };
  b( 1 );
  $( undefined );
  b( 3 );
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
