# Preval test case

# auto_pattern_obj_simple.md

> Normalize > Expressions > Statement > Computed prop prop > Auto pattern obj simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

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
