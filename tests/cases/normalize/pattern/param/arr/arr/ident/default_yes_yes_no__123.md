# Preval test case

# default_yes_yes_no__123.md

> Normalize > Pattern > Param > Arr > Arr > Ident > Default yes yes no  123
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f([[x = $('fail')] = $(['fail2'])]) {
  return 'bad';
}
$(f(1, 2, 3, 200));
`````

## Settled


`````js filename=intro
[...1];
throw `[Preval]: Array spread must crash before this line`;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
[...1];
throw `[Preval]: Array spread must crash before this line`;
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let [[x = $(`fail`)] = $([`fail2`])] = tmpParamBare;
  return `bad`;
};
$(f(1, 2, 3, 200));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let bindingPatternArrRoot = tmpParamBare;
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let arrPatternStep = undefined;
  const tmpIfTest = arrPatternBeforeDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = [`fail2`];
    arrPatternStep = $(tmpCalleeParam);
  } else {
    arrPatternStep = arrPatternBeforeDefault;
  }
  let arrPatternSplat$1 = [...arrPatternStep];
  let arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
  let x = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
  if (tmpIfTest$1) {
    x = $(`fail`);
    return `bad`;
  } else {
    x = arrPatternBeforeDefault$1;
    return `bad`;
  }
};
const tmpCalleeParam$1 = f(1, 2, 3, 200);
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
[ ...1 ];
throw "[Preval]: Array spread must crash before this line";
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- inline computed array property read
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
