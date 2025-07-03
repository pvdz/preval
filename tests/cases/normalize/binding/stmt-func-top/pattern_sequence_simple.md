# Preval test case

# pattern_sequence_simple.md

> Normalize > Binding > Stmt-func-top > Pattern sequence simple
>
> Assignments of all kinds should be normalized in all circumstances

## Input

`````js filename=intro
function f() {
  let x = 1, y = 2, z = [10, 20, 30];
  let [a, b] = ($(x), $(y), z);
  $(a, b, x, y, z);
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
$(2);
const z /*:array*/ /*truthy*/ = [10, 20, 30];
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...z];
const a /*:unknown*/ = tmpArrPatternSplat[0];
const b /*:unknown*/ = tmpArrPatternSplat[1];
$(a, b, 1, 2, z);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const z = [10, 20, 30];
const tmpArrPatternSplat = [...z];
$(tmpArrPatternSplat[0], tmpArrPatternSplat[1], 1, 2, z);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = [ 10, 20, 30 ];
const b = [ ...a ];
const c = b[ 0 ];
const d = b[ 1 ];
$( c, d, 1, 2, a );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  let y = 2;
  let z = [10, 20, 30];
  $(x);
  $(y);
  let tmpBindingPatternArrRoot = z;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let a = tmpArrPatternSplat[0];
  let b = tmpArrPatternSplat[1];
  $(a, b, x, y, z);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init ArrayExpression
- (todo) support array reads statement type ExpressionStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 10, 20, 1, 2, [10, 20, 30]
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
