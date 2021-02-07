# Preval test case

# switch_case.md

> normalize > pattern > assignment > switch_case
>
> Scope of a switch block is shared between all cases so bindings need to be hoisted above it

#TODO

## Input

`````js filename=intro
switch (0) {
  case 0:
    let a = 10;
    let b = 20;
    [a, b] = [30, 40];
    $(a, b);
}
`````

## Normalized

`````js filename=intro
{
  let a;
  let b;
  tmpSwitchBreak: {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 0 === 0;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        a = 10;
        b = 20;
        const arrAssignPatternRhs = [30, 40];
        const arrPatternSplat = [...arrAssignPatternRhs];
        a = arrPatternSplat[0];
        b = arrPatternSplat[1];
        arrAssignPatternRhs;
        $(a, b);
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
    tmpIfTest = 0 === 0;
  }
  if (tmpIfTest) {
    ('case 0:');
    {
      a = 10;
      b = 20;
      const arrAssignPatternRhs = [30, 40];
      const arrPatternSplat = [...arrAssignPatternRhs];
      a = arrPatternSplat[0];
      b = arrPatternSplat[1];
      arrAssignPatternRhs;
      $(a, b);
    }
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: 30, 40
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
