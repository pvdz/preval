# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Bindings > Stmt func top > Auto pattern arr s-seq
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let [a] = ($(10), $(20), [1, 2]);
  $(a);
}
$(f());
`````


## Settled


`````js filename=intro
$(10);
$(20);
$(1);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(10);
$(20);
$(1);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 10 );
$( 20 );
$( 1 );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  $(10);
  $(20);
  let tmpBindingPatternArrRoot = [1, 2];
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let a = tmpArrPatternSplat[0];
  $(a);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support ExpressionStatement as statement in let_hoisting noob check
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
