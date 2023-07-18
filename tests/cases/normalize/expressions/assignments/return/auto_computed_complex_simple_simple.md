# Preval test case

# auto_computed_complex_simple_simple.md

> Normalize > Expressions > Assignments > Return > Auto computed complex simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
function f() {
  return (a = { b: $(1) });
}
$(f());
$(a)["b"] = 2;
$(a);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = { b: $(1) });
};
let a = { a: 999, b: 1000 };
$(f());
$(a)[`b`] = 2;
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  return a;
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpAssignMemLhsObj = $(a);
tmpAssignMemLhsObj.b = 2;
$(a);
`````

## Output

`````js filename=intro
const tmpObjLitVal = $(1);
const tmpClusterSSA_a = { b: tmpObjLitVal };
$(tmpClusterSSA_a);
const tmpAssignMemLhsObj = $(tmpClusterSSA_a);
tmpAssignMemLhsObj.b = 2;
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = { b: a };
$( b );
const c = $( b );
c.b = 2;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: { b: '1' }
 - 4: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
