# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Statement > Tagged > Auto pattern arr complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$`before ${$([1, 2])} after`;
$(a);
`````

## Settled


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
const tmpCalleeParam$3 /*:array*/ = [1, 2];
const tmpCalleeParam$1 /*:unknown*/ = $(tmpCalleeParam$3);
const tmpCalleeParam /*:array*/ = [`before `, ` after`];
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const a = [...bindingPatternArrRoot][0];
const tmpCalleeParam$1 = $([1, 2]);
$([`before `, ` after`], tmpCalleeParam$1);
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
$([`before `, ` after`], $([1, 2]));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$3 = [1, 2];
const tmpCalleeParam$1 = $(tmpCalleeParam$3);
$(tmpCalleeParam, tmpCalleeParam$1);
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
const f = [ "before ", " after" ];
$( f, e );
$( c );
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
