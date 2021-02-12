# Preval test case

# auto_seq_simple_computed_simple.md

> normalize > expressions > assignments > stmt_global_block > auto_seq_simple_computed_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  (a = { b: $(1) })($(1), a)["b"] = $(2);
  $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  let tmpCallCallee = a;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = a;
  const tmpAssignMemLhsObj = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  const tmpAssignComputedObj = tmpAssignMemLhsObj;
  const tmpAssignComputedProp = 'b';
  const tmpAssignComputedRhs = $(2);
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a);
}
`````

## Output

`````js filename=intro
{
  let a = { a: 999, b: 1000 };
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  let tmpCallCallee = a;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = a;
  const tmpAssignMemLhsObj = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  const tmpAssignComputedObj = tmpAssignMemLhsObj;
  const tmpAssignComputedRhs = $(2);
  tmpAssignComputedObj['b'] = tmpAssignComputedRhs;
  $(a);
}
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Normalized calls: Same

Final output calls: Same
