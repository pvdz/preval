# Preval test case

# closure_to_closure.md

> Static arg ops > Assignment > Closure to closure
>
>

## Input

`````js filename=intro
let a = $();
let b = $();
function f() {
  b = a;
  $(a);
  $(b);
}
f($);
f($);
`````

## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  $(a);
  $(tmpSSA_b);
  return undefined;
};
const a /*:unknown*/ = $();
$();
let tmpSSA_b /*:unknown*/ = a;
f();
tmpSSA_b = a;
f();
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(a);
  $(tmpSSA_b);
};
const a = $();
$();
let tmpSSA_b = a;
f();
tmpSSA_b = a;
f();
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  b = a;
  $(a);
  $(b);
};
let a = $();
let b = $();
f($);
f($);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  b = a;
  $(a);
  $(b);
  return undefined;
};
let a = $();
let b = $();
f($);
f($);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( b );
  $( c );
  return undefined;
};
const b = $();
$();
let c = b;
a();
c = b;
a();
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: 
 - 3: undefined
 - 4: undefined
 - 5: undefined
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
