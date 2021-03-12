# Preval test case

# auto_ident_prop_complex_assign_complex_member.md

> Normalize > Expressions > Assignments > Param default > Auto ident prop complex assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
function f(p = (a = $(b).c = $(b)[$("d")])) {}
$(f());
$(a, b);
`````

## Pre Normal

`````js filename=intro
let f = function (tmpParamDefault) {
  let p = tmpParamDefault === undefined ? (a = $(b).c = $(b)[$('d')]) : tmpParamDefault;
};
let b = { c: 10, d: 20 };
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
    const varInitAssignLhsComputedObj = $(b);
    const tmpCompObj = $(b);
    const tmpCompProp = $('d');
    const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
    varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
    const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = tmpParamDefault;
  }
};
let b = { c: 10, d: 20 };
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
    const varInitAssignLhsComputedObj = $(b);
    const tmpCompObj = $(b);
    const tmpCompProp = $('d');
    const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
    varInitAssignLhsComputedObj.c = varInitAssignLhsComputedRhs;
    a = varInitAssignLhsComputedRhs;
  }
};
const b = { c: 10, d: 20 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: { c: '10', d: '20' }
 - 3: 'd'
 - 4: undefined
 - 5: 20, { c: '20', d: '20' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
