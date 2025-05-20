# Preval test case

# bin_in_class.md

> Exprstmt > Bin in class
>
> Expression statements can be eliminated if we have enough information

## Input

`````js filename=intro
const spy = {toString(){ $('pass'); }, valueOf(){ $('fail'); }};
spy in class {};
`````


## Settled


`````js filename=intro
const tmpBinBothLhs /*:object*/ = {
  toString() {
    debugger;
    $(`pass`);
    return undefined;
  },
  valueOf() {
    debugger;
    $(`fail`);
    return undefined;
  },
};
const tmpBinBothRhs /*:class*/ = class {};
tmpBinBothLhs in tmpBinBothRhs;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
({
  toString() {
    $(`pass`);
  },
  valueOf() {
    $(`fail`);
  },
} in class {});
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  toString(  ) {
    debugger;
    $( "pass" );
    return undefined;
  },
  valueOf(  ) {
    debugger;
    $( "fail" );
    return undefined;
  },
};
const b = class   {

};
a in b;
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
