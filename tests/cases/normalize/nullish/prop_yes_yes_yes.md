# Preval test case

# prop_yes_yes_yes.md

> Normalize > Nullish > Prop yes yes yes
>
> Mix nullish with regular member expressions

#TODO

## Input

`````js filename=intro
const a = {};
$(a??b??c??d);
`````

## Normalized

`````js filename=intro
const a = {};
const tmpCallCallee = $;
let tmpCalleeParam = a;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = b;
}
const tmpIfTest$1 = tmpCalleeParam == null;
if (tmpIfTest$1) {
  tmpCalleeParam = c;
}
const tmpIfTest$2 = tmpCalleeParam == null;
if (tmpIfTest$2) {
  tmpCalleeParam = d;
}
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const a = {};
let tmpCalleeParam = a;
const tmpIfTest = tmpCalleeParam == null;
if (tmpIfTest) {
  tmpCalleeParam = b;
}
const tmpIfTest$1 = tmpCalleeParam == null;
if (tmpIfTest$1) {
  tmpCalleeParam = c;
}
const tmpIfTest$2 = tmpCalleeParam == null;
if (tmpIfTest$2) {
  tmpCalleeParam = d;
}
$(tmpCalleeParam);
`````

## Globals

BAD@! Found 3 implicit global bindings:

b, c, d

## Result

Should call `$` with:
 - 1: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
