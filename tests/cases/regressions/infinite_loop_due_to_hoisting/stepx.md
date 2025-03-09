# Preval test case

# stepx.md

> Regressions > Infinite loop due to hoisting > Stepx
>
> This was after some steps. I think it should be finished here.

## Input

`````js filename=intro
function g() {}
var tmpBinaryLeft;
var tmpArg;
var tmpTernaryTest;
tmpBinaryLeft = a.x;
tmpTernaryTest = tmpBinaryLeft === 1;
if (tmpTernaryTest) {
  tmpArg = 2;
} else {
  tmpArg = 3;
}
f(tmpArg);
`````

## Settled


`````js filename=intro
const tmpBinaryLeft /*:unknown*/ = a.x;
const tmpTernaryTest /*:boolean*/ = tmpBinaryLeft === 1;
if (tmpTernaryTest) {
  f(2);
} else {
  f(3);
}
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
if (a.x === 1) {
  f(2);
} else {
  f(3);
}
`````

## Pre Normal


`````js filename=intro
let tmpArg = undefined;
let tmpBinaryLeft = undefined;
let tmpTernaryTest = undefined;
let g = function () {
  debugger;
};
tmpBinaryLeft = a.x;
tmpTernaryTest = tmpBinaryLeft === 1;
if (tmpTernaryTest) {
  tmpArg = 2;
} else {
  tmpArg = 3;
}
f(tmpArg);
`````

## Normalized


`````js filename=intro
let tmpArg = undefined;
let tmpBinaryLeft = undefined;
let tmpTernaryTest = undefined;
let g = function () {
  debugger;
  return undefined;
};
tmpBinaryLeft = a.x;
tmpTernaryTest = tmpBinaryLeft === 1;
if (tmpTernaryTest) {
  tmpArg = 2;
  f(tmpArg);
} else {
  tmpArg = 3;
  f(tmpArg);
}
`````

## PST Settled
With rename=true

`````js filename=intro
const b = a.x;
const c = b === 1;
if (c) {
  f( 2 );
}
else {
  f( 3 );
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

a, f

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
