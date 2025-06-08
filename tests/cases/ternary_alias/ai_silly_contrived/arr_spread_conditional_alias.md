# Preval test case

# arr_spread_conditional_alias.md

> Ternary alias > Ai silly contrived > Arr spread conditional alias
>
> Conditional alias with array spread and two variables assigned in one branch

## Input

`````js filename=intro
let a = undefined;
let spreadSource = undefined;
let cond = $(true);
if (cond) {
  // nothing
} else {
  a = 42;
  spreadSource = a;
}
const arr = [...spreadSource];
$(arr);
$(a);
//
// Expect: No aliasing, both a and spreadSource are only assigned in one branch
`````


## Settled


`````js filename=intro
let a /*:primitive*/ /*ternaryConst*/ = undefined;
const cond /*:unknown*/ = $(true);
if (cond) {
} else {
  a = 42;
}
const arr /*:array*/ /*truthy*/ = [...a];
$(arr);
$(a);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let a = undefined;
if (!$(true)) {
  a = 42;
}
$([...a]);
$(a);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = undefined;
const b = $( true );
if (b) {

}
else {
  a = 42;
}
const c = [ ...a ];
$( c );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let spreadSource = undefined;
let cond = $(true);
if (cond) {
} else {
  a = 42;
  spreadSource = a;
}
const arr = [...spreadSource];
$(arr);
$(a);
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: true
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
