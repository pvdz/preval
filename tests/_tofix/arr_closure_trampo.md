# Preval test case

# arr_closure_trampo.md

> Tofix > arr closure trampo
>
> I thought we did this

So why isn't it happening in jf-server-sync.js

## Input

`````js filename=intro
let _0x5576 = function() {
  const _0x2f0a53 = [`W4BcO8kAW5RdGa`, `AH7cVXhdHa`];
  _0x5576 = function() {
    return _0x2f0a53;
  };
  const tmpReturnArg$65 = _0x5576();
  return tmpReturnArg$65;
};
$(_0x5576());
$(_0x5576());
`````

## Settled


`````js filename=intro
const _0x5576 /*:array*/ = [`W4BcO8kAW5RdGa`, `AH7cVXhdHa`];
$(_0x5576);
$(_0x5576);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const _0x5576 = [`W4BcO8kAW5RdGa`, `AH7cVXhdHa`];
$(_0x5576);
$(_0x5576);
`````

## Pre Normal


`````js filename=intro
let _0x5576 = function () {
  debugger;
  const _0x2f0a53 = [`W4BcO8kAW5RdGa`, `AH7cVXhdHa`];
  _0x5576 = function () {
    debugger;
    return _0x2f0a53;
  };
  const tmpReturnArg$65 = _0x5576();
  return tmpReturnArg$65;
};
$(_0x5576());
$(_0x5576());
`````

## Normalized


`````js filename=intro
let _0x5576 = function () {
  debugger;
  const _0x2f0a53 = [`W4BcO8kAW5RdGa`, `AH7cVXhdHa`];
  _0x5576 = function () {
    debugger;
    return _0x2f0a53;
  };
  const tmpReturnArg$65 = _0x5576();
  return tmpReturnArg$65;
};
const tmpCalleeParam = _0x5576();
$(tmpCalleeParam);
const tmpCalleeParam$1 = _0x5576();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ "W4BcO8kAW5RdGa", "AH7cVXhdHa" ];
$( a );
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: ['W4BcO8kAW5RdGa', 'AH7cVXhdHa']
 - 2: ['W4BcO8kAW5RdGa', 'AH7cVXhdHa']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
