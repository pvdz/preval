# Preval test case

# same_func_noisy2.md

> One timers > Assign > Same func noisy2
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
  $(3.1);
  $(3.2);
  $(3.3);
  function a() { 
    $('a1');
    $('a2');
  }
  $(4.1);
  $(4.2);
  $(4.3);
  a();
  $(5.1);
  $(5.2);
  $(5.3);
  function b() {
    $('b1');
    $('b2');
  }
  $(6.1);
  $(6.2);
  $(6.3);
  b();
  $(7.1);
  $(7.2);
  $(7.3);
}
$(2);
x = f(); // This x should not be SSA'd due to the closure
$(x);
$(closure());
$(8);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(100);
$(x);
$(1);
$(2);
$(3.1);
$(3.2);
$(3.3);
$(4.1);
$(4.2);
$(4.3);
$(`a1`);
$(`a2`);
$(5.1);
$(5.2);
$(5.3);
$(6.1);
$(6.2);
$(6.3);
$(`b1`);
$(`b2`);
$(7.1);
$(7.2);
$(7.3);
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
$(3.1);
$(3.2);
$(3.3);
$(4.1);
$(4.2);
$(4.3);
$(`a1`);
$(`a2`);
$(5.1);
$(5.2);
$(5.3);
$(6.1);
$(6.2);
$(6.3);
$(`b1`);
$(`b2`);
$(7.1);
$(7.2);
$(7.3);
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
$( 3.1 );
$( 3.2 );
$( 3.3 );
$( 4.1 );
$( 4.2 );
$( 4.3 );
$( "a1" );
$( "a2" );
$( 5.1 );
$( 5.2 );
$( 5.3 );
$( 6.1 );
$( 6.2 );
$( 6.3 );
$( "b1" );
$( "b2" );
$( 7.1 );
$( 7.2 );
$( 7.3 );
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
    $(`a1`);
    $(`a2`);
    return undefined;
  };
  let b = function () {
    debugger;
    $(`b1`);
    $(`b2`);
    return undefined;
  };
  $(3.1);
  $(3.2);
  $(3.3);
  $(4.1);
  $(4.2);
  $(4.3);
  a();
  $(5.1);
  $(5.2);
  $(5.3);
  $(6.1);
  $(6.2);
  $(6.3);
  b();
  $(7.1);
  $(7.2);
  $(7.3);
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
 - 5: 3.1
 - 6: 3.2
 - 7: 3.3
 - 8: 4.1
 - 9: 4.2
 - 10: 4.3
 - 11: 'a1'
 - 12: 'a2'
 - 13: 5.1
 - 14: 5.2
 - 15: 5.3
 - 16: 6.1
 - 17: 6.2
 - 18: 6.3
 - 19: 'b1'
 - 20: 'b2'
 - 21: 7.1
 - 22: 7.2
 - 23: 7.3
 - 24: undefined
 - 25: undefined
 - 26: 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
