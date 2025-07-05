# Preval test case

# another5.md

> Self assign > Closure > Closure alias > Another5
>
> Array closure with function aliasing before first call

## Input

`````js filename=intro
// SHOULD transform (this isnt self closing)
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


## Settled


`````js filename=intro
const tmpClusterSSA_tmpSSA_a$1 /*:array*/ /*truthy*/ = [1, 2, 3];
$(tmpClusterSSA_tmpSSA_a$1);
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


- (todo) support Identifier as var init in let_hoisting noob check
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
