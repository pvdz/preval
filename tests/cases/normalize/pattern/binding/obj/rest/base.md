# Preval test case

# base.md

> normalize > pattern >  > param > obj > rest > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { ...x } = { x: 1, b: 2, c: 3 };
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: 1, b: 2, c: 3 };
const tmpCallCallee = objPatternRest;
const tmpCalleeParam = bindingPatternObjRoot;
const tmpCalleeParam$1 = [];
const tmpCalleeParam$2 = 'x';
const x = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$2);
$(x);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: 1, b: 2, c: 3 };
const tmpCalleeParam$1 = [];
const x = objPatternRest(bindingPatternObjRoot, tmpCalleeParam$1, 'x');
$(x);
`````

## Result

Should call `$` with:
 - 1: { x: '1', b: '2', c: '3' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
