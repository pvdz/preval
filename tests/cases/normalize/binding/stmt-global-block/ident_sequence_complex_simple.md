# Preval test case

# ident_sequence_complex_simple.md

> Normalize > Binding > Stmt-global-block > Ident sequence complex simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
if ($(true)) {
  let b = 2, c = 3;
  let a = ($(b), $(c)).x = c;
  $(a, b, c);
}
`````

## Pre Normal

`````js filename=intro
if ($(true)) {
  let b = 2,
    c = 3;
  let a = (($(b), $(c)).x = c);
  $(a, b, c);
}
`````

## Normalized

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  let b = 2;
  let c = 3;
  $(b);
  const varInitAssignLhsComputedObj = $(c);
  const varInitAssignLhsComputedRhs = c;
  varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
  let a = varInitAssignLhsComputedRhs;
  $(a, b, c);
} else {
}
`````

## Output

`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  $(2);
  const varInitAssignLhsComputedObj = $(3);
  varInitAssignLhsComputedObj.x = 3;
  $(3, 2, 3);
} else {
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 2
 - 3: 3
 - eval returned: ("<crash[ Cannot create property 'x' on number '3' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
