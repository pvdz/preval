# Preval test case

# auto_pattern_arr_c-seq.md

> normalize > expressions > bindings > stmt_func_block > auto_pattern_arr_c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let [a] = ($(10), $(20), $([1, 2]));
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  {
    $(10);
    $(20);
    const tmpCallCallee = $;
    const tmpCalleeParam = [1, 2];
    let bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
    let arrPatternSplat = [...bindingPatternArrRoot];
    let a = arrPatternSplat[0];
    $(a);
  }
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f() {
  $(10);
  $(20);
  const tmpCalleeParam = [1, 2];
  let bindingPatternArrRoot = $(tmpCalleeParam);
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  $(a);
}
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [1, 2]
 - 4: 1
 - 5: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
