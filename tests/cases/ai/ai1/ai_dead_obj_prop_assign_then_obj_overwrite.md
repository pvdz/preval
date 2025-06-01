# Preval test case

# ai_dead_obj_prop_assign_then_obj_overwrite.md

> Ai > Ai1 > Ai dead obj prop assign then obj overwrite
>
> Test: Dead assignment to object property before object is overwritten.

## Input

`````js filename=intro
// Expected: $('init_p'); $('val_A'); let obj = {q: $('val_B')}; $('use_q', obj.q); try{$('use_p',obj.p);}catch(e){}
let obj = {p: $('init_p')};
obj.p = $('val_A');
obj = {q: $('val_B')};
$('use_q', obj.q);
try {
  $('use_p', obj.p); // Accessing .p on the new obj, should be undefined
} catch(e) { /* might throw if .p is not on new obj, or just use undefined */ }
`````


## Settled


`````js filename=intro
$(`init_p`);
$(`val_A`);
const tmpObjLitVal$1 /*:unknown*/ = $(`val_B`);
const tmpClusterSSA_obj /*:object*/ = { q: tmpObjLitVal$1 };
$(`use_q`, tmpObjLitVal$1);
try {
  const tmpCalleeParam$1 /*:unknown*/ = tmpClusterSSA_obj.p;
  $(`use_p`, tmpCalleeParam$1);
} catch (e) {}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`init_p`);
$(`val_A`);
const tmpObjLitVal$1 = $(`val_B`);
const tmpClusterSSA_obj = { q: tmpObjLitVal$1 };
$(`use_q`, tmpObjLitVal$1);
try {
  $(`use_p`, tmpClusterSSA_obj.p);
} catch (e) {}
`````


## PST Settled
With rename=true

`````js filename=intro
$( "init_p" );
$( "val_A" );
const a = $( "val_B" );
const b = { q: a };
$( "use_q", a );
try {
  const c = b.p;
  $( "use_p", c );
}
catch (d) {

}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpObjLitVal = $(`init_p`);
let obj = { p: tmpObjLitVal };
const tmpAssignMemLhsObj = obj;
const tmpAssignMemRhs = $(`val_A`);
tmpAssignMemLhsObj.p = tmpAssignMemRhs;
const tmpObjLitVal$1 = $(`val_B`);
obj = { q: tmpObjLitVal$1 };
let tmpCalleeParam = obj.q;
$(`use_q`, tmpCalleeParam);
try {
  let tmpCalleeParam$1 = obj.p;
  $(`use_p`, tmpCalleeParam$1);
} catch (e) {}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? MemberExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'init_p'
 - 2: 'val_A'
 - 3: 'val_B'
 - 4: 'use_q', 'val_B'
 - 5: 'use_p', undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
