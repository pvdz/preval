# Preval test case

# reverse_closure.md

> Locking > Reverse closure
>
> A func that is being cleared after being called once is "locked". I guess.

In this case the function gets called before it is tested ...

## Input

`````js filename=intro
function f() {
  $('call me once');
}
function g() {
  let x = f;
  const t = function(){
    f();
    if (f) {
      f = false;
    }
  }
  return t;
}
$(g()());
`````


## Settled


`````js filename=intro
$(`call me once`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`call me once`);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( "call me once" );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(`call me once`);
  return undefined;
};
let g = function () {
  debugger;
  let x = f;
  const t = function () {
    debugger;
    f();
    if (f) {
      f = false;
      return undefined;
    } else {
      return undefined;
    }
  };
  return t;
};
const tmpCallComplexCallee = g();
let tmpCalleeParam = tmpCallComplexCallee();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support Identifier as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'call me once'
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
