# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Statement > Stmt func top > Auto pattern arr s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let [a] = { a: 999, b: 1000 };
  $(10), $(20), [1, 2];
  $(a);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let [a] = { a: 999, b: 1000 };
  $(10), $(20), [1, 2];
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
  $(10);
  $(20);
  $(a);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
const bindingPatternArrRoot /*:object*/ = { a: 999, b: 1000 };
const arrPatternSplat /*:array*/ = [...bindingPatternArrRoot];
const a /*:unknown*/ = arrPatternSplat[0];
$(10);
$(20);
$(a);
$(undefined);
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

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope