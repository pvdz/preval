# Preval test case

# bin_instanceof_class.md

> Exprstmt > Bin instanceof class
>
> Expression statements can be eliminated if we have enough information

## Input

`````js filename=intro
const spy = {toString(){ $('fail'); }, valueOf(){ $('fail'); }};
spy instanceof class {};
`````


## Settled


`````js filename=intro
const tmpBinBothRhs /*:class*/ /*truthy*/ = class {};
undefined instanceof tmpBinBothRhs;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined instanceof class {};
`````


## PST Settled
With rename=true

`````js filename=intro
const a = class   {

};
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
const tmpBinBothRhs = class {};
undefined instanceof tmpBinBothRhs;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
