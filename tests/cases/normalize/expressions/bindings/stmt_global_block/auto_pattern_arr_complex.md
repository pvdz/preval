# Preval test case

# auto_pattern_arr_complex.md

> normalize > expressions > bindings > stmt_global_block > auto_pattern_arr_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let [a] = $([1, 2]);
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  let bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  $(a);
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: [1, 2]
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
