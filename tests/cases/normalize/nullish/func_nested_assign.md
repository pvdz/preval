# Preval test case

# func_nested_assign.md

> Normalize > Nullish > Func nested assign
>
> Assignment to nested property should normalize just fine

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  obj.a.b = 15;
  return $(obj??a??b);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: { b: $() } };
  obj.a.b = 15;
  return $(obj ?? a ?? b);
};
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpAssignMemLhsObj = obj.a;
  tmpAssignMemLhsObj.b = 15;
  const tmpCallCallee = $;
  let tmpCalleeParam = obj;
  const tmpIfTest = tmpCalleeParam == null;
  if (tmpIfTest) {
    tmpCalleeParam = a;
  } else {
  }
  const tmpIfTest$1 = tmpCalleeParam == null;
  if (tmpIfTest$1) {
    tmpCalleeParam = b;
  } else {
  }
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
tmpObjLitVal.b = 15;
let tmpCalleeParam = obj;
const tmpIfTest = obj == null;
let tmpIfTest$1 = undefined;
if (tmpIfTest) {
  tmpCalleeParam = a;
  tmpIfTest$1 = tmpCalleeParam == null;
} else {
  tmpIfTest$1 = tmpCalleeParam == null;
}
if (tmpIfTest$1) {
  const tmpClusterSSA_tmpReturnArg = $(b);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpClusterSSA_tmpReturnArg$1 = $(tmpCalleeParam);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

a, b

## Result

Should call `$` with:
 - 1: 
 - 2: { a: '{"b":"15"}' }
 - 3: { a: '{"b":"15"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
