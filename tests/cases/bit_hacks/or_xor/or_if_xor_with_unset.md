# Preval test case

# or_if_xor_with_unset.md

> Bit hacks > Or xor > Or if xor with unset
>
> Checking whether a bit is set and then xorring it if that's the case is the same as anding with ~-1 without that one bit set at once

## Input

`````js filename=intro
let x = $(3);
const y = x | 32;
if (y) {
  x = x ^ 32;
}
$(x);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(3);
x ** 0;
const tmpClusterSSA_x /*:number*/ /*^32*/ = x ^ 32;
$(tmpClusterSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(3);
x ** 0;
$(x ^ 32);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 3 );
a ** 0;
const b = a ^ 32;
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(3);
const y = x | 32;
if (y) {
  x = x ^ 32;
  $(x);
} else {
  $(x);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 3
 - 2: 35
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
