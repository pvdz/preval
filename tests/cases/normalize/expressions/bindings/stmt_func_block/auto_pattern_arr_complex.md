# Preval test case

# auto_pattern_arr_complex.md

> normalize > expressions > bindings > stmt_func_block > auto_pattern_arr_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let [a] = $([1, 2]);
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  let bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  $(a);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
function f() {
  const tmpCalleeParam = [1, 2];
  const bindingPatternArrRoot = $(tmpCalleeParam);
  const arrPatternSplat = [...bindingPatternArrRoot];
  const a = arrPatternSplat[0];
  $(a);
}
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2]
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
