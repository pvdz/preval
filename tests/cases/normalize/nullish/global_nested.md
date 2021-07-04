# Preval test case

# global_nested.md

> Normalize > Nullish > Global nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: $()}};
$(obj??a??b);
`````

## Pre Normal

`````js filename=intro
const obj = { a: { b: $() } };
$(obj ?? a ?? b);
`````

## Normalized

`````js filename=intro
const tmpObjLitVal$1 = $();
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
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpObjLitVal$1 = $();
const tmpObjLitVal = { b: tmpObjLitVal$1 };
const obj = { a: tmpObjLitVal };
let tmpCalleeParam = obj;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = a;
} else {
}
const tmpIfTest$1 = tmpCalleeParam == null;
if (tmpIfTest$1) {
  b;
  $(b);
} else {
  $(tmpCalleeParam);
}
`````

## Globals

BAD@! Found 2 implicit global bindings:

a, b

## Result

Should call `$` with:
 - 1: 
 - 2: { a: '{"b":"undefined"}' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
