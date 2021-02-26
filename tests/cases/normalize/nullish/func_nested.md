# Preval test case

# func_nested.md

> Normalize > Nullish > Func nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: $()}};
  return $(obj??a??b);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  const tmpCallCallee = $;
  let tmpCalleeParam = obj;
  const tmpIfTest = tmpCalleeParam == null;
  if (tmpIfTest) {
    tmpCalleeParam = a;
  }
  const tmpIfTest$1 = tmpCalleeParam == null;
  if (tmpIfTest$1) {
    tmpCalleeParam = b;
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
const f = function () {
  const tmpObjLitVal$1 = $();
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
  let tmpCalleeParam = obj;
  const tmpIfTest = tmpCalleeParam == null;
  if (tmpIfTest) {
    tmpCalleeParam = a;
  }
  const tmpIfTest$1 = tmpCalleeParam == null;
  if (tmpIfTest$1) {
    tmpCalleeParam = b;
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

BAD@! Found 2 implicit global bindings:

a, b

## Result

Should call `$` with:
 - 1: 
 - 2: { a: '{"b":"undefined"}' }
 - 3: { a: '{"b":"undefined"}' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
