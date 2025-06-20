# Preval test case

# nested.md

> Tofix > nested

Function that ends with returning a self-contained value can maybe be outlined? Not sure if this risks bloat.

## Input

`````js filename=intro
const g = function () {
  debugger;
  const a = [1, 2, 3];
  const b = [1, 2, 3];
  const ab = a === b;
  $(ab);
  const c = [1, 2, 3];
  const d = [1, 2, 3];
  const cd = c !== d;
  $(cd);
  const e = [1, 2, 3];
  const f = [1, 2, 3];
  const ef = e === f;
  $(ef);
  const g = [1, 2, 3]; // <- could just outline this right
  return g;
};
const x = g();
const y = g();
const xy = x === y;
$(xy);
const z = g();
$(z);
`````


## Settled


`````js filename=intro
const g /*:()=>array*/ = function () {
  debugger;
  $(false);
  $(true);
  $(false);
  const g$1 /*:array*/ /*truthy*/ = [1, 2, 3];
  return g$1;
};
const x /*:array*/ /*truthy*/ = g();
const y /*:array*/ /*truthy*/ = g();
const xy /*:boolean*/ = x === y;
$(xy);
const z /*:array*/ /*truthy*/ = g();
$(z);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function () {
  $(false);
  $(true);
  $(false);
  const g$1 = [1, 2, 3];
  return g$1;
};
const x = g();
$(x === g());
$(g());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( false );
  $( true );
  $( false );
  const b = [ 1, 2, 3 ];
  return b;
};
const c = a();
const d = a();
const e = c === d;
$( e );
const f = a();
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const g = function () {
  debugger;
  const a = [1, 2, 3];
  const b = [1, 2, 3];
  const ab = a === b;
  $(ab);
  const c = [1, 2, 3];
  const d = [1, 2, 3];
  const cd = c !== d;
  $(cd);
  const e = [1, 2, 3];
  const f = [1, 2, 3];
  const ef = e === f;
  $(ef);
  const g$1 = [1, 2, 3];
  return g$1;
};
const x = g();
const y = g();
const xy = x === y;
$(xy);
const z = g();
$(z);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type ReturnStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: true
 - 3: false
 - 4: false
 - 5: true
 - 6: false
 - 7: false
 - 8: false
 - 9: true
 - 10: false
 - 11: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
