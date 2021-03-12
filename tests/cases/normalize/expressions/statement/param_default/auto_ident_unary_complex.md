# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident unary complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f(arg = typeof $(x)) {}
$(f());
$(a, x);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let arg = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpUnaryArg = $(x);
    arg = typeof tmpUnaryArg;
  } else {
    arg = tmpParamDefault;
  }
};
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpUnaryArg = $(1);
    typeof tmpUnaryArg;
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, 1);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
