# Preval test case

# base.md

> normalize > pattern >  > param > ident > base
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
let x
(x = 1);
$(x);
`````

## Normalized

`````js filename=intro
let x;
x = 1;
$(x);
`````

## Output

`````js filename=intro
let x;
x = 1;
$(x);
`````

## Result

Should call `$` with:
[[1], null];

Normalized calls: Same

Final output calls: Same
