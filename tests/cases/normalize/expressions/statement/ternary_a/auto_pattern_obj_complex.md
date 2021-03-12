# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Ternary a > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$({ a: 1, b: 2 }) ? $(100) : $(200);
$(a);
`````

## Normalized

`````js filename=intro
let $tdz$__pattern_after_default = { a: 999, b: 1000 };
let a = $tdz$__pattern_after_default.a;
const tmpCallCallee = $;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## Output

`````js filename=intro
const $tdz$__pattern_after_default = { a: 999, b: 1000 };
const a = $tdz$__pattern_after_default.a;
const tmpCalleeParam = { a: 1, b: 2 };
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
  $(100);
} else {
  $(200);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 100
 - 3: 999
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
