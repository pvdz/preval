# Preval test case

# auto_ident_prop_s-seq_assign_complex_member.md

> Normalize > Expressions > Assignments > Stmt func block > Auto ident prop s-seq assign complex member
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let b = { c: 10, d: 20 };

    let a = { a: 999, b: 1000 };
    a = (1, 2, b).c = $(b)[$("d")];
    $(a, b);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  {
    let b = { c: 10, d: 20 };
    let a = { a: 999, b: 1000 };
    a = (1, 2, b).c = $(b)[$('d')];
    $(a, b);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { c: 10, d: 20 };
  let a = { a: 999, b: 1000 };
  const tmpNestedAssignObj = b;
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
  a = tmpNestedPropAssignRhs;
  $(a, b);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const b = { c: 10, d: 20 };
  const tmpCompObj = $(b);
  const tmpCompProp = $('d');
  const tmpNestedAssignPropRhs = tmpCompObj[tmpCompProp];
  b.c = tmpNestedAssignPropRhs;
  $(tmpNestedAssignPropRhs, b);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { c: '10', d: '20' }
 - 2: 'd'
 - 3: 20, { c: '20', d: '20' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
