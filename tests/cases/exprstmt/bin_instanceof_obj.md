# Preval test case

# bin_instanceof_obj.md

> Exprstmt > Bin instanceof obj
>
> Expression statements can be eliminated if we have enough information

## Input

`````js filename=intro
const spy = {toString(){ $('fail'); }, valueOf(){ $('fail'); }};
spy instanceof {};
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:object*/ /*truthy*/ = {};
undefined instanceof tmpBinBothRhs;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined instanceof {};
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {};
undefined instanceof a;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const spy = {
  toString() {
    debugger;
    $(`fail`);
    return undefined;
  },
  valueOf() {
    debugger;
    $(`fail`);
    return undefined;
  },
};
const tmpBinBothLhs = undefined;
const tmpBinBothRhs = {};
undefined instanceof tmpBinBothRhs;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not callable ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
