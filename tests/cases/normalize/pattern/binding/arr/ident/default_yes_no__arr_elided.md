# Preval test case

# default_yes_no__arr_elided.md

> normalize > pattern >  > param > arr > ident > default_yes_no__arr_elided
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x = $('pass')] = [, , 1];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = [, , 1];
const arrPatternSplat = [...bindingPatternArrRoot];
const arrPatternBeforeDefault = arrPatternSplat[0];
let x = undefined;
const tmpIfTest = arrPatternBeforeDefault === undefined;
if (tmpIfTest) {
  x = $('pass');
} else {
  x = arrPatternBeforeDefault;
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
