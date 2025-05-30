# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Statement > For c > Auto pattern arr c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (; $(1); $(10), $(20), $([1, 2]));
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const tmpArrPatternSplat /*:array*/ = [...tmpBindingPatternArrRoot];
const a /*:unknown*/ = tmpArrPatternSplat[0];
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  $(10);
  $(20);
  const tmpCalleeParam /*:array*/ = [1, 2];
  $(tmpCalleeParam);
  while ($LOOP_UNROLL_10) {
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
      $(10);
      $(20);
      const tmpCalleeParam$1 /*:array*/ = [1, 2];
      $(tmpCalleeParam$1);
    } else {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpBindingPatternArrRoot = { a: 999, b: 1000 };
const a = [...tmpBindingPatternArrRoot][0];
if ($(1)) {
  $(10);
  $(20);
  $([1, 2]);
  while (true) {
    if ($(1)) {
      $(10);
      $(20);
      $([1, 2]);
    } else {
      break;
    }
  }
  $(a);
} else {
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
const d = $( 1 );
if (d) {
  $( 10 );
  $( 20 );
  const e = [ 1, 2 ];
  $( e );
  while ($LOOP_UNROLL_10) {
    const f = $( 1 );
    if (f) {
      $( 10 );
      $( 20 );
      const g = [ 1, 2 ];
      $( g );
    }
    else {
      break;
    }
  }
  $( c );
}
else {
  $( c );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
- (todo) regular property access of an ident feels tricky;
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
