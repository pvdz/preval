# Preval test case

# auto_computed_simple_simple_complex.md

> Normalize > Expressions > Assignments > Stmt func block > Auto computed simple simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    a = { b: $(1) };
    a["b"] = $(2);
    $(a);
  }
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  {
    let a = { a: 999, b: 1000 };
    a = { b: $(1) };
    a[`b`] = $(2);
    $(a);
  }
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  let a = { a: 999, b: 1000 };
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  const tmpAssignMemLhsObj = a;
  const tmpAssignMemRhs = $(2);
  tmpAssignMemLhsObj.b = tmpAssignMemRhs;
  $(a);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpAssignMemRhs = $(2);
const a = { b: tmpObjLitVal };
a.b = tmpAssignMemRhs;
$(a);
$(undefined);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { b: '2' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
