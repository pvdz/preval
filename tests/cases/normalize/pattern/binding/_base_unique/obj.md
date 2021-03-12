# Preval test case

# obj.md

> Normalize > Pattern > Binding > Base unique > Obj
>
> Testing simple pattern normalizations. Make sure pattern bindings are properly renamed to be globally unique.

## Input

`````js filename=intro
{ let x = 1; }
const { x } = 1;
{ let x = 1; }
`````

## Normalized

`````js filename=intro
let x$1 = 1;
const $tdz$__pattern_after_default = 1;
const x = $tdz$__pattern_after_default.x;
let x$2 = 1;
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
