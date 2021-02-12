# Preval test case

# auto_seq_simple_prop.md

> normalize > expressions > assignments > stmt_func_top > auto_seq_simple_prop
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  (a = { b: $(1) })($(1), a).b = $(2);
  $(a);
}
$(f());
`````

## Normalized

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  let tmpCallCallee;
  const tmpObjLitVal = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  tmpCallCallee = tmpNestedComplexRhs;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = a;
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
  let a = { a: 999, b: 1000 };
  let tmpCallCallee;
  const tmpObjLitVal = $(1);
  const tmpNestedComplexRhs = { b: tmpObjLitVal };
  a = tmpNestedComplexRhs;
  tmpCallCallee = tmpNestedComplexRhs;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = a;
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

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
