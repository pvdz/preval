# Preval test case

# prop_read_with_alias2.md

> Object literal > Prop read with alias2
>
> Found through a test case generated through AI :D

This was the last internal state that repros the issue when it happens.
Core issue was that the block of the while was ignored/not supported when doing side effect checks, but it forgot to be conservative and to mark it as having side effects.
This led to the property being okay to be inlined, which obviously it is not.

## Input

`````js filename=intro
const tmpObjLitVal /*:unknown*/ = 12345;
const obj_orig /*:object*/ = { p: tmpObjLitVal };
let L = $(`before`);
while (true) {
  if (L) {
    const tmpAssignMemRhs$4 /*:unknown*/ = $(`updated_value`);
    obj_orig.p = tmpAssignMemRhs$4;
    break;
  } else {
    break;
  }
}
const tmpCalleeParam /*:unknown*/ = obj_orig.p;
$(`after`, tmpCalleeParam);
`````


## Settled


`````js filename=intro
const L /*:unknown*/ = $(`before`);
const obj_orig /*:object*/ = { p: 12345 };
if (L) {
  const tmpAssignMemRhs$4 /*:unknown*/ = $(`updated_value`);
  obj_orig.p = tmpAssignMemRhs$4;
} else {
}
const tmpCalleeParam /*:unknown*/ = obj_orig.p;
$(`after`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const L = $(`before`);
const obj_orig = { p: 12345 };
if (L) {
  obj_orig.p = $(`updated_value`);
}
$(`after`, obj_orig.p);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "before" );
const b = { p: 12345 };
if (a) {
  const c = $( "updated_value" );
  b.p = c;
}
const d = b.p;
$( "after", d );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = 12345;
const obj_orig = { p: tmpObjLitVal };
let L = $(`before`);
while (true) {
  if (L) {
    const tmpAssignMemRhs$4 = $(`updated_value`);
    obj_orig.p = tmpAssignMemRhs$4;
    break;
  } else {
    break;
  }
}
const tmpCalleeParam = obj_orig.p;
$(`after`, tmpCalleeParam);
`````


## Todos triggered


- (todo) nodeMightMutateNameUntrapped; Which statement are we missing here? BlockStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'before'
 - 2: 'updated_value'
 - 3: 'after', 'updated_value'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
