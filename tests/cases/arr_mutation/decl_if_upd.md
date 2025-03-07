# Preval test case

# decl_if_upd.md

> Arr mutation > Decl if upd
>
> Testing the inlining of array mutations

## Input

`````js filename=intro
const arr = [];
if ($) {
  arr[0] = 1;
} else {
}
$(arr);
`````

## Settled


`````js filename=intro
const arr /*:array*/ = [];
if ($) {
  arr[0] = 1;
} else {
}
$(arr);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const arr = [];
if ($) {
  arr[0] = 1;
}
$(arr);
`````

## Pre Normal


`````js filename=intro
const arr = [];
if ($) {
  arr[0] = 1;
} else {
}
$(arr);
`````

## Normalized


`````js filename=intro
const arr = [];
if ($) {
  arr[0] = 1;
} else {
}
$(arr);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [];
if ($) {
  a[0] = 1;
}
$( a );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
