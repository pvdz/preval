# Preval test case

# auto_ident_unary_typeof_complex.md

> normalize > expressions > statement > param_default > auto_ident_unary_typeof_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
function f(p = typeof $(arg)) {}
$(f());
$(a, arg);
`````

## Normalized

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpUnaryArg = $(arg);
    p = typeof tmpUnaryArg;
  } else {
    p = $tdz$__p;
  }
}
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpUnaryArg = $(arg);
    p = typeof tmpUnaryArg;
  } else {
    p = $tdz$__p;
  }
}
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
