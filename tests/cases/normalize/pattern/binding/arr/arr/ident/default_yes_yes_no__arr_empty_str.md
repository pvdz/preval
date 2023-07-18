# Preval test case

# default_yes_yes_no__arr_empty_str.md

> Normalize > Pattern > Binding > Arr > Arr > Ident > Default yes yes no  arr empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x = $('pass')] = $(['fail2'])] = ['', 4, 5];
$(x);
`````

## Pre Normal

`````js filename=intro
const [[x = $(`pass`)] = $([`fail2`])] = [``, 4, 5];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [``, 4, 5];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = [`fail2`];
  arrPatternStep = tmpCallCallee(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
let x = undefined;
const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  x = $(`pass`);
} else {
  x = arrPatternBeforeDefault$1;
}
$(x);
`````

## Output

`````js filename=intro
const tmpClusterSSA_x = $(`pass`);
$(tmpClusterSSA_x);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "pass" );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
