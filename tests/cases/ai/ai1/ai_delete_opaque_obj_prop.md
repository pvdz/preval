# Preval test case

# ai_delete_opaque_obj_prop.md

> Ai > Ai1 > Ai delete opaque obj prop
>
> Test: delete operator on opaque object and opaque property name.

## Input

`````js filename=intro
// Expected: (Structure preserved, delete result likely true)
let obj = $('get_obj');
let prop_name = $('get_prop');
let result = delete obj[prop_name];
$('del_result', result);
$('obj_after', obj); // To observe potential side effects if any are tracked
`````


## Settled


`````js filename=intro
const obj /*:unknown*/ = $(`get_obj`);
const prop_name /*:unknown*/ = $(`get_prop`);
const result /*:boolean*/ = delete obj[prop_name];
$(`del_result`, result);
$(`obj_after`, obj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $(`get_obj`);
const prop_name = $(`get_prop`);
$(`del_result`, delete obj[prop_name]);
$(`obj_after`, obj);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "get_obj" );
const b = $( "get_prop" );
const c = delete a[ b ];
$( "del_result", c );
$( "obj_after", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let obj = $(`get_obj`);
let prop_name = $(`get_prop`);
let result = delete obj[prop_name];
$(`del_result`, result);
$(`obj_after`, obj);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'get_obj'
 - 2: 'get_prop'
 - 3: 'del_result', true
 - 4: 'obj_after', 'get_obj'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
