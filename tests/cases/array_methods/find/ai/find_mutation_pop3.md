# Preval test case

# find_mutation_pop3.md

> Array methods > Find > Ai > Find mutation pop3
>
> Test: Array.find with pop during iteration

## Input

`````js filename=intro
      const arr /*:array*/ /*truthy*/ = [ 1, 2, 3 ];
const result /*:array*/ /*truthy*/ = [];
const tmpArrel /*:primitive*/ = arr[0];
$dotCall($array_unshift, result, `unshift`, tmpArrel);
$dotCall($array_shift, arr, `shift`);
let tmpClusterSSA_tmpArri /*:number*/ = 1;
while ($LOOP_UNROLL_10) {
  const tmpArrc$1 /*:boolean*/ = tmpClusterSSA_tmpArri < 3;
  if (tmpArrc$1) {
    const tmpArrel$1 /*:primitive*/ = arr[tmpClusterSSA_tmpArri];
    $dotCall($array_unshift, result, `unshift`, tmpArrel$1);
    $dotCall($array_shift, arr, `shift`);
    tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
  } else {
    break;
  }
}
$(result, undefined);
`````


## Settled


`````js filename=intro
const result /*:array*/ /*truthy*/ = [undefined, 3, 1];
$(result, undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([undefined, 3, 1], undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ undefined, 3, 1 ];
$( a, undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const arr = [1, 2, 3];
const result = [];
const tmpArrel = arr[0];
$dotCall($array_unshift, result, `unshift`, tmpArrel);
$dotCall($array_shift, arr, `shift`);
let tmpClusterSSA_tmpArri = 1;
while ($LOOP_UNROLL_10) {
  const tmpArrc$1 = tmpClusterSSA_tmpArri < 3;
  if (tmpArrc$1) {
    const tmpArrel$1 = arr[tmpClusterSSA_tmpArri];
    $dotCall($array_unshift, result, `unshift`, tmpArrel$1);
    $dotCall($array_shift, arr, `shift`);
    tmpClusterSSA_tmpArri = tmpClusterSSA_tmpArri + 1;
  } else {
    break;
  }
}
$(result, undefined);
`````


## Todos triggered


- (todo) - at least one of the frfr args was not isFree, bailing
- (todo) Support this ident in isFree CallExpression: $array_unshift
- (todo) do we want to support Literal as expression statement in free loops?
- (todo) find me fast
- (todo) outline any args for tdz
- (todo) regular property access of an ident feels tricky;
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: [undefined, 3, 1], undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
