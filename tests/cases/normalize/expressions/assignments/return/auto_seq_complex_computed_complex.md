# Preval test case

# auto_seq_complex_computed_complex.md

> Normalize > Expressions > Assignments > Return > Auto seq complex computed complex
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
($(1), $(a))[$("b")] = $(2);
$(a);

//*/// (end of file artifact)
`````

## Pre Normal

`````js filename=intro
let f = function () {
  return (a = { b: $(1) });
};
let a = { a: 999, b: 1000 };
$(f());
($(1), $(a))[$('b')] = $(2);
$(a);
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  let tmpReturnArg = a;
  return tmpReturnArg;
};
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(1);
const tmpAssignComMemLhsObj = $(a);
const tmpAssignComMemLhsProp = $('b');
const tmpAssignComputedObj = tmpAssignComMemLhsObj;
const tmpAssignComputedProp = tmpAssignComMemLhsProp;
const tmpAssignComputedRhs = $(2);
tmpAssignComputedObj[tmpAssignComputedProp] = tmpAssignComputedRhs;
$(a);
`````

## Output

`````js filename=intro
const f = function () {
  const tmpObjLitVal = $(1);
  a = { b: tmpObjLitVal };
  const tmpReturnArg = a;
  return tmpReturnArg;
};
let a = { a: 999, b: 1000 };
const tmpCalleeParam = f();
$(tmpCalleeParam);
$(1);
const tmpAssignComMemLhsObj = $(a);
const tmpAssignComMemLhsProp = $('b');
const tmpAssignComputedRhs = $(2);
tmpAssignComMemLhsObj[tmpAssignComMemLhsProp] = tmpAssignComputedRhs;
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: { b: '1' }
 - 3: 1
 - 4: { b: '1' }
 - 5: 'b'
 - 6: 2
 - 7: { b: '2' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
