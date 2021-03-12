# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Let > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
let xyz = $({ a: 1, b: 2 });
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let $tdz$__pattern_after_default = { a: 999, b: 1000 };
let a = $tdz$__pattern_after_default.a;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
let xyz = tmpCallCallee(tmpCalleeParam);
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { a: 999, b: 1000 };
const a = $tdz$__pattern_after_default.a;
const tmpCalleeParam = { a: 1, b: 2 };
const xyz = $(tmpCalleeParam);
$(xyz);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: { a: '1', b: '2' }
 - 3: 999
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
