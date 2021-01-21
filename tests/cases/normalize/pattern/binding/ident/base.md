# Preval test case

# base.md

> normalize > pattern >  > param > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const x = 1;
$(x);
`````

## Normalized

`````js filename=intro
const x = 1;
$(x);
`````

## Output

`````js filename=intro
$(1);
`````

## Result

Should call `$` with:
 - 0: 1
 - 1: undefined

Normalized calls: Same

Final output calls: Same
