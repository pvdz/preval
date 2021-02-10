# Preval test case

# ident_ident_assign.md

> normalize > assignment > stmt > ident_ident_assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f() {
  let  b = 2, c = 3, d = 4;
  let a = b = $(c).y = $(d);
  $(a, b, c);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let b = 2;
  let c = 3;
  let d = 4;
  let a;
  let tmpNestedComplexRhs;
  const tmpNestedAssignObj = $(c);
  let tmpNestedAssignPropRhs = $(d);
  const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
  tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
  tmpNestedComplexRhs = tmpNestedPropAssignRhs;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  $(a, b, c);
}
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: 4, 4, 3
 - 4: undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
