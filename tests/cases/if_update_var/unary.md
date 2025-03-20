# Preval test case

# unary.md

> If update var > Unary
>
> If a variable is conditionally set and then used in a binding after the `if`/`else`, we may be able to hoist the binding inside those branches.

The idea is that `x` will be replaced by `y` here.

## Input

`````js filename=intro
let x = undefined;
if ($(true)) {
  x = 100;
} else {
  x = 200;
}
const y = ~x;
$(y);
`````


## Settled


`````js filename=intro
const tmpIfTest /*:unknown*/ = $(true);
if (tmpIfTest) {
  $(-101);
} else {
  $(-201);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($(true)) {
  $(-101);
} else {
  $(-201);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  $( -101 );
}
else {
  $( -201 );
}
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - 2: -101
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
