# Preval test case

# bin_instanceof_number.md

> Exprstmt > Bin instanceof number
>
> Expression statements can be eliminated if we have enough information

## Input

`````js filename=intro
const spy = {toString(){ $('fail'); }, valueOf(){ $('fail'); }};
spy instanceof 150; // This'll crash
`````


## Settled


`````js filename=intro
undefined instanceof 150;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined instanceof 150;
`````


## PST Settled
With rename=true

`````js filename=intro
undefined instanceof 150;
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
undefined instanceof 150;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Right-hand side of 'instanceof' is not an object ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
