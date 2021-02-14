# Preval test case

# auto_pattern_arr_s-seq.md

> normalize > expressions > statement > stmt_global_block > auto_pattern_arr_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
{
  let [a] = { a: 999, b: 1000 };
  $(10), $(20), [1, 2];
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
  $(a);
}
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
