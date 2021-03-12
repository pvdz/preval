# Preval test case

# auto_seq_complex_computed_complex.md

> Normalize > Expressions > Assignments > Stmt func top > Auto seq complex computed complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let a = { a: 999, b: 1000 };
  (a = { b: $(1) })($(1), $(a))[$("b")] = $(2);
  $(a);

  //*/// (end of file artifact)
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  (a = { b: $(1) })($(1), $(a))[$('b')] = $(2);
  $(a);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  let a = { a: 999, b: 1000 };
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  let tmpCallCallee = a;
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(a);
  const tmpAssignComMemLhsObj = tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
  const tmpAssignComMemLhsProp = $('b');
  const tmpAssignComputedObj = tmpAssignComMemLhsObj;
  const tmpAssignComputedProp = tmpAssignComMemLhsProp;
  const tmpAssignComputedRhs = $(2);
  tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
  $(a);
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = f();
tmpCallCallee$1(tmpCalleeParam$2);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpObjLitVal = $(1);
  const SSA_a = { b: tmpObjLitVal };
  const tmpCalleeParam = $(1);
  const tmpCalleeParam$1 = $(SSA_a);
  const tmpAssignComMemLhsObj = SSA_a(tmpCalleeParam, tmpCalleeParam$1);
  const tmpAssignComMemLhsProp = $('b');
  const tmpAssignComputedRhs = $(2);
  tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
  $(SSA_a);
};
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

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
