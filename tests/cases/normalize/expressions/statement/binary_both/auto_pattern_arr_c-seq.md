# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Statement > Binary both > Auto pattern arr c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
($(10), $(20), $([1, 2])) + ($(10), $(20), $([1, 2]));
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
($(10), $(20), $([1, 2])) + ($(10), $(20), $([1, 2]));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
$(10);
$(20);
const tmpCallCallee = $;
const tmpCalleeParam = [1, 2];
const tmpBinBothLhs = tmpCallCallee(tmpCalleeParam);
$(10);
$(20);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = [1, 2];
const tmpBinBothRhs = tmpCallCallee$1(tmpCalleeParam$1);
tmpBinBothLhs + tmpBinBothRhs;
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
$(10);
$(20);
const tmpCalleeParam /*:array*/ = [1, 2];
const tmpBinBothLhs /*:unknown*/ = $(tmpCalleeParam);
$(10);
$(20);
const tmpCalleeParam$1 /*:array*/ = [1, 2];
const tmpBinBothRhs /*:unknown*/ = $(tmpCalleeParam$1);
tmpBinBothLhs + tmpBinBothRhs;
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
$( 10 );
$( 20 );
const d = [ 1, 2 ];
const e = $( d );
$( 10 );
$( 20 );
const f = [ 1, 2 ];
const g = $( f );
e + g;
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
