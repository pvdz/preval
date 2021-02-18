# Preval test case

# auto_pattern_obj_complex.md

> normalize > expressions > statement > param_default > auto_pattern_obj_complex
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
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $;
    const tmpCalleeParam = { a: 1, b: 2 };
    p = tmpCallCallee(tmpCalleeParam);
  } else {
    p = $tdz$__p;
  }
}
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
function f($tdz$__p) {
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpCalleeParam = { a: 1, b: 2 };
    $(tmpCalleeParam);
  }
}
const bindingPatternObjRoot = { a: 999, b: 1000 };
const a = bindingPatternObjRoot.a;
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
