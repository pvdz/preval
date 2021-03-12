# Preval test case

# obj_unique.md

> Normalize > Pattern > Binding > Base alias > Obj unique
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

Confirm that both references of `x` get a unique name.

In particular, the pattern's "y" should be replaced with a different name.

## Input

`````js filename=intro
{ let a = 1; }
const { x: a } = 1
{ let a = 1; }
`````

## Normalized

`````js filename=intro
let a$1 = 1;
const $tdz$__pattern_after_default = 1;
const a = $tdz$__pattern_after_default.x;
let a$2 = 1;
`````

## Output

`````js filename=intro
(1).x;
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
