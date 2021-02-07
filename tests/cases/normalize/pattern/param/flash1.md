# Preval test case

# flash1.md

> normalize > pattern > param > flash1
>
> https://twitter.com/buzyescayadev/status/1343866976939098113 

The actual case contains unnecessary complexity in defaults so those were replaced:

```js
function x([[[[[[foo = (y = a??z)]= {...[a(a?.b)]}]]]]], {x: {...x}}) {}
```

## Input

`````js filename=intro
function x([[[[[[foo = x] = y]]]]], {x: {...x}}) {}
`````

## Normalized

`````js filename=intro
function x(tmpParamPattern, tmpParamPattern$1) {
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let arrPatternSplat$2 = [...arrPatternStep$1];
  let arrPatternStep$2 = arrPatternSplat$2[0];
  let arrPatternSplat$3 = [...arrPatternStep$2];
  let arrPatternStep$3 = arrPatternSplat$3[0];
  let arrPatternSplat$4 = [...arrPatternStep$3];
  let arrPatternBeforeDefault = arrPatternSplat$4[0];
  let arrPatternStep$4 = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    arrPatternStep$4 = y;
  } else {
    arrPatternStep$4 = arrPatternBeforeDefault;
  }
  let arrPatternSplat$5 = [...arrPatternStep$4];
  let arrPatternBeforeDefault$1 = arrPatternSplat$5[0];
  let foo = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    foo = x_1;
  } else {
    foo = arrPatternBeforeDefault$1;
  }
  let objPatternNoDefault = tmpParamPattern$1.x;
  const tmpCallCallee = objPatternRest;
  const tmpCalleeParam = objPatternNoDefault;
  const tmpCalleeParam$1 = [];
  const tmpCalleeParam$2 = undefined;
  let x_1 = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
}
`````

## Output

`````js filename=intro

`````

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
