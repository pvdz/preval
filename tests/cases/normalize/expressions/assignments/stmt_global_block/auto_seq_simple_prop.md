# Preval test case

# auto_seq_simple_prop.md

> normalize > expressions > assignments > stmt_global_block > auto_seq_simple_prop
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  (a = { b: $(1) })($(1), a).b = $(2);
  $(a);
}
`````

## Normalized

`````js filename=intro
{
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
`````

## Output

`````js filename=intro
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
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
