# Preval test case

# default_no_no__arr_str.md

> normalize > pattern >  > param > arr > ident > default_no_no__arr_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const [x] = ['abc'];
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternArrRoot = ['abc'];
const arrPatternSplat = [...bindingPatternArrRoot];
const x = arrPatternSplat[0];
$(x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 'abc'
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
