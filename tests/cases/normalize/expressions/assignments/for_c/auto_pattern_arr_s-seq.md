# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Assignments > For c > Auto pattern arr s-seq
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
for (; $(1); [a] = ($(10), $(20), [1, 2]));
$(a);
`````


## Settled


`````js filename=intro
const tmpBindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const tmpArrPatternSplat /*:array*/ = [...tmpBindingPatternArrRoot];
const a /*:unknown*/ = tmpArrPatternSplat[0];
const tmpIfTest /*:unknown*/ = $(1);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(10);
    $(20);
    const tmpIfTest$1 /*:unknown*/ = $(1);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
  $(1);
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
  while (true) {
    $(10);
    $(20);
    if (!$(1)) {
      break;
    }
  }
  $(1);
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
  while ($LOOP_UNROLL_10) {
    $( 10 );
    $( 20 );
    const e = $( 1 );
    if (e) {

    }
    else {
      break;
    }
  }
  $( 1 );
}
else {
  $( c );
}
`````


## Todos triggered


- (todo) Deal with array spreads in arr mutation?
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
