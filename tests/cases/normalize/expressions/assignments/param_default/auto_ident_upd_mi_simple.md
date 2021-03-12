# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f(p = (a = --b)) {}
$(f());
$(a, b);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = --b) : tmpParamDefault;
};
let b = 1;
let a = { a: 999, b: 1000 };
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    b = b - 1;
    let tmpNestedComplexRhs = b;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = tmpParamDefault;
  }
};
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output

`````js filename=intro
const f = function (tmpParamDefault) {
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    b = b - 1;
    const tmpNestedComplexRhs = b;
    a = tmpNestedComplexRhs;
  }
};
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
