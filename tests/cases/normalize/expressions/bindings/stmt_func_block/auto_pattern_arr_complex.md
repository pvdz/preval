# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Bindings > Stmt func block > Auto pattern arr complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let [a] = $([1, 2]);
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ /*truthy*/ = [1, 2];
const tmpBindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ /*truthy*/ = [...tmpBindingPatternArrRoot];
const a /*:unknown*/ = tmpArrPatternSplat[0];
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = $([1, 2]);
$([...tmpBindingPatternArrRoot][0]);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2 ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
$( d );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let tmpCalleeParam = [1, 2];
  let tmpBindingPatternArrRoot = $(tmpCalleeParam);
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let a = tmpArrPatternSplat[0];
  $(a);
  return undefined;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) array reads var statement with init CallExpression
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2]
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
