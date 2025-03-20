# Preval test case

# base.md

> Is booly > Base
>
>

## Input

`````js filename=intro
let x = true;
if (!$) {
  x = false;
}
$(x);
`````


## Settled


`````js filename=intro
const tmpBool /*:boolean*/ = Boolean($);
$(tmpBool);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(Boolean($));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = Boolean( $ );
$( a );
`````


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
