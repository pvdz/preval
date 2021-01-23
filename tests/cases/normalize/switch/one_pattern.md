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
  {
    let tmpFallthrough = false;
    {
      let ifTestTmp = tmpFallthrough;
      if (ifTestTmp) {
      } else {
        ifTestTmp = 1 === 1;
      }
      if (ifTestTmp) {
        ('case 0:');
        {
          bindingPatternArrRoot = [4, 5, 6];
          arrPatternSplat = [...bindingPatternArrRoot];
          x = arrPatternSplat[0];
        }
        tmpFallthrough = true;
      }
    }
    {
      let ifTestTmp$1 = tmpFallthrough;
      if (ifTestTmp$1) {
      } else {
        ifTestTmp$1 = 1 === 2;
      }
      if (ifTestTmp$1) {
        ('case 1:');
        {
          $(x);
        }
        tmpFallthrough = true;
      }
    }
  }
}
`````

## Output

`````js filename=intro
let bindingPatternArrRoot;
let arrPatternSplat;
let x;
let tmpFallthrough = false;
let ifTestTmp = tmpFallthrough;
if (ifTestTmp) {
} else {
  ifTestTmp = true;
}
if (ifTestTmp) {
  bindingPatternArrRoot = [4, 5, 6];
  arrPatternSplat = [...bindingPatternArrRoot];
  x = arrPatternSplat[0];
  tmpFallthrough = true;
}
let ifTestTmp$1 = tmpFallthrough;
if (ifTestTmp$1) {
} else {
  ifTestTmp$1 = false;
}
if (ifTestTmp$1) {
  $(x);
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 0: 4
 - 1: undefined

Normalized calls: Same

Final output calls: Same
