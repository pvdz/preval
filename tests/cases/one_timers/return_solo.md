# Preval test case

# return_solo.md

> One timers > Return solo
>
> Functions that are called once should be inlined when possible

## Input

`````js filename=intro
function f() {
  function g() {
    $('a');
    $('b');
    return $('ab');
  }
  g();
  $('c');
}
f();
`````


## Settled


`````js filename=intro
$(`a`);
$(`b`);
$(`ab`);
$(`c`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`a`);
$(`b`);
$(`ab`);
$(`c`);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "a" );
$( "b" );
$( "ab" );
$( "c" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let g = function () {
    debugger;
    $(`a`);
    $(`b`);
    const tmpReturnArg = $(`ab`);
    return tmpReturnArg;
  };
  g();
  $(`c`);
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
 - 3: 'ab'
 - 4: 'c'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
