# Preval test case

# auto_ident_unary_tilde_complex.md

> Normalize > Expressions > Statement > Param default > Auto ident unary tilde complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = ~$(100)) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? ~$(100) : tmpParamDefault;
};
let a = { a: 999, b: 1000 };
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpUnaryArg = $(100);
    p = ~tmpUnaryArg;
  } else {
    p = tmpParamDefault;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpUnaryArg = $(100);
    ~tmpUnaryArg;
  }
};
const a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: undefined
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
