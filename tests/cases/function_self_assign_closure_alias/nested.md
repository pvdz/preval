# Preval test case

# nested.md

> Function self assign closure alias > Nested

## Input

`````js filename=intro
function g() {
  let zzzz = function() {
    debugger;
    a = [1,2,3];
    return a;
  };
  let a;
  const x = zzzz;
  $(zzzz() === zzzz());
  $(x() !== x());
  $(x() === zzzz());
  return zzzz();
}
$(g() === g());
$(g());
`````


## Settled


`````js filename=intro
const g /*:()=>array*/ = function () {
  debugger;
  $(false);
  $(true);
  $(false);
  const tmpClusterSSA_a$9 /*:array*/ = [1, 2, 3];
  return tmpClusterSSA_a$9;
};
const tmpBinBothLhs$5 /*:array*/ = g();
const tmpBinBothRhs$5 /*:array*/ = g();
const tmpCalleeParam$5 /*:boolean*/ = tmpBinBothLhs$5 === tmpBinBothRhs$5;
$(tmpCalleeParam$5);
const tmpCalleeParam$7 /*:array*/ = g();
$(tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function () {
  $(false);
  $(true);
  $(false);
  const tmpClusterSSA_a$9 = [1, 2, 3];
  return tmpClusterSSA_a$9;
};
const tmpBinBothLhs$5 = g();
$(tmpBinBothLhs$5 === g());
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


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type ReturnStatement
- (todo) support array reads statement type VarStatement


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
