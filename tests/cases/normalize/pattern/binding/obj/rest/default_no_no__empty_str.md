# Preval test case

# default_no_no__empty_str.md

> normalize > pattern >  > param > obj > rest > default_no_no__empty_str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { ...x } = '';
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = '';
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = bindingPatternObjRoot;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$2 = 'x';
const x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
$(x);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
