# Preval test case

# same_func_noisy.md

> One timers > Statement > Same func noisy
>
> What happens when the algo has to inline a call into the same func? Index staleness check.

## Input

`````js filename=intro
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
f();
$(8);
`````


## Settled


`````js filename=intro
$(1);
$(2);
$(3);
$(4);
$(`a`);
$(5);
$(6);
$(`b`);
$(7);
$(8);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
$(3);
$(4);
$(`a`);
$(5);
$(6);
$(`b`);
$(7);
$(8);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
$( 3 );
$( 4 );
$( "a" );
$( 5 );
$( 6 );
$( "b" );
$( 7 );
$( 8 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: 'a'
 - 6: 5
 - 7: 6
 - 8: 'b'
 - 9: 7
 - 10: 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
