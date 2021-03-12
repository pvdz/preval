# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Param default > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
function f(p = $({ a: 1, b: 2 })) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = { a: 1, b: 2 };
    p = tmpCallCallee(tmpCalleeParam);
  } else {
    p = tmpParamDefault;
  }
};
let $tdz$__pattern_after_default = { a: 999, b: 1000 };
let a = $tdz$__pattern_after_default.a;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = { a: 1, b: 2 };
    $(tmpCalleeParam);
  }
};
const $tdz$__pattern_after_default = { a: 999, b: 1000 };
const a = $tdz$__pattern_after_default.a;
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: undefined
 - 3: 999
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
