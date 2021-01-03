# Preval test case

# flash1.md

> normalize > pattern > param > flash1
>
> https://twitter.com/buzyescayadev/status/1343866976939098113 

The actual case contains unnecessary complexity in defaults so those were replaced:

```js
const [[[[[[foo = (y = a??z)]= {...[a(a?.b)]}]]]]] = 1, {x: {...x}} = 1;
```

## Input

`````js filename=intro
function x([[[[[[foo = x] = y]]]]], {x: {...x}}) {}
`````

## Normalized

`````js filename=intro
function x_1(tmpParamPattern, tmpParamPattern_1) {
  var tmpTernaryTest;
  var tmpTernaryTest_1;
  let objPatternNoDefault = tmpParamPattern_1.x;
  let x_1 = objPatternRest(objPatternNoDefault, []);
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternStep_1 = arrPatternSplat_1[0];
  let arrPatternSplat_2 = [...arrPatternStep_1];
  let arrPatternStep_2 = arrPatternSplat_2[0];
  let arrPatternSplat_3 = [...arrPatternStep_2];
  let arrPatternStep_3 = arrPatternSplat_3[0];
  let arrPatternSplat_4 = [...arrPatternStep_3];
  let arrPatternBeforeDefault = arrPatternSplat_4[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let arrPatternStep_4 = tmpTernaryTest ? y : arrPatternBeforeDefault;
  let arrPatternSplat_5 = [...arrPatternStep_4];
  let arrPatternBeforeDefault_1 = arrPatternSplat_5[0];
  tmpTernaryTest_1 = arrPatternBeforeDefault_1 === undefined;
  let foo = tmpTernaryTest_1 ? x_1 : arrPatternBeforeDefault_1;
}
`````

## Output

`````js filename=intro
function x_1(tmpParamPattern, tmpParamPattern_1) {
  var tmpTernaryTest;
  var tmpTernaryTest_1;
  let objPatternNoDefault = tmpParamPattern_1.x;
  let x_1 = objPatternRest(objPatternNoDefault, []);
  let arrPatternSplat = [...tmpParamPattern];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat_1 = [...arrPatternStep];
  let arrPatternStep_1 = arrPatternSplat_1[0];
  let arrPatternSplat_2 = [...arrPatternStep_1];
  let arrPatternStep_2 = arrPatternSplat_2[0];
  let arrPatternSplat_3 = [...arrPatternStep_2];
  let arrPatternStep_3 = arrPatternSplat_3[0];
  let arrPatternSplat_4 = [...arrPatternStep_3];
  let arrPatternBeforeDefault = arrPatternSplat_4[0];
  tmpTernaryTest = arrPatternBeforeDefault === undefined;
  let arrPatternStep_4 = tmpTernaryTest ? y : arrPatternBeforeDefault;
  let arrPatternSplat_5 = [...arrPatternStep_4];
  let arrPatternBeforeDefault_1 = arrPatternSplat_5[0];
  tmpTernaryTest_1 = arrPatternBeforeDefault_1 === undefined;
  tmpTernaryTest_1 ? x_1 : arrPatternBeforeDefault_1;
}
`````
