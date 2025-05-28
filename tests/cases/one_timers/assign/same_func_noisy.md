# Preval test case

# same_func_noisy.md

> One timers > Assign > Same func noisy
>
> What happens when the algo has to inline a call into the same func? Index staleness check.

## Input

`````js filename=intro
let x = $(100);
function closure() {
  // This serves to keep x from being eliminated/SSA'd
  return x;
}
$(closure());
$(1);
function f() {
  $(3);
  function a() { $('a'); }
  $(4);
  a();
  $(5);
  function b() { $('b'); }
  $(6);
  b();
  $(7);
}
$(2);
x = f(); // This x should not be SSA'd due to the closure
$(x);
$(closure());
$(8);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(100);
$(tmpCalleeParam);
$(1);
$(2);
$(3);
$(4);
$(`a`);
$(5);
$(6);
$(`b`);
$(7);
$(undefined);
$(undefined);
$(8);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($(100));
$(1);
$(2);
$(3);
$(4);
$(`a`);
$(5);
$(6);
$(`b`);
$(7);
$(undefined);
$(undefined);
$(8);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 100 );
$( a );
$( 1 );
$( 2 );
$( 3 );
$( 4 );
$( "a" );
$( 5 );
$( 6 );
$( "b" );
$( 7 );
$( undefined );
$( undefined );
$( 8 );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let closure = function () {
  debugger;
  return x;
};
let f = function () {
  debugger;
  let a = function () {
    debugger;
    $(`a`);
    return undefined;
  };
  let b = function () {
    debugger;
    $(`b`);
    return undefined;
  };
  $(3);
  $(4);
  a();
  $(5);
  $(6);
  b();
  $(7);
  return undefined;
};
let x = $(100);
let tmpCalleeParam = closure();
$(tmpCalleeParam);
$(1);
$(2);
x = f();
$(x);
let tmpCalleeParam$1 = closure();
$(tmpCalleeParam$1);
$(8);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 100
 - 2: 100
 - 3: 1
 - 4: 2
 - 5: 3
 - 6: 4
 - 7: 'a'
 - 8: 5
 - 9: 6
 - 10: 'b'
 - 11: 7
 - 12: undefined
 - 13: undefined
 - 14: 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
