# Preval test case

# func_double_nested.md

> Normalize > Nullish > Func double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
function f() {
  const obj = {a: {b: {c: $()}}};
  return $(obj??a??b??c);
}
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  const tmpObjLitVal$2 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$2 };
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
  const tmpIfTest$2 = tmpCalleeParam == null;
  if (tmpIfTest$2) {
    tmpCalleeParam = c;
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
  const tmpObjLitVal$2 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$2 };
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
  const tmpIfTest$2 = tmpCalleeParam == null;
  if (tmpIfTest$2) {
    tmpCalleeParam = c;
  }
  const tmpReturnArg = $(tmpCalleeParam);
  return tmpReturnArg;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## Globals

BAD@! Found 3 implicit global bindings:

a, b, c

## Result

Should call `$` with:
 - 1: 
 - 2: { a: '{"b":"{\\"c\\":\\"undefined\\"}"}' }
 - 3: { a: '{"b":"{\\"c\\":\\"undefined\\"}"}' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
