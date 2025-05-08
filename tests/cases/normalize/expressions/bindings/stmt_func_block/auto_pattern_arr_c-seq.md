# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Bindings > Stmt func block > Auto pattern arr c-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  {
    let [a] = ($(10), $(20), $([1, 2]));
    $(a);
  }
}
$(f());
`````


## Settled


`````js filename=intro
$(10);
$(20);
const tmpCalleeParam /*:array*/ = [1, 2];
const tmpBindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const tmpArrPatternSplat /*:array*/ = [...tmpBindingPatternArrRoot];
const a /*:unknown*/ = tmpArrPatternSplat[0];
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$(20);
const tmpBindingPatternArrRoot = $([1, 2]);
$([...tmpBindingPatternArrRoot][0]);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
$( 20 );
const a = [ 1, 2 ];
const b = $( a );
const c = [ ...b ];
const d = c[ 0 ];
$( d );
$( undefined );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type VarStatement
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [1, 2]
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
