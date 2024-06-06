# Preval test case

# auto_pattern_arr_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto pattern arr complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let [a] = { a: 999, b: 1000 };
  $([1, 2]);
  $(a);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let [a] = { a: 999, b: 1000 };
  $([1, 2]);
  $(a);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let bindingPatternArrRoot = { a: 999, b: 1000 };
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  tmpCallCallee(tmpCalleeParam);
  $(a);
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
const tmpCalleeParam = [1, 2];
$(tmpCalleeParam);
$(a);
$(undefined);
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
const d = [ 1, 2 ];
$( d );
$( c );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
