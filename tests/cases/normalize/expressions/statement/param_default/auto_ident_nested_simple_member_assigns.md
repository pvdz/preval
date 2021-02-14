# Preval test case

# auto_ident_nested_simple_member_assigns.md

> normalize > expressions > statement > param_default > auto_ident_nested_simple_member_assigns
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 },
  c = 3;

let a = { a: 999, b: 1000 };
function f(p = (b.x = b.x = b.x = b.x = b.x = b.x = c)) {}
$(f());
$(a, b, c);
`````

## Normalized

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    const varInitAssignLhsComputedRhs$4 = c;
    b.x = varInitAssignLhsComputedRhs$4;
    const varInitAssignLhsComputedRhs$3 = varInitAssignLhsComputedRhs$4;
    b.x = varInitAssignLhsComputedRhs$3;
    const varInitAssignLhsComputedRhs$2 = varInitAssignLhsComputedRhs$3;
    b.x = varInitAssignLhsComputedRhs$2;
    const varInitAssignLhsComputedRhs$1 = varInitAssignLhsComputedRhs$2;
    b.x = varInitAssignLhsComputedRhs$1;
    const varInitAssignLhsComputedRhs = varInitAssignLhsComputedRhs$1;
    b.x = varInitAssignLhsComputedRhs;
    const tmpNestedAssignPropRhs = varInitAssignLhsComputedRhs;
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    b.x = tmpNestedPropAssignRhs;
    p = tmpNestedPropAssignRhs;
  } else {
    p = $tdz$__p;
  }
}
let b = { x: 1 };
let c = 3;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b, c);
`````

## Output

`````js filename=intro
function f($tdz$__p) {
  let p = undefined;
  const tmpIfTest = $tdz$__p === undefined;
  if (tmpIfTest) {
    b.x = 3;
    b.x = 3;
    b.x = 3;
    b.x = 3;
    b.x = 3;
    b.x = 3;
    p = 3;
  } else {
    p = $tdz$__p;
  }
}
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 1: undefined
 - 2: { a: '999', b: '1000' }, { x: '3' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
