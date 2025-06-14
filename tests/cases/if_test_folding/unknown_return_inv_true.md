# Preval test case

# unknown_return_inv_true.md

> If test folding > Unknown return inv true
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

## Input

`````js filename=intro
function f() {
  const x = $(1);
  let y = undefined;
  if (x) {
    return true;
  } else {
    return false;
  }
}
f();
$(f());
`````


## Settled


`````js filename=intro
$(1);
const tmpBoolTrampoline /*:unknown*/ = $(1);
const tmpCalleeParam /*:boolean*/ = $boolean_constructor(tmpBoolTrampoline);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$($boolean_constructor($(1)));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
const a = $( 1 );
const b = $boolean_constructor( a );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const x = $(1);
  let y = undefined;
  if (x) {
    return true;
  } else {
    return false;
  }
};
f();
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
