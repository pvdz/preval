# Preval test case

# ai_rule321_delete_opaque_obj_prop.md

> Ai > Ai4 > Ai rule321 delete opaque obj prop
>
> Test: delete operator on an opaque object with an opaque property.

## Input

`````js filename=intro
// Expected: let obj = $('my_obj'); let prop = $('my_prop'); delete obj[prop]; $('result', obj);
let obj = $('my_obj');
let prop = $('my_prop');
delete obj[prop]; // This will likely crash at runtime if obj is a string
$('result', obj);
`````


## Settled


`````js filename=intro
const obj /*:unknown*/ = $(`my_obj`);
const prop /*:unknown*/ = $(`my_prop`);
delete obj[prop];
$(`result`, obj);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = $(`my_obj`);
const prop = $(`my_prop`);
delete obj[prop];
$(`result`, obj);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "my_obj" );
const b = $( "my_prop" );
delete a[ b ];
$( "result", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let obj = $(`my_obj`);
let prop = $(`my_prop`);
delete obj[prop];
$(`result`, obj);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'my_obj'
 - 2: 'my_prop'
 - 3: 'result', 'my_obj'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
