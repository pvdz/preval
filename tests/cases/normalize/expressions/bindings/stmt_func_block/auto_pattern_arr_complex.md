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
const tmpCalleeParam /*:array*/ = [1, 2];
const bindingPatternArrRoot /*:unknown*/ = $(tmpCalleeParam);
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
$(a);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = $([1, 2]);
$([...bindingPatternArrRoot][0]);
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


## Todos triggered


- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


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
