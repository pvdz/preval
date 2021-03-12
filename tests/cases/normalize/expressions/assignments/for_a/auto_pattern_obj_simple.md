# Preval test case

# auto_pattern_obj_simple.md

> Normalize > Expressions > Assignments > For a > Auto pattern obj simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a, b } = { a: 1, b: 2 };
$(a, b);
`````

## Normalized

`````js filename=intro
let $tdz$__pattern_after_default = { a: 1, b: 2 };
let a = $tdz$__pattern_after_default.a;
let b = $tdz$__pattern_after_default.b;
$(a, b);
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { a: 1, b: 2 };
const a = $tdz$__pattern_after_default.a;
const b = $tdz$__pattern_after_default.b;
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
