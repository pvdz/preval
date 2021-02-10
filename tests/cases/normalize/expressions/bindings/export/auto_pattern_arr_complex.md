# Preval test case

# auto_pattern_arr_complex.md

> normalize > expressions > bindings > export > auto_pattern_arr_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let [a] = $([1, 2]);
$(a);
`````

## Normalized

`````js filename=intro
const tmpCallCallee = $;
const tmpCalleeParam = [1, 2];
let bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
export { a };
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
