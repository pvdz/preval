# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Statement > Logic or right > Auto pattern arr c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$(100) || ($(10), $(20), $([1, 2]));
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const tmpArrPatternSplat /*:array*/ = [...tmpBindingPatternArrRoot];
const a /*:unknown*/ = tmpArrPatternSplat[0];
const tmpIfTest /*:unknown*/ = $(100);
if (tmpIfTest) {
  $(a);
} else {
  $(10);
  $(20);
  const tmpCalleeParam /*:array*/ = [1, 2];
  $(tmpCalleeParam);
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
const a = [...tmpBindingPatternArrRoot][0];
if ($(100)) {
  $(a);
} else {
  $(10);
  $(20);
  $([1, 2]);
  $(a);
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
const c = b[ 0 ];
const d = $( 100 );
if (d) {
  $( c );
}
else {
  $( 10 );
  $( 20 );
  const e = [ 1, 2 ];
  $( e );
  $( c );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) support array reads statement type ExpressionStatement
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
