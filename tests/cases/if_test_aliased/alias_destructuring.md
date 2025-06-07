# Preval test case

# alias_destructuring.md

> If test aliased > Alias destructuring
>
> destructuring: let alias declared with destructuring, should NOT replace $(a)

## Input

`````js filename=intro
let [a] = [!c];
if (c) {
  $(a); // expect: $(a)
}
`````


## Settled


`````js filename=intro
if (c) {
  $(false);
} else {
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
if (c) {
  $(false);
}
`````


## PST Settled
With rename=true

`````js filename=intro
if (c) {
  $( false );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement = !c;
let tmpBindingPatternArrRoot = [tmpArrElement];
let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
let a = tmpArrPatternSplat[0];
if (c) {
  $(a);
} else {
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) can we always safely clone ident refs in this case?
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


BAD@! Found 1 implicit global bindings:

c


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
