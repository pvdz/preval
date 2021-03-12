# Preval test case

# auto_pattern_arr_s-seq.md

> Normalize > Expressions > Statement > Return > Auto pattern arr s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
function f() {
  return $(10), $(20), [1, 2];
}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return $(10), $(20), [1, 2];
};
let [a] = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  $(10);
  $(20);
  const tmpReturnArg = [1, 2];
  return tmpReturnArg;
};
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  $(10);
  $(20);
  const tmpReturnArg = [1, 2];
  return tmpReturnArg;
};
const bindingPatternArrRoot = { a: 999, b: 1000 };
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
