# Preval test case

# one_pattern.md

> normalize > switch > one_pattern
>
> A switch that contains a pattern needs to have that pattern to be normalized before being able to decompose the switch itself because all bindings need to be declared before the switch in order to make the decomposition safe/correct.

Should end up something like this (will take some time before we get there :p)

```js
let bindingPatternArrRoot = [4, 5, 6];
let arrPatternSplat = [...bindingPatternArrRoot];
let x = arrPatternSplat[0];
$(x);
```


#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let [x] = [4, 5, 6];
  case 2:
    $(x);
}
`````

## Normalized

`````js filename=intro
{
  let bindingPatternArrRoot;
  let arrPatternSplat;
  let x;
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
        bindingPatternArrRoot = [4, 5, 6];
        arrPatternSplat = [...bindingPatternArrRoot];
        x = arrPatternSplat[0];
      }
      tmpFallthrough = true;
    }
    let tmpIfTest$1 = tmpFallthrough;
    if (tmpIfTest$1) {
    } else {
      tmpIfTest$1 = 1 === 2;
    }
    if (tmpIfTest$1) {
      ('case 1:');
      {
        $(x);
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
      bindingPatternArrRoot = [4, 5, 6];
      arrPatternSplat = [...bindingPatternArrRoot];
      x = arrPatternSplat[0];
    }
    tmpFallthrough = true;
  }
  let tmpIfTest$1 = tmpFallthrough;
  if (tmpIfTest$1) {
  } else {
    tmpIfTest$1 = 1 === 2;
  }
  if (tmpIfTest$1) {
    ('case 1:');
    {
      $(x);
    }
    tmpFallthrough = true;
  }
}
`````

## Result

Should call `$` with:
 - 1: 4
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
