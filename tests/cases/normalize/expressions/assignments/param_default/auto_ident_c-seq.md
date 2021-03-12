# Preval test case

# auto_ident_c-seq.md

> Normalize > Expressions > Assignments > Param default > Auto ident c-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f(p = (a = ($(1), $(2), $(x)))) {}
$(f());
$(a, x);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = ($(1), $(2), $(x))) : tmpParamDefault;
};
let x = 1;
let a = { a: 999, b: 1000 };
$(f());
$(a, x);
`````

## Normalized

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = undefined;
  const tmpIfTest = tmpParamDefault === undefined;
  if (tmpIfTest) {
    $(1);
    $(2);
    const tmpNestedComplexRhs = $(x);
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = tmpParamDefault;
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
    $(1);
    $(2);
    const tmpNestedComplexRhs = $(1);
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
 - 2: 2
 - 3: 1
 - 4: undefined
 - 5: 1, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
