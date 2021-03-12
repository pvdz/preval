# Preval test case

# auto_ident_call_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident call complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f(p = (a = $($)(1))) {}
$(f());
$(a);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__pattern) {
  let p = undefined;
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $($);
    const tmpNestedComplexRhs = tmpCallCallee(1);
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__pattern;
  }
};
let a = { a: 999, b: 1000 };
const tmpCallCallee$1 = $;
const tmpCalleeParam = f();
tmpCallCallee$1(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const f = function ($tdz$__pattern) {
  const tmpIfTest = $tdz$__pattern === undefined;
  if (tmpIfTest) {
    const tmpCallCallee = $($);
    const tmpNestedComplexRhs = tmpCallCallee(1);
    a = tmpNestedComplexRhs;
  }
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '<$>'
 - 2: 1
 - 3: undefined
 - 4: 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
