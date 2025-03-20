# Preval test case

# feat_splat_access.md

> Tofix > feat splat access
>
> Normalization of assignments should work the same everywhere they are

index access of property result of splat is not observable so the index access can be eliminated

existing test

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (; ([a] = ($(10), $(20), [1, 2])); $(1));
$(a);
`````


## Settled


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
arrPatternSplat[0];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(10);
  $(20);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
[...bindingPatternArrRoot][0];
while (true) {
  $(10);
  $(20);
  $(1);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ...a ];
b[ 0 ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 10 );
  $( 20 );
  $( 1 );
}
`````


## Todos triggered


- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
