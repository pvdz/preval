# Preval test case

# auto_pattern_arr_s-seq.md

> normalize > expressions > bindings > export > auto_pattern_arr_s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
export let [a] = ($(10), $(20), [1, 2]);
$(a);
`````

## Normalized

`````js filename=intro
$(10);
$(20);
let bindingPatternArrRoot = [1, 2];
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
