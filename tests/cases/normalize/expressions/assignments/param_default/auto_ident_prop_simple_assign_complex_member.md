# Preval test case

# auto_ident_prop_simple_assign_complex_member.md

> Normalize > Expressions > Assignments > Param default > Auto ident prop simple assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 10, d: 20 };

let a = { a: 999, b: 1000 };
function f(p = (a = b.c = $(b)[$("d")])) {}
$(f());
$(a, b);
`````

## Normalized

`````js filename=intro
let f = function ($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpCompObj = $(b);
    const tmpCompProp = $('d');
    const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
    b.c = varInitAssignLhsComputedRhs;
    const tmpNestedComplexRhs = varInitAssignLhsComputedRhs;
    a = tmpNestedComplexRhs;
    p = tmpNestedComplexRhs;
  } else {
    p = $tdz$__p;
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
const f = function ($tdz$__p) {
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const tmpCompObj = $(b);
    const tmpCompProp = $('d');
    const varInitAssignLhsComputedRhs = tmpCompObj[tmpCompProp];
    b.c = varInitAssignLhsComputedRhs;
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
 - 2: 'd'
 - 3: undefined
 - 4: 20, { c: '20', d: '20' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
