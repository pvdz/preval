# Preval test case

# bin_in_number.md

> Exprstmt > Bin in number
>
> Expression statements can be eliminated if we have enough information

## Input

`````js filename=intro
const spy = {toString(){ $('pass'); }, valueOf(){ $('fail'); }};
spy in 150; // This'll crash
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
spy in 150;
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
} in 150);
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
spy in 150;
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
spy in 150;
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
a in 150;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ("<crash[ Cannot use 'in' operator to search for '[object Object]' in 150 ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
