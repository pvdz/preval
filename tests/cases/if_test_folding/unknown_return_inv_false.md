# Preval test case

# unknown_return_inv_false.md

> If test folding > Unknown return inv false
>
> When the assignment in an `if` is a true/false in each branch, we can base it on the test.

## Input

`````js filename=intro
function f() {
  const x = $(0);
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
$(0);
const tmpBoolTrampoline /*:unknown*/ = $(0);
const tmpCalleeParam /*:boolean*/ = $boolean_constructor(tmpBoolTrampoline);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
$($boolean_constructor($(0)));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
const a = $( 0 );
const b = $boolean_constructor( a );
$( b );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
