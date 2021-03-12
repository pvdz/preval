# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Assignments > Stmt global top > Auto pattern obj complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
({ a } = $({ a: 1, b: 2 }));
$(a);
`````

## Normalized

`````js filename=intro
let $tdz$__pattern_after_default = { a: 999, b: 1000 };
let a = $tdz$__pattern_after_default.a;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpAssignObjPatternRhs = tmpCallCallee(tmpCalleeParam);
a = tmpAssignObjPatternRhs.a;
$(a);
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { a: 999, b: 1000 };
$tdz$__pattern_after_default.a;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpAssignObjPatternRhs = $(tmpCalleeParam);
const SSA_a = tmpAssignObjPatternRhs.a;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
