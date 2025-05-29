# Preval test case

# another4.md

> Self assign > Closure > Closure alias > Another4
>
> Array closure with function aliasing before first call

## Input

`````js filename=intro
let zzzz = function() {
  debugger;
  a = [1, 2, 3];
  return a;
};
let a;
const x = zzzz;
zzzz() === zzzz();
x() !== x();
x() === zzzz();
$(a);
`````


## Settled


`````js filename=intro
const tmpClusterSSA_tmpSSA_a /*:array*/ = [1, 2, 3];
$(tmpClusterSSA_tmpSSA_a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([1, 2, 3]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2, 3 ];
$( a );
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
zzzz();
zzzz();
x();
x();
x();
zzzz();
$(a);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type ReturnStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
