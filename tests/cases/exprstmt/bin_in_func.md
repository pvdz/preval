# Preval test case

# bin_in_func.md

> Exprstmt > Bin in func
>
> Expression statements can be eliminated if we have enough information

## Input

`````js filename=intro
const spy = {toString(){ $('pass'); }, valueOf(){ $('fail'); }};
spy in Number;
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
spy in Number;
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
} in Number);
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
spy in Number;
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
spy in Number;
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
a in Number;
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
