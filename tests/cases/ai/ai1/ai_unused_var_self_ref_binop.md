# Preval test case

# ai_unused_var_self_ref_binop.md

> Ai > Ai1 > Ai unused var self ref binop
>
> Test: Unused variable initialized by a self-referential binary op involving $().

## Input

`````js filename=intro
// Expected: $('init'); $('val'); $('done');
let x = $('init');
x = x + $('val'); // x is not used after this.
$('done');
`````


## Settled


`````js filename=intro
const x /*:unknown*/ = $(`init`);
const tmpBinBothRhs /*:unknown*/ = $(`val`);
x + tmpBinBothRhs;
$(`done`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`init`) + $(`val`);
$(`done`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "init" );
const b = $( "val" );
a + b;
$( "done" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = $(`init`);
const tmpBinBothLhs = x;
const tmpBinBothRhs = $(`val`);
x = tmpBinBothLhs + tmpBinBothRhs;
$(`done`);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'init'
 - 2: 'val'
 - 3: 'done'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
