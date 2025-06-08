# Preval test case

# obj_computed.md

> If test merging > Obj computed
>
> When if test is an unknown boolean and the first statement is equal 
> except for boolean values then it can replace them with the test var.

## Input

`````js filename=intro
const bool = Boolean($(true));
const a = $();
let x;
if (bool) {
  x = {[a]: 1, b: true};
} else {
  x = {[a]: 1, b: false};
}
$(x);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(true);
const a /*:unknown*/ = $();
const tmpBool /*:boolean*/ = $boolean_constructor(tmpCalleeParam);
const tmpClusterSSA_x /*:object*/ /*truthy*/ = { [a]: 1, b: tmpBool };
$(tmpClusterSSA_x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpCalleeParam = $(true);
const a = $();
const tmpBool = $boolean_constructor(tmpCalleeParam);
$({ [a]: 1, b: tmpBool });
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( true );
const b = $();
const c = $boolean_constructor( a );
const d = {
  [ b ]: 1,
  b: c,
};
$( d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $(true);
const bool = $boolean_constructor(tmpCalleeParam);
const a = $();
let x = undefined;
if (bool) {
  x = { [a]: 1, b: true };
  $(x);
} else {
  x = { [a]: 1, b: false };
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
 - 2: 
 - 3: { undefined: '1', b: 'true' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
