# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Bindings > Stmt func block > Auto pattern obj complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let { a } = $({ a: 1, b: 2 });
    $(a);
  }
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpCallCallee = $;
  const tmpCalleeParam = { a: 1, b: 2 };
  let $tdz$__pattern_after_default = tmpCallCallee(tmpCalleeParam);
  let a = $tdz$__pattern_after_default.a;
  $(a);
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpCalleeParam = { a: 1, b: 2 };
  const $tdz$__pattern_after_default = $(tmpCalleeParam);
  const a = $tdz$__pattern_after_default.a;
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
 - 2: 1
 - 3: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
