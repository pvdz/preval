# Preval test case

# same_func.md

> One timers > Statement > Same func
>
> What happens when the algo has to inline a call into the same func? Index staleness check.

## Input

`````js filename=intro
function f() {
  function a() { $('a'); }
  a();
  function b() { $('b'); }
  b();
}
f();
`````


## Settled


`````js filename=intro
$(`a`);
$(`b`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`);
$(`b`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "a" );
$( "b" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
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
  a();
  b();
  return undefined;
};
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a'
 - 2: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
