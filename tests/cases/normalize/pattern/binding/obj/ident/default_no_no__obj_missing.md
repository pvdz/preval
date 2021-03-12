# Preval test case

# default_no_no__obj_missing.md

> Normalize > Pattern > Binding > Obj > Ident > Default no no  obj missing
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

#TODO

## Input

`````js filename=intro
const { x } = { b: 2, c: 3 };
$(x);
`````

## Normalized

`````js filename=intro
const $tdz$__pattern_after_default = { b: 2, c: 3 };
const x = $tdz$__pattern_after_default.x;
$(x);
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { b: 2, c: 3 };
const x = $tdz$__pattern_after_default.x;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
