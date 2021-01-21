# Preval test case

# default_no_no__0.md

> normalize > pattern >  > param > obj > ident > default_no_no__0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x } = 0;
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = 0;
const x = bindingPatternObjRoot.x;
$(x);
`````

## Output

`````js filename=intro
const x = (0).x;
$(x);
`````

## Result

Should call `$` with:
 - 0: null
 - 1: undefined

Normalized calls: Same

Final output calls: Same
