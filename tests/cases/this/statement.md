# Preval test case

# statement.md

> This > Statement
>
> The `this` keyword as statement should be eliminated

## Input

`````js filename=intro
function f() {
  const x = $(0);
  this;
  return x;
}
f();
f();
f();
f();
$(f());
`````


## Settled


`````js filename=intro
$(0);
$(0);
$(0);
$(0);
const tmpCalleeParam /*:unknown*/ = $(0);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(0);
$(0);
$(0);
$(0);
$($(0));
`````


## PST Settled
With rename=true

`````js filename=intro
$( 0 );
$( 0 );
$( 0 );
$( 0 );
const a = $( 0 );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const x = $(0);
  return x;
};
f();
f();
f();
f();
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 0
 - 4: 0
 - 5: 0
 - 6: 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
