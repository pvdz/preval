# Preval test case

# auto_pattern_arr_complex.md

> normalize > expressions > statement > stmt_func_block > auto_pattern_arr_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let [a] = { a: 999, b: 1000 };
    $([1, 2]);
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
    const tmpCallCallee = $;
    const tmpCalleeParam = [1, 2];
    tmpCallCallee(tmpCalleeParam);
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
  {
    let bindingPatternArrRoot = { a: 999, b: 1000 };
    let arrPatternSplat = [...bindingPatternArrRoot];
    let a = arrPatternSplat[0];
    const tmpCalleeParam = [1, 2];
    $(tmpCalleeParam);
    $(a);
  }
}
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same