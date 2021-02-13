# Preval test case

# ident_sequence_simple.md

> normalize > assignment > stmt > ident_sequence_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let  b = 2, c = 3;
  let a = ($(b), $(c)).x = c;
  $(a, b, c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = 2;
  let c = 3;
  $(b);
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedRhs = c;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(a, b, c);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
function f() {
  $(2);
  const varInitAssignLhsComputedObj = $(3);
  varInitAssignLhsComputedObj.x = 3;
  $(3, 2, 3);
}
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 3
 - 3: 3, 2, 3
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
