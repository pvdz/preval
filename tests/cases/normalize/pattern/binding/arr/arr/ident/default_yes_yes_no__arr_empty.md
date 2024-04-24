# Preval test case

# default_yes_yes_no__arr_empty.md

> Normalize > Pattern > Binding > Arr > Arr > Ident > Default yes yes no  arr empty
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [[x = $('fail')] = $(['pass2'])] = [];
$(x);
`````

## Pre Normal

`````js filename=intro
const [[x = $(`fail`)] = $([`pass2`])] = [];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let arrPatternStep = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = [`pass2`];
  arrPatternStep = tmpCallCallee(tmpCalleeParam);
} else {
  arrPatternStep = arrPatternBeforeDefault;
}
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
let x = undefined;
const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  x = $(`fail`);
} else {
  x = arrPatternBeforeDefault$1;
}
$(x);
`````

## Output

`````js filename=intro
const tmpCalleeParam = [`pass2`];
const arrPatternStep = $(tmpCalleeParam);
const arrPatternSplat$1 = [...arrPatternStep];
const arrPatternBeforeDefault$1 = arrPatternSplat$1[0];
let x = undefined;
const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  x = $(`fail`);
  $(x);
} else {
  x = arrPatternBeforeDefault$1;
  $(arrPatternBeforeDefault$1);
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "pass2",, ];
const b = $( a );
const c = [ ... b,, ];
const d = c[ 0 ];
let e = undefined;
const f = d === undefined;
if (f) {
  e = $( "fail" );
  $( e );
}
else {
  e = d;
  $( d );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['pass2']
 - 2: 'pass2'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
