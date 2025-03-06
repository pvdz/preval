# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Statement > Do while > Auto pattern arr c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
do {
  $(100);
} while (($(10), $(20), $([1, 2])));
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
while (true) {
  {
    $(100);
  }
  if (($(10), $(20), $([1, 2]))) {
  } else {
    break;
  }
}
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
while (true) {
  $(100);
  $(10);
  $(20);
  const tmpCalleeParam = [1, 2];
  const tmpIfTest = $(tmpCalleeParam);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
$(100);
$(10);
$(20);
const tmpCalleeParam /*:array*/ = [1, 2];
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
  while ($LOOP_UNROLL_10) {
    $(100);
    $(10);
    $(20);
    const tmpCalleeParam$1 /*:array*/ = [1, 2];
    const tmpIfTest$1 /*:unknown*/ = $(tmpCalleeParam$1);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
} else {
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ...a ];
const c = b[ 0 ];
$( 100 );
$( 10 );
$( 20 );
const d = [ 1, 2 ];
const e = $( d );
if (e) {
  while ($LOOP_UNROLL_10) {
    $( 100 );
    $( 10 );
    $( 20 );
    const f = [ 1, 2 ];
    const g = $( f );
    if (g) {

    }
    else {
      break;
    }
  }
}
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope