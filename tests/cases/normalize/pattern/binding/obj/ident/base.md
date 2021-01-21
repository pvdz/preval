# Preval test case

# base.md

> normalize > pattern >  > param > obj > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x } = { x: 1, b: 2, c: 3 };
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: 1, b: 2, c: 3 };
const x = bindingPatternObjRoot.x;
$(x);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: 1, b: 2, c: 3 };
const x = bindingPatternObjRoot.x;
$(x);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
