# Preval test case

# nested.md

> Self assign > Nested
>
> This isn't what the classic sealer pattern looks like so whatever

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
const g /*:()=>unknown*/ = function () {
  debugger;
  $(false);
  $(true);
  $(false);
  return undefined;
};
g();
g();
$(false);
g();
const tmpCalleeParam$7 /*:array*/ /*truthy*/ = [1, 2, 3];
$(tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function () {
  $(false);
  $(true);
  $(false);
};
g();
g();
$(false);
g();
$([1, 2, 3]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( false );
  $( true );
  $( false );
  return undefined;
};
a();
a();
$( false );
a();
const b = [ 1, 2, 3 ];
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let g = function () {
  debugger;
  let zzzz = function () {
    debugger;
    a = [1, 2, 3];
    return a;
  };
  let a = undefined;
  const x = zzzz;
  const tmpBinBothLhs = zzzz();
  const tmpBinBothRhs = zzzz();
  let tmpCalleeParam = tmpBinBothLhs === tmpBinBothRhs;
  $(tmpCalleeParam);
  const tmpBinBothLhs$1 = x();
  const tmpBinBothRhs$1 = x();
  let tmpCalleeParam$1 = tmpBinBothLhs$1 !== tmpBinBothRhs$1;
  $(tmpCalleeParam$1);
  const tmpBinBothLhs$3 = x();
  const tmpBinBothRhs$3 = zzzz();
  let tmpCalleeParam$3 = tmpBinBothLhs$3 === tmpBinBothRhs$3;
  $(tmpCalleeParam$3);
  const tmpReturnArg = zzzz();
  return tmpReturnArg;
};
const tmpBinBothLhs$5 = g();
const tmpBinBothRhs$5 = g();
let tmpCalleeParam$5 = tmpBinBothLhs$5 === tmpBinBothRhs$5;
$(tmpCalleeParam$5);
let tmpCalleeParam$7 = g();
$(tmpCalleeParam$7);
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
