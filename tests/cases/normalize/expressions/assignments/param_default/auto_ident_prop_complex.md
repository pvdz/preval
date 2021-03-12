# Preval test case

# auto_ident_prop_complex.md

> Normalize > Expressions > Assignments > Param default > Auto ident prop complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f(p = (a = $(b).c)) {}
$(f());
$(a, b);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = $(b).c) : tmpParamDefault;
};
let b = { c: 1 };
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
    const tmpCompObj = $(b);
    const tmpNestedComplexRhs = tmpCompObj.c;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = tmpParamDefault;
  }
};
let b = { c: 1 };
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
    const tmpCompObj = $(b);
    const tmpNestedComplexRhs = tmpCompObj.c;
    a = tmpNestedComplexRhs;
  }
};
const b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '1' }
 - 2: undefined
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
