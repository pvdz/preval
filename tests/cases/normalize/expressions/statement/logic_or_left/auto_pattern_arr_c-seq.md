# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Statement > Logic or left > Auto pattern arr c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
($(10), $(20), $([1, 2])) || $(100);
$(a);
`````

## Pre Normal


`````js filename=intro
let [a] = { a: 999, b: 1000 };
($(10), $(20), $([1, 2])) || $(100);
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
const tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
} else {
  $(100);
}
$(a);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
$(10);
$(20);
const tmpCalleeParam = [1, 2];
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  $(100);
}
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = [ ... a ];
const c = b[ 0 ];
$( 10 );
$( 20 );
const d = [ 1, 2 ];
const e = $( d );
if (e) {

}
else {
  $( 100 );
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
