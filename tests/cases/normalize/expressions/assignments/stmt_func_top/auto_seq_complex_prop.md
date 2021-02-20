# Preval test case

# auto_seq_complex_prop.md

> Normalize > Expressions > Assignments > Stmt func top > Auto seq complex prop
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  (a = { b: $(1) })($(1), $(a)).b = $(2);
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  let tmpCallCallee = a;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(a);
  const tmpAssignMemLhsObj = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  const tmpAssignMemLhsObj$1 = tmpAssignMemLhsObj;
  const tmpAssignMemRhs = $(2);
  tmpAssignMemLhsObj$1.b = tmpAssignMemRhs;
  $(a);
}
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$1(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
function f() {
  const tmpObjLitVal = $(1);
  const SSA_a = { b: tmpObjLitVal };
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(SSA_a);
  const tmpAssignMemLhsObj = SSA_a(tmpCalleeParam, tmpCalleeParam$1);
  const tmpAssignMemRhs = $(2);
  tmpAssignMemLhsObj.b = tmpAssignMemRhs;
  $(SSA_a);
}
const tmpCalleeParam$2 = f();
$(tmpCalleeParam$2);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: { b: '1' }
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
