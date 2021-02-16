# Preval test case

# auto_pattern_arr_s-seq.md

> normalize > expressions > bindings > stmt_func_block > auto_pattern_arr_s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let [a] = ($(10), $(20), [1, 2]);
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  $(10);
  $(20);
  let bindingPatternArrRoot = [1, 2];
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  $(a);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  $(10);
  $(20);
  const bindingPatternArrRoot = [1, 2];
  const arrPatternSplat = [...bindingPatternArrRoot];
  const a = arrPatternSplat[0];
  $(a);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 1
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
