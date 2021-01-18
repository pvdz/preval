# Preval test case

# default_no_no__obj_undefined.md

> normalize > pattern >  > param > obj > ident > default_no_no__obj_undefined
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x } = { x: undefined };
$(x);
`````

## Normalized

`````js filename=intro
const bindingPatternObjRoot = { x: undefined };
const x = bindingPatternObjRoot.x;
$(x);
`````

## Output

`````js filename=intro
const bindingPatternObjRoot = { x: undefined };
const x = bindingPatternObjRoot.x;
$(x);
`````

## Result

Should call `$` with:
[[null], null];

Normalized calls: Same

Final output calls: Same
