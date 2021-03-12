# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
function f(p = (a = void arg)) {}
$(f());
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = void arg) : tmpParamDefault;
};
let arg = 1;
let a = { a: 999, b: 1000 };
$(f());
$(a, arg);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    const tmpNestedComplexRhs = undefined;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = tmpParamDefault;
  }
};
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    a = undefined;
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
 - 1: undefined
 - 2: undefined, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
