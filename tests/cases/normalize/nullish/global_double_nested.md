# Preval test case

# global_double_nested.md

> normalize > member_access > global_double_nested
>
> Ident property access should not be changed

## Input

`````js filename=intro
const obj = {a: {b: {c: $()}}};
$(obj??a??b??c);
`````

## Normalized

`````js filename=intro
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
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
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
tmpCallCallee(tmpCalleeParam);
`````

## Result

Should call `$` with:
 - 1: 
 - 2: { a: '{"b":"{\\"c\\":\\"undefined\\"}"}' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
