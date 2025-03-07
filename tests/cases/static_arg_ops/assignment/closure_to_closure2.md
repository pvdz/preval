# Preval test case

# closure_to_closure2.md

> Static arg ops > Assignment > Closure to closure2
>
>

## Input

`````js filename=intro
const a = $(); let b = 2; function f() { b = a; $(a); $(b); }; f(); f(); $(a, b);
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
let tmpSSA_b /*:unknown*/ = a;
f();
tmpSSA_b = a;
f();
$(a, tmpSSA_b);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(a);
  $(tmpSSA_b);
};
const a = $();
let tmpSSA_b = a;
f();
tmpSSA_b = a;
f();
$(a, tmpSSA_b);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  b = a;
  $(a);
  $(b);
};
const a = $();
let b = 2;
f();
f();
$(a, b);
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
const a = $();
let b = 2;
f();
f();
$(a, b);
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
let c = b;
a();
c = b;
a();
$( b, c );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 
 - 2: undefined
 - 3: undefined
 - 4: undefined
 - 5: undefined
 - 6: undefined, undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
