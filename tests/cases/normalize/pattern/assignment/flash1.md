# Preval test case

# flash1.md

> Normalize > Pattern > Assignment > Flash1
>
> https://twitter.com/buzyescayadev/status/1343866976939098113 

The actual case contains unnecessary complexity in defaults so those were replaced:

```js
([[[[[[foo = (y = a??z)]= {...[a(a?.b)]}]]]]] = 1, {x: {...x}} = 1);
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


## PST Settled
With rename=true

`````js filename=intro

`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let x = function ($$0, $$1) {
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  debugger;
  let tmpBindingPatternArrRoot = tmpParamBare;
  let tmpArrPatternSplat = [...tmpBindingPatternArrRoot];
  let tmpArrPatternStep = tmpArrPatternSplat[0];
  let tmpArrPatternSplat$1 = [...tmpArrPatternStep];
  let tmpArrPatternStep$1 = tmpArrPatternSplat$1[0];
  let tmpArrPatternSplat$3 = [...tmpArrPatternStep$1];
  let tmpArrPatternStep$3 = tmpArrPatternSplat$3[0];
  let tmpArrPatternSplat$5 = [...tmpArrPatternStep$3];
  let tmpArrPatternStep$5 = tmpArrPatternSplat$5[0];
  let tmpArrPatternSplat$7 = [...tmpArrPatternStep$5];
  let tmpAPBD = tmpArrPatternSplat$7[0];
  let tmpArrPatternStep$7 = undefined;
  const tmpIfTest = tmpAPBD === undefined;
  if (tmpIfTest) {
    tmpArrPatternStep$7 = y;
  } else {
    tmpArrPatternStep$7 = tmpAPBD;
  }
  let tmpArrPatternSplat$9 = [...tmpArrPatternStep$7];
  let tmpAPBD$1 = tmpArrPatternSplat$9[0];
  let foo = undefined;
  const tmpIfTest$1 = tmpAPBD$1 === undefined;
  if (tmpIfTest$1) {
    foo = x$1;
  } else {
    foo = tmpAPBD$1;
  }
  let tmpBindingPatternObjRoot = tmpParamBare$1;
  let tmpOPND = tmpBindingPatternObjRoot.x;
  let tmpCalleeParam = tmpOPND;
  let tmpCalleeParam$1 = [];
  let x$1 = $objPatternRest(tmpCalleeParam, tmpCalleeParam$1, undefined);
  return undefined;
};
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
