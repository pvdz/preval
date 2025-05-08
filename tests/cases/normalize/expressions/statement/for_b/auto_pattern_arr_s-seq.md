# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Statement > For b > Auto pattern arr s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (; $(10), $(20), [1, 2]; $(1));
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $(10);
  $(20);
  $(1);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
[...tmpBindingPatternArrRoot];
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
[ ...a ];
while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
  $( 10 );
  $( 20 );
  $( 1 );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) do we want to support ArrayExpression as expression statement in free loops?
- (todo) regular property access of an ident feels tricky;
- (todo) we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
