# Preval test case

# auto_ident_new_computed_complex_simple.md

> Normalize > Expressions > Assignments > Param default > Auto ident new computed complex simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
function f(p = (a = new ($(b)["$"])(1))) {}
$(f());
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = new ($(b)['$'])(1)) : tmpParamDefault;
};
let b = { $ };
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
    const tmpCompObj = $(b);
    const tmpNewCallee = tmpCompObj.$;
    const tmpNestedComplexRhs = new tmpNewCallee(1);
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = tmpParamDefault;
  }
};
let b = { $: $ };
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
    const tmpCompObj = $(b);
    const tmpNewCallee = tmpCompObj.$;
    const tmpNestedComplexRhs = new tmpNewCallee(1);
    a = tmpNestedComplexRhs;
  }
};
const b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { $: '"<$>"' }
 - 2: 1
 - 3: undefined
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
