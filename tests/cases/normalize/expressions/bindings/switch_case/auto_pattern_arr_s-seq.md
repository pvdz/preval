# Preval test case

# auto_pattern_arr_s-seq.md

> normalize > expressions > bindings > switch_case > auto_pattern_arr_s-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let [a] = ($(10), $(20), [1, 2]);
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let bindingPatternArrRoot;
  let arrPatternSplat;
  let a;
  {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      {
        $(10);
        $(20);
        bindingPatternArrRoot = [1, 2];
        arrPatternSplat = [...bindingPatternArrRoot];
        a = arrPatternSplat[0];
        $(a);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 10
 - 2: 20
 - 3: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
