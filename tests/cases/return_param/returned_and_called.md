# Preval test case

# returned_and_called.md

> Return param > Returned and called
>
> Returning a static param mutation but also reading it so we can't just eliminate it

## Input

`````js filename=intro
function f(g) {
  let y = g(1);
  $(y);
  return y;
}
$(f(function(a){ $(a, 'first'); }));
$(f(function(a){ $(a, 'second'); }));
$(f(function(a){ $(a, 'third'); }));
`````


## Settled


`````js filename=intro
$(1, `first`);
$(undefined);
$(undefined);
$(1, `second`);
$(undefined);
$(undefined);
$(1, `third`);
$(undefined);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1, `first`);
$(undefined);
$(undefined);
$(1, `second`);
$(undefined);
$(undefined);
$(1, `third`);
$(undefined);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1, "first" );
$( undefined );
$( undefined );
$( 1, "second" );
$( undefined );
$( undefined );
$( 1, "third" );
$( undefined );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let g = $$0;
  debugger;
  let y = g(1);
  $(y);
  return y;
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = function ($$0) {
  let a = $$0;
  debugger;
  $(a, `first`);
  return undefined;
};
let tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
const tmpCallCallee$1 = f;
let tmpCalleeParam$5 = function ($$0) {
  let a$1 = $$0;
  debugger;
  $(a$1, `second`);
  return undefined;
};
let tmpCalleeParam$3 = f(tmpCalleeParam$5);
$(tmpCalleeParam$3);
const tmpCallCallee$3 = f;
let tmpCalleeParam$9 = function ($$0) {
  let a$3 = $$0;
  debugger;
  $(a$3, `third`);
  return undefined;
};
let tmpCalleeParam$7 = f(tmpCalleeParam$9);
$(tmpCalleeParam$7);
`````


## Todos triggered


- (todo) no test coverage? for outlining a call that replaces the callee


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1, 'first'
 - 2: undefined
 - 3: undefined
 - 4: 1, 'second'
 - 5: undefined
 - 6: undefined
 - 7: 1, 'third'
 - 8: undefined
 - 9: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
