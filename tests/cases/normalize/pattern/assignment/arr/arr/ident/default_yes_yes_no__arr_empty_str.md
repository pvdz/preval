# Preval test case

# default_yes_yes_no__arr_empty_str.md

> normalize > pattern >  > param > arr > arr > ident > default_yes_yes_no__arr_empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
([[x = $('pass')] = $(['fail2'])] = ['', 4, 5]);
$(x);
`````

## Normalized

`````js filename=intro
const arrAssignPatternRhs = ['', 4, 5];
const arrPatternSplat = [...arrAssignPatternRhs];
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
const tmpIfTest$1 = arrPatternBeforeDefault$1 === undefined;
if (tmpIfTest$1) {
  x = $('pass');
} else {
  x = arrPatternBeforeDefault$1;
}
$(x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'pass'
 - 2: 'pass'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
