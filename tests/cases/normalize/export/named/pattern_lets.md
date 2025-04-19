# Preval test case

# pattern_lets.md

> Normalize > Export > Named > Pattern lets
>
> Exporting declarations

## Input

`````js filename=intro
export let [a, b, {c: [d]}] = [1, 2, {c: [3]}];
$(a, b, d);
`````


## Settled


`````js filename=intro
const a /*:number*/ = 1;
const b /*:number*/ = 2;
const d /*:number*/ = 3;
export { a, b, d };
$(1, 2, 3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = 1;
const b = 2;
const d = 3;
export { a, b, d };
$(1, 2, 3);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = 1;
const b = 2;
const c = 3;
export { a as a,b as b,c as d };
$( 1, 2, 3 );
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- (todo) can we always safely clone ident refs in this case?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
