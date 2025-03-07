# Preval test case

# bin_in_obj.md

> Exprstmt > Bin in obj
>
> Expression statements can be eliminated if we have enough information

## Input

`````js filename=intro
const spy = {toString(){ $('pass'); }, valueOf(){ $('fail'); }};
spy in {};
`````

## Settled


`````js filename=intro
const spy /*:object*/ = {
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
const tmpBinBothRhs /*:object*/ = {};
spy in tmpBinBothRhs;
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
} in {});
`````

## Pre Normal


`````js filename=intro
const spy = {
  toString() {
    debugger;
    $(`pass`);
  },
  valueOf() {
    debugger;
    $(`fail`);
  },
};
spy in {};
`````

## Normalized


`````js filename=intro
const spy = {
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
const tmpBinBothLhs = spy;
const tmpBinBothRhs = {};
tmpBinBothLhs in tmpBinBothRhs;
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
const b = {};
a in b;
`````

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
