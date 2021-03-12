# Preval test case

# default_yes_yes__str.md

> Normalize > Pattern > Param > Arr > Ident > Default yes yes  str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
function f([x = $('fail')] = $('fail2')) {
  return x;
}
$(f('xyz', 200));
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    bindingPatternArrRoot = $('fail2');
  } else {
    bindingPatternArrRoot = $tdz$__pattern;
  }
  let arrPatternSplat = [...bindingPatternArrRoot];
  let arrPatternBeforeDefault = arrPatternSplat[0];
  let x = undefined;
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    x = $('fail');
    return x;
  } else {
    x = arrPatternBeforeDefault;
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f('xyz', 200);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {
  let bindingPatternArrRoot = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    bindingPatternArrRoot = $('fail2');
  } else {
    bindingPatternArrRoot = $tdz$__pattern;
  }
  const arrPatternSplat = [...bindingPatternArrRoot];
  const arrPatternBeforeDefault = arrPatternSplat[0];
  const tmpIfTest$1 = arrPatternBeforeDefault === undefined;
  if (tmpIfTest$1) {
    const SSA_x = $('fail');
    return SSA_x;
  } else {
    return arrPatternBeforeDefault;
  }
};
const tmpCalleeParam = f('xyz', 200);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'x'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
