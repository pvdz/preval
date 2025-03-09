# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Statement > While > Auto pattern arr complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
while ($([1, 2])) $(100);
$(a);
`````

## Settled


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
const tmpCalleeParam /*:array*/ = [1, 2];
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    const tmpCalleeParam$1 /*:array*/ = [1, 2];
    const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpIfTest$1) {
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
const bindingPatternArrRoot = { a: 999, b: 1000 };
const a = [...bindingPatternArrRoot][0];
if ($([1, 2])) {
  while (true) {
    $(100);
    if (!$([1, 2])) {
      break;
    }
  }
  $(a);
} else {
  $(a);
}
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
while ($([1, 2])) $(100);
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
while (true) {
  const tmpCalleeParam = [1, 2];
  const tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
    $(100);
  } else {
    break;
  }
}
$(a);
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
const d = [ 1, 2 ];
const e = $( d );
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    const f = [ 1, 2 ];
    const g = $( f );
    if (g) {

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

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope