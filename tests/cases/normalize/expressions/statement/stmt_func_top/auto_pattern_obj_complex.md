# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Stmt func top > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
function f() {
  let { a } = { a: 999, b: 1000 };
  $({ a: 1, b: 2 });
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let $tdz$__pattern_after_default = { a: 999, b: 1000 };
  let a = $tdz$__pattern_after_default.a;
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1, b: 2 };
  tmpCallCallee(tmpCalleeParam);
  $(a);
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  const $tdz$__pattern_after_default = { a: 999, b: 1000 };
  const a = $tdz$__pattern_after_default.a;
  const tmpCalleeParam = { a: 1, b: 2 };
  $(tmpCalleeParam);
  $(a);
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: 999
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
