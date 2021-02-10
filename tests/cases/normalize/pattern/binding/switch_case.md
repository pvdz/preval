# Preval test case

# switch_case.md

> normalize > pattern > binding > switch_case
>
> Scope of a switch block is shared between all cases so bindings need to be hoisted above it

#TODO

## Input

`````js filename=intro
switch (0) {
  case 0:
    let [a, b] = [10, 20];
    $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let bindingPatternArrRoot;
  let arrPatternSplat;
  let a;
  let b;
  {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 0 === 0;
    }
    if (tmpIfTest) {
      {
        bindingPatternArrRoot = [10, 20];
        arrPatternSplat = [...bindingPatternArrRoot];
        a = arrPatternSplat[0];
        b = arrPatternSplat[1];
        $(a, b);
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
 - 1: 10, 20
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
