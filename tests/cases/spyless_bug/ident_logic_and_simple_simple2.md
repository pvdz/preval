# Preval test case

# ident_logic_and_simple_simple2.md

> Spyless bug > Ident logic and simple simple2
>
> Normalization of assignments should work the same everywhere they are

This caught a regression in the movement of spyless var

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothRhs = 1;
if (tmpBinBothRhs) {
  tmpBinBothRhs = 2;
} else {
}
a = a * tmpBinBothRhs;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothRhs = 1;
if (tmpBinBothRhs) {
  tmpBinBothRhs = 2;
} else {
}
a = a * tmpBinBothRhs;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpBinBothRhs = 1;
if (tmpBinBothRhs) {
  tmpBinBothRhs = 2;
} else {
}
a = a * tmpBinBothRhs;
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpClusterSSA_a = a * 2;
$(tmpClusterSSA_a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
a: 999,
b: 1000
;
const b = a * 2;
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: NaN
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
