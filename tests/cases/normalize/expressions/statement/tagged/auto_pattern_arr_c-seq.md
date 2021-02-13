# Preval test case

# auto_pattern_arr_c-seq.md

> normalize > expressions > statement > tagged > auto_pattern_arr_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let [a] = { a: 999, b: 1000 };
$`before ${($(10), $(20), $([1, 2]))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
$(10);
$(20);
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = [1, 2];
const tmpCalleeParam$1 = tmpCallCallee$1(tmpCalleeParam$2);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
let bindingPatternArrRoot = { a: 999, b: 1000 };
let arrPatternSplat = [...bindingPatternArrRoot];
let a = arrPatternSplat[0];
const tmpCalleeParam = ['before ', ' after'];
$(10);
$(20);
const tmpCalleeParam$2 = [1, 2];
const tmpCalleeParam$1 = $(tmpCalleeParam$2);
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same