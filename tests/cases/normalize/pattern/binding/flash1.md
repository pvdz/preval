# Preval test case

# flash1.md

> Normalize > Pattern > Binding > Flash1
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

## Settled


`````js filename=intro

`````

## Denormalized
(This ought to be the final result)

`````js filename=intro

`````

## Pre Normal


`````js filename=intro
let x = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let [[[[[[foo = x$1] = y]]]]] = tmpParamBare;
  let {
    x: { ...x$1 },
  } = tmpParamBare$1;
};
`````

## Normalized


`````js filename=intro
let x = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternStep = arrPatternSplat[0];
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternStep$1 = arrPatternSplat$1[0];
  let arrPatternSplat$3 = [...arrPatternStep$1];
  let arrPatternStep$3 = arrPatternSplat$3[0];
  let arrPatternSplat$5 = [...arrPatternStep$3];
  let arrPatternStep$5 = arrPatternSplat$5[0];
  let arrPatternSplat$7 = [...arrPatternStep$5];
  let arrPatternBeforeDefault = arrPatternSplat$7[0];
  let arrPatternStep$7 = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    arrPatternStep$7 = y;
  } else {
    arrPatternStep$7 = arrPatternBeforeDefault;
  }
  let arrPatternSplat$9 = [...arrPatternStep$7];
  let arrPatternBeforeDefault$1 = arrPatternSplat$9[0];
  let foo = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    foo = x$1;
  } else {
    foo = arrPatternBeforeDefault$1;
  }
  let bindingPatternObjRoot = tmpParamBare$1;
  let objPatternNoDefault = bindingPatternObjRoot.x;
  const tmpCalleeParam = objPatternNoDefault;
  const tmpCalleeParam$1 = [];
  let x$1 = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
  return undefined;
};
`````

## PST Settled
With rename=true

`````js filename=intro

`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
