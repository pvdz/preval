# Preval test case

# ident_member_simple_complex.md

> Normalize > Binding > Stmt-func-top > Ident member simple complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let  b = {x: 2}, c = 3;
  let a = b.x = c;
  $(a, b, c);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let b = { x: 2 };
  let c = 3;
  const varInitAssignLhsComputedRhs = c;
  b.x = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(a, b, c);
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  const b = { x: 2 };
  b.x = 3;
  $(3, b, 3);
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 3, { x: '3' }, 3
 - 2: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
