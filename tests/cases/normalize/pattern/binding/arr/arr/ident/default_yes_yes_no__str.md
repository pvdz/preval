# Preval test case

# default_yes_yes_no__str.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x = $('fail')] = $(['fail2'])] = 'abc';
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = 'abc';
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = ['fail2'];
  arrPatternStep = tmpCallCallee(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
let x = undefined;
const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  x = $('fail');
} else {
  x = arrPatternBeforeDefault$1;
}
$(x);
`````

## Output

`````js filename=intro
const arrPatternSplat = ['a', 'b', 'c'];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCalleeParam = ['fail2'];
  arrPatternStep = $(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
let x = undefined;
const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  x = $('fail');
} else {
  x = arrPatternBeforeDefault$1;
}
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'a'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
