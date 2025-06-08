# Preval test case

# concat_arrays_assign_nums.md

> Builtins cases > Array > Concat arrays assign nums
>
> const a = [];

## Input

`````js filename=intro
const a = [1];
const b = [2];
let c;
if ($) {
  c = a.concat(b);
}
$(c);
`````


## Settled


`````js filename=intro
if ($) {
  const tmpClusterSSA_c /*:array*/ /*truthy*/ = [1, 2];
  $(tmpClusterSSA_c);
} else {
  $(undefined);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if ($) {
  $([1, 2]);
} else {
  $(undefined);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if ($) {
  const a = [ 1, 2 ];
  $( a );
}
else {
  $( undefined );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const a = [1];
const b = [2];
let c = undefined;
if ($) {
  const tmpMCF = a.concat;
  c = $dotCall(tmpMCF, a, `concat`, b);
  $(c);
} else {
  $(c);
}
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $array_concat
- (todo) arr mutation may be able to inline this method: tmpMCF
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [1, 2]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
