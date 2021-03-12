# Preval test case

# default_no_no__obj_0.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  obj 0
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x } = { x: 0 };
$(x);
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = { x: 0 };
const x = $tdz$__pattern_after_default.x;
$(x);
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { x: 0 };
const x = $tdz$__pattern_after_default.x;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
