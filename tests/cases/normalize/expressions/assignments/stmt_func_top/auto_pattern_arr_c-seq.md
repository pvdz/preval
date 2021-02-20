# Preval test case

# auto_pattern_arr_c-seq.md

> Normalize > Expressions > Assignments > Stmt func top > Auto pattern arr c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let [a] = { a: 999, b: 1000 };
  [a] = ($(10), $(20), $([1, 2]));
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
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
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f() {
  const bindingPatternArrRoot = { a: 999, b: 1000 };
  const arrPatternSplat = [...bindingPatternArrRoot];
  arrPatternSplat[0];
  $(10);
  $(20);
  const tmpCalleeParam = [1, 2];
  const arrAssignPatternRhs = $(tmpCalleeParam);
  const arrPatternSplat$1 = [...arrAssignPatternRhs];
  const SSA_a = arrPatternSplat$1[0];
  $(SSA_a);
}
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
