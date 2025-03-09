# Preval test case

# method_call_escape.md

> Normalize > Binary > With > Arr > Method call escape
>
> In this case the arr can still escape, so we can't allow index property calls either

Would be nice if we could solve this at some point, but it feels a bit specific.

## Input

`````js filename=intro
const arr = [function(){ return this; }];
$(arr[0]() === arr);
`````

## Settled


`````js filename=intro
const tmpArrElement /*:()=>object*/ = function () {
  const tmpPrevalAliasThis /*:object*/ = this;
  debugger;
  return tmpPrevalAliasThis;
};
const arr /*:array*/ = [tmpArrElement];
const tmpBinLhs /*:unknown*/ = arr[0]();
const tmpCalleeParam /*:boolean*/ = tmpBinLhs === arr;
$(tmpCalleeParam);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement = function () {
  const tmpPrevalAliasThis = this;
  return tmpPrevalAliasThis;
};
const arr = [tmpArrElement];
$(arr[0]() === arr);
`````

## Pre Normal


`````js filename=intro
const arr = [
  function () {
    const tmpPrevalAliasThis = this;
    debugger;
    return tmpPrevalAliasThis;
  },
];
$(arr[0]() === arr);
`````

## Normalized


`````js filename=intro
const tmpArrElement = function () {
  const tmpPrevalAliasThis = this;
  debugger;
  return tmpPrevalAliasThis;
};
const arr = [tmpArrElement];
const tmpBinLhs = arr[0]();
const tmpCalleeParam = tmpBinLhs === arr;
$(tmpCalleeParam);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  const b = this;
  debugger;
  return b;
};
const c = [ a ];
const d = c[ 0 ]();
const e = d === c;
$( e );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: true
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
