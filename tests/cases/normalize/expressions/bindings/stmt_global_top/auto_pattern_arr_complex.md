# Preval test case

# auto_pattern_arr_complex.md

> normalize > expressions > bindings > stmt_global_top > auto_pattern_arr_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = $([1, 2]);
$(a);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [1, 2];
let bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [1, 2];
const bindingPatternArrRoot = $(tmpCalleeParam);
const arrPatternSplat = [...bindingPatternArrRoot];
const a = arrPatternSplat[0];
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: [1, 2]
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
