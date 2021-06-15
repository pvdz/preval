# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
function f(p = (a = (1, 2, b)[$("c")])) {}
$(f());
$(a, b);
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = tmpParamBare === undefined ? (a = (1, 2, b)[$(`c`)]) : tmpParamBare;
};
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let p = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpCompObj = b;
    const tmpCompProp = $(`c`);
    const tmpNestedComplexRhs = tmpCompObj[tmpCompProp];
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
    return undefined;
  } else {
    p = tmpParamBare;
    return undefined;
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
const tmpCompProp = $(`c`);
const b = { c: 1 };
const tmpNestedComplexRhs = b[tmpCompProp];
$(undefined);
$(tmpNestedComplexRhs, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: undefined
 - 3: 1, { c: '1' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
