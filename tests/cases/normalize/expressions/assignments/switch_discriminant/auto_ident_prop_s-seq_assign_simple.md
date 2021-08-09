# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> Normalize > Expressions > Assignments > Switch discriminant > Auto ident prop s-seq assign simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
switch ((a = (1, 2, b).c = 2)) {
  default:
    $(100);
}
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
tmpSwitchBreak: {
  const tmpSwitchDisc = (a = (1, 2, b).c = 2);
  if (true) {
    $(100);
  } else {
  }
}
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpNestedAssignObj = b;
const tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
a = tmpNestedPropAssignRhs;
let tmpSwitchDisc = a;
$(100);
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
b.c = 2;
$(100);
$(2, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 2, { c: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
