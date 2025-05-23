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
const tmpBool /*:boolean*/ = $boolean_constructor($);
$(tmpBool);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($boolean_constructor($));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $boolean_constructor( $ );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = true;
if ($) {
  $(x);
} else {
  x = false;
  $(x);
}
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $boolean_constructor


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
