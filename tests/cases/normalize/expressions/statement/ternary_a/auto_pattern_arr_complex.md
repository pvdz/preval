# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Statement > Ternary a > Auto pattern arr complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$([1, 2]) ? $(100) : $(200);
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
$([1, 2]) ? $(100) : $(200);
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCalleeParam = [1, 2];
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
const tmpCalleeParam /*:array*/ = [1, 2];
const tmpIfTest /*:unknown*/ = $(tmpCalleeParam);
if (tmpIfTest) {
  $(100);
} else {
  $(200);
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
const d = [ 1, 2 ];
const e = $( d );
if (e) {
  $( 100 );
}
else {
  $( 200 );
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