# Preval test case

# ai_rule324_typeof_opaque_val.md

> Ai > Ai4 > Ai rule324 typeof opaque val
>
> Test: typeof operator on an opaque value.

## Input

`````js filename=intro
// Expected: let x = $('val'); let y = typeof x; $('result', 'string'); // Runtime will be 'string'
let x = $('val');
let y = typeof x;
$('result', y);
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`val`);
const y /*:string*/ /*truthy*/ = typeof x;
$(`result`, y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const x = $(`val`);
$(`result`, typeof x);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "val" );
const b = typeof a;
$( "result", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`val`);
let y = typeof x;
$(`result`, y);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'val'
 - 2: 'result', 'string'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
