# Preval test case

# ident_ident_assign.md

> Normalize > Binding > Stmt-global-block > Ident ident assign
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
if ($(true)) {
  let b = 2, c = 3, d = 4;
  let a = b = $(c).y = $(d);
  $(a, b, c);
}
`````

## Pre Normal


`````js filename=intro
if ($(true)) {
  let b = 2,
    c = 3,
    d = 4;
  let a = (b = $(c).y = $(d));
  $(a, b, c);
}
`````

## Normalized


`````js filename=intro
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
`````

## Output


`````js filename=intro
const tmpIfTest = $(true);
if (tmpIfTest) {
  const tmpNestedAssignObj = $(3);
  const tmpNestedAssignPropRhs = $(4);
  tmpNestedAssignObj.y = tmpNestedAssignPropRhs;
  $(tmpNestedAssignPropRhs, tmpNestedAssignPropRhs, 3);
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( true );
if (a) {
  const b = $( 3 );
  const c = $( 4 );
  b.y = c;
  $( c, c, 3 );
}
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
