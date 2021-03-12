# Preval test case

# base.md

> Normalize > Pattern > Binding > Obj > Ident > Base
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
const $tdz$__pattern_after_default = { x: 1, b: 2, c: 3 };
const x = $tdz$__pattern_after_default.x;
$(x);
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { x: 1, b: 2, c: 3 };
const x = $tdz$__pattern_after_default.x;
$(x);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
