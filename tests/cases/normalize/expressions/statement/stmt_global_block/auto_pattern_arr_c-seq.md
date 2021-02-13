# Preval test case

# auto_pattern_arr_c-seq.md

> normalize > expressions > statement > stmt_global_block > auto_pattern_arr_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
{
  let [a] = { a: 999, b: 1000 };
  $(10), $(20), $([1, 2]);
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let bindingPatternArrRoot = { a: 999, b: 1000 };
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  $(10);
  $(20);
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  tmpCallCallee(tmpCalleeParam);
  $(a);
}
`````

## Output

`````js filename=intro
{
  let bindingPatternArrRoot = { a: 999, b: 1000 };
  let arrPatternSplat = [...bindingPatternArrRoot];
  let a = arrPatternSplat[0];
  $(10);
  $(20);
  const tmpCalleeParam = [1, 2];
  $(tmpCalleeParam);
  $(a);
}
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same