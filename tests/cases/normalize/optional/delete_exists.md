# Preval test case

# delete_exists.md

> Normalize > Optional > Delete exists
>
> Delete on member expression is special casing. Works with optional chaining.

## Input

`````js filename=intro
let o = {x: 1};
$(o);
delete o?.x;
$(o);
`````


## Settled


`````js filename=intro
const o /*:object*/ /*truthy*/ = { x: 1 };
$(o);
delete o.x;
$(o);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const o = { x: 1 };
$(o);
delete o.x;
$(o);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
$( a );
delete a.x;
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let o = { x: 1 };
$(o);
const tmpDeleteOpt = o;
const tmpIfTest = tmpDeleteOpt != null;
if (tmpIfTest) {
  delete tmpDeleteOpt.x;
  $(o);
} else {
  $(o);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { x: '1' }
 - 2: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
