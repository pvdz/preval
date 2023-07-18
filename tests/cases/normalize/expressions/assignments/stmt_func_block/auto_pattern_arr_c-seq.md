# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Stmt func block > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let [a] = { a: 999, b: 1000 };
    [a] = ($(10), $(20), $([1, 2]));
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let [a] = { a: 999, b: 1000 };
    [a] = ($(10), $(20), $([1, 2]));
    $(a);
  }
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
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat$1 = [...arrAssignPatternRhs];
  a = arrPatternSplat$1[0];
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
arrPatternSplat[0];
$(10);
$(20);
const tmpCalleeParam = [1, 2];
const arrAssignPatternRhs = $(tmpCalleeParam);
const arrPatternSplat$1 = [...arrAssignPatternRhs];
const tmpClusterSSA_a = arrPatternSplat$1[0];
$(tmpClusterSSA_a);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = [ ... a,, ];
b[ 0 ];
$( 10 );
$( 20 );
const c = [ 1, 2,, ];
const d = $( c );
const e = [ ... d,, ];
const f = e[ 0 ];
$( f );
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
