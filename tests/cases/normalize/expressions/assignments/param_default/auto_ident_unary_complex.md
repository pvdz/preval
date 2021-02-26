# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f(arg = (a = typeof $(x))) {}
$(f());
$(a, x);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__arg) {
  let arg = undefined;
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    const tmpUnaryArg = $(x);
    const tmpNestedComplexRhs = typeof tmpUnaryArg;
    a = tmpNestedComplexRhs;
    arg = tmpNestedComplexRhs;
  } else {
    arg = $tdz$__arg;
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
const f = function ($tdz$__arg) {
  const tmpIfTest = $tdz$__arg === undefined;
  if (tmpIfTest) {
    const tmpUnaryArg = $(1);
    const tmpNestedComplexRhs = typeof tmpUnaryArg;
    a = tmpNestedComplexRhs;
  }
};
let a = { a: 999, b: 1000 };
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
 - 3: 'number', 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
