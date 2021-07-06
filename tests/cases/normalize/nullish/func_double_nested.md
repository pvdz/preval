# Preval test case

# func_double_nested.md

> Normalize > Nullish > Func double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const a = $(1), b = $(2), c = $(3);
function f() {
  const obj = {a: {b: {c: $()}}};
  return $(obj??a??b??c);
}
$(f());
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  const obj = { a: { b: { c: $() } } };
  return $(obj ?? a ?? b ?? c);
};
const a = $(1),
  b = $(2),
  c = $(3);
$(f());
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  const tmpObjLitVal$3 = $();
  const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
  const tmpObjLitVal = { b: tmpObjLitVal$1 };
  const obj = { a: tmpObjLitVal };
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
  const tmpIfTest$3 = tmpCalleeParam == null;
  if (tmpIfTest$3) {
    tmpCalleeParam = c;
  } else {
  }
  const tmpReturnArg = tmpCallCallee(tmpCalleeParam);
  return tmpReturnArg;
};
const a = $(1);
const b = $(2);
const c = $(3);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output

`````js filename=intro
const a = $(1);
const b = $(2);
const c = $(3);
const tmpObjLitVal$3 = $();
const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
let tmpCalleeParam = obj;
const tmpIfTest = obj == null;
let tmpIfTest$1 = undefined;
if (tmpIfTest) {
  tmpCalleeParam = a;
  tmpIfTest$1 = a == null;
} else {
  tmpIfTest$1 = tmpCalleeParam == null;
}
let tmpIfTest$3 = undefined;
if (tmpIfTest$1) {
  tmpCalleeParam = b;
  tmpIfTest$3 = b == null;
} else {
  tmpIfTest$3 = tmpCalleeParam == null;
}
if (tmpIfTest$3) {
  const tmpClusterSSA_tmpReturnArg = $(c);
  $(tmpClusterSSA_tmpReturnArg);
} else {
  const tmpClusterSSA_tmpReturnArg$1 = $(tmpCalleeParam);
  $(tmpClusterSSA_tmpReturnArg$1);
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 
 - 5: { a: '{"b":"{\\"c\\":\\"undefined\\"}"}' }
 - 6: { a: '{"b":"{\\"c\\":\\"undefined\\"}"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
