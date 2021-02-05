# Preval test case

# auto_pattern_arr_s-seq.md

> normalize > expressions > assignments > stmt_func_block > auto_pattern_arr_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let [a] = { a: 999, b: 1000 };
    [a] = ($(10), $(20), [1, 2]);
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    let bindingPatternArrRoot = { a: 999, b: 1000 };
    let arrPatternSplat = [...bindingPatternArrRoot];
    let a = arrPatternSplat[0];
    $(10);
    $(20);
    const arrAssignPatternRhs = [1, 2];
    const arrPatternSplat$1 = [...arrAssignPatternRhs];
    a = arrPatternSplat$1[0];
    arrAssignPatternRhs;
    $(a);
  }
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  let bindingPatternArrRoot = { a: 999, b: 1000 };
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  $(10);
  $(20);
  const arrAssignPatternRhs = [1, 2];
  const arrPatternSplat$1 = [...arrAssignPatternRhs];
  a = arrPatternSplat$1[0];
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
