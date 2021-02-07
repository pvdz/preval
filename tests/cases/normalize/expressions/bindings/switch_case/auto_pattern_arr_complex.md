# Preval test case

# auto_pattern_arr_complex.md

> normalize > expressions > bindings > switch_case > auto_pattern_arr_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let [a] = $([1, 2]);
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let tmpCallCallee;
  let tmpCalleeParam;
  let bindingPatternArrRoot;
  let arrPatternSplat;
  let a;
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        tmpCallCallee = $;
        tmpCalleeParam = [1, 2];
        bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
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
tmpSwitchBreak: {
  let tmpFallthrough = false;
  let tmpIfTest = tmpFallthrough;
  if (tmpIfTest) {
  } else {
    tmpIfTest = 1 === 1;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      tmpCallCallee = $;
      tmpCalleeParam = [1, 2];
      bindingPatternArrRoot = tmpCallCallee(tmpCalleeParam);
      arrPatternSplat = [...bindingPatternArrRoot];
      a = arrPatternSplat[0];
      $(a);
    }
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: [1, 2]
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
