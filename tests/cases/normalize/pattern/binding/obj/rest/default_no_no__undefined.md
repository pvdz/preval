# Preval test case

# default_no_no__undefined.md

> normalize > pattern >  > param > obj > rest > default_no_no__undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { ...x } = undefined;
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = undefined;
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = bindingPatternObjRoot;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$2 = 'x';
const x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
$(x);
`````

## Output

`````js filename=intro
const tmpCallCallee = objPatternRest;
const tmpCalleeParam$1 = [];
const x = tmpCallCallee(undefined, tmpCalleeParam$1, 'x');
$(x);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Cannot read property <ref> of <ref2> ]>')

Normalized calls: Same

Final output calls: Same
