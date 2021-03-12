# Preval test case

# auto_prop_simple_simple.md

> Normalize > Expressions > Assignments > Stmt global block > Auto prop simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = { b: $(1) };
  a.b = 2;
  $(a);
}
`````

## Pre Normal

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  a = { b: $(1) };
  a.b = 2;
  $(a);
}
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpObjLitVal = $(1);
a = { b: tmpObjLitVal };
a.b = 2;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const SSA_a = { b: tmpObjLitVal };
SSA_a.b = 2;
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
