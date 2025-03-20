# Preval test case

# iife2.md

> This > Iife2
>
> From the React header

## Input

`````js filename=intro
const f = function () {
  if ($(1)) {
    var g;
    if (typeof window !== 'undefined') {
      g = this;
    }
  }
}
f();
`````


## Settled


`````js filename=intro
$(1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
