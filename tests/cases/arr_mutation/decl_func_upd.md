# Preval test case

# decl_func_upd.md

> Arr mutation > Decl func upd
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const f = function () {
  arr[0] = 1;
};
const arr = [];
$(f);
f();
$(arr);
`````

## Settled


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  arr[0] = 1;
  return undefined;
};
const arr /*:array*/ = [];
$(f);
arr[0] = 1;
$(arr);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  arr[0] = 1;
};
const arr = [];
$(f);
arr[0] = 1;
$(arr);
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  arr[0] = 1;
};
const arr = [];
$(f);
f();
$(arr);
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  arr[0] = 1;
  return undefined;
};
const arr = [];
$(f);
f();
$(arr);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  b[0] = 1;
  return undefined;
};
const b = [];
$( a );
b[0] = 1;
$( b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - 2: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- processArrayWriteReadImmutableBinding slow path
