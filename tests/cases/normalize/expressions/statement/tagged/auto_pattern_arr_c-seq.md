# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Statement > Tagged > Auto pattern arr c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$`before ${($(10), $(20), $([1, 2]))} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
$([`before `, ` after`], ($(10), $(20), $([1, 2])));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
$(10);
$(20);
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = [1, 2];
const tmpCalleeParam$1 = tmpCallCallee$1(tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
$(10);
$(20);
const tmpCalleeParam$3 = [1, 2];
const tmpCalleeParam$1 = $(tmpCalleeParam$3);
const tmpCalleeParam = [`before `, ` after`];
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  a: 999,
  b: 1000,
};
const b = [ ... a ];
const c = b[ 0 ];
$( 10 );
$( 20 );
const d = [ 1, 2 ];
const e = $( d );
const f = [ "before ", " after" ];
$( f, e );
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
