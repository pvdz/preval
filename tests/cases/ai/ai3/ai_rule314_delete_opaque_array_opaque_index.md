# Preval test case

# ai_rule314_delete_opaque_array_opaque_index.md

> Ai > Ai3 > Ai rule314 delete opaque array opaque index
>
> Test: delete on an element of an opaque array with an opaque index.

## Input

`````js filename=intro
// Expected: let arr = $('get_arr'); let idx = $('get_idx'); let result = delete arr[idx]; $('deleted', result);
let arr = $('get_arr');
let idx = $('get_idx');
let result = delete arr[idx];
$('deleted', result);
$('arr_after', arr); // To observe side effect if any
`````


## Settled


`````js filename=intro
const arr /*:unknown*/ = $(`get_arr`);
const idx /*:unknown*/ = $(`get_idx`);
const result /*:boolean*/ = delete arr[idx];
$(`deleted`, result);
$(`arr_after`, arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = $(`get_arr`);
const idx = $(`get_idx`);
$(`deleted`, delete arr[idx]);
$(`arr_after`, arr);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "get_arr" );
const b = $( "get_idx" );
const c = delete a[ b ];
$( "deleted", c );
$( "arr_after", a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let arr = $(`get_arr`);
let idx = $(`get_idx`);
let result = delete arr[idx];
$(`deleted`, result);
$(`arr_after`, arr);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'get_arr'
 - 2: 'get_idx'
 - 3: 'deleted', true
 - 4: 'arr_after', 'get_arr'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
