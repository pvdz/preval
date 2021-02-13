# Preval test case

# auto_pattern_arr_c-seq.md

> normalize > expressions > bindings > stmt_global_top > auto_pattern_arr_c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let [a] = ($(10), $(20), $([1, 2]));
$(a);
`````

## Normalized

`````js filename=intro
$(10);
$(20);
const tmpCallCallee = $;
const tmpCalleeParam = [1, 2];
let bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
$(a);
`````

## Output

`````js filename=intro
$(10);
$(20);
const tmpCalleeParam = [1, 2];
let bindingPatternArrRoot = $(tmpCalleeParam);
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
$(a);
`````

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: [1, 2]
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same