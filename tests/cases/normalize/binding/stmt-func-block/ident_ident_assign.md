# Preval test case

# ident_ident_assign.md

> Normalize > Binding > Stmt-func-block > Ident ident assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
function f(){
if ($(true)) {
let b = 2, c = 3, d = 4;
  let a= b = $(c).y = $(d);
  $(a, b, c);
}
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  if ($(true)) {
    let b = 2,
      c = 3,
      d = 4;
    let a = (b = $(c).y = $(d));
    $(a, b, c);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let b = 2;
    let c = 3;
    let d = 4;
    const tmpNestedAssignObj = $(c);
    const tmpNestedAssignPropRhs = $(d);
    const tmpNestedPropAssignRhs = tmpNestedAssignPropRhs;
    tmpNestedAssignObj.y = tmpNestedPropAssignRhs;
    b = tmpNestedPropAssignRhs;
    let a = b;
    $(a, b, c);
  } else {
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function () {
  debugger;
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpNestedAssignObj = $(3);
    const tmpNestedAssignPropRhs = $(4);
    tmpNestedAssignObj.y = tmpNestedAssignPropRhs;
    $(tmpNestedAssignPropRhs, tmpNestedAssignPropRhs, 3);
  } else {
  }
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 3
 - 3: 4
 - eval returned: ("<crash[ Cannot create property 'y' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
