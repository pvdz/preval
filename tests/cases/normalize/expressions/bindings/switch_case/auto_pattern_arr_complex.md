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
  let a;
  {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        const tmpCallCallee = $;
        const tmpCalleeParam = [1, 2];
        const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
        const arrPatternSplat = [...arrAssignPatternRhs];
        a = arrPatternSplat[0];
        arrAssignPatternRhs;
        $(a);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
let a;
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = [1, 2];
  const arrAssignPatternRhs = tmpCallCallee(tmpCalleeParam);
  const arrPatternSplat = [...arrAssignPatternRhs];
  a = arrPatternSplat[0];
  $(a);
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 1: [1, 2]
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
