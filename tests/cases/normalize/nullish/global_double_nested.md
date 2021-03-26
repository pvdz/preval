# Preval test case

# global_double_nested.md

> Normalize > Nullish > Global double nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: {c: $()}}};
$(obj??a??b??c);
`````

## Pre Normal

`````js filename=intro
const obj = { a: { b: { c: $() } } };
$(obj ?? a ?? b ?? c);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$3 = $();
const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
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
const tmpIfTest$3 = tmpCalleeParam == null;
if (tmpIfTest$3) {
  tmpCalleeParam = c;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal$3 = $();
const tmpObjLitVal$1 = { c: tmpObjLitVal$3 };
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
const tmpIfTest$3 = tmpCalleeParam == null;
if (tmpIfTest$3) {
  tmpCalleeParam = c;
}
$(tmpCalleeParam);
`````

## Globals

BAD@! Found 3 implicit global bindings:

a, b, c

## Result

Should call `$` with:
 - 1: 
 - 2: { a: '{"b":"{\\"c\\":\\"undefined\\"}"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
