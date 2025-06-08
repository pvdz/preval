# Preval test case

# with_computed.md

> Object literal > Inlining > With computed
>
>

## Input

`````js filename=intro
const key = $('dakey');
const obj = {[key]: 1};
$(obj.dakey);
`````


## Settled


`````js filename=intro
const key /*:unknown*/ = $(`dakey`);
const obj /*:object*/ /*truthy*/ = { [key]: 1 };
const tmpCalleeParam /*:unknown*/ = obj.dakey;
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const key = $(`dakey`);
$({ [key]: 1 }.dakey);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "dakey" );
const b = { [ a ]: 1 };
const c = b.dakey;
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const key = $(`dakey`);
const obj = { [key]: 1 };
let tmpCalleeParam = obj.dakey;
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'dakey'
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
