# Preval test case

# another3.md

> Self assign > Closure > Closure alias > Another3
>
> Array closure with function aliasing before first call

## Input

`````js filename=intro
// SHOULD transform (this isnt self closing)
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
`````


## Settled


`````js filename=intro
$(false);
$(true);
$(false);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(false);
$(true);
$(false);
`````


## PST Settled
With rename=true

`````js filename=intro
$( false );
$( true );
$( false );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
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
`````


## Todos triggered


- (todo) array reads var statement with init BinaryExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type ReturnStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: false
 - 2: true
 - 3: false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
