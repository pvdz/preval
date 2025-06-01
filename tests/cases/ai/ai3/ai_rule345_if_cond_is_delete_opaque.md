# Preval test case

# ai_rule345_if_cond_is_delete_opaque.md

> Ai > Ai3 > Ai rule345 if cond is delete opaque
>
> Test: if statement with condition being delete opaque_obj[opaque_prop].

## Input

`````js filename=intro
// Expected: let obj = {p:1}; if(delete obj[$('prop')]) {$('deleted');} else {$('not_deleted');}
let obj = $('get_obj', { p1: 1, p2: 2 });
let propName = $('prop_name');
if (delete obj[propName]) {
  $('deleted_branch');
} else {
  $('not_deleted_branch');
}
$('obj_after', obj);
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:object*/ = { p1: 1, p2: 2 };
const obj /*:unknown*/ = $(`get_obj`, tmpCalleeParam);
const propName /*:unknown*/ = $(`prop_name`);
const tmpIfTest /*:boolean*/ = delete obj[propName];
if (tmpIfTest) {
  $(`deleted_branch`);
  $(`obj_after`, obj);
} else {
  $(`not_deleted_branch`);
  $(`obj_after`, obj);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $(`get_obj`, { p1: 1, p2: 2 });
const propName = $(`prop_name`);
if (delete obj[propName]) {
  $(`deleted_branch`);
  $(`obj_after`, obj);
} else {
  $(`not_deleted_branch`);
  $(`obj_after`, obj);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  p1: 1,
  p2: 2,
};
const b = $( "get_obj", a );
const c = $( "prop_name" );
const d = delete b[ c ];
if (d) {
  $( "deleted_branch" );
  $( "obj_after", b );
}
else {
  $( "not_deleted_branch" );
  $( "obj_after", b );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = { p1: 1, p2: 2 };
let obj = $(`get_obj`, tmpCalleeParam);
let propName = $(`prop_name`);
const tmpIfTest = delete obj[propName];
if (tmpIfTest) {
  $(`deleted_branch`);
  $(`obj_after`, obj);
} else {
  $(`not_deleted_branch`);
  $(`obj_after`, obj);
}
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'get_obj', { p1: '1', p2: '2' }
 - 2: 'prop_name'
 - 3: 'deleted_branch'
 - 4: 'obj_after', 'get_obj'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
