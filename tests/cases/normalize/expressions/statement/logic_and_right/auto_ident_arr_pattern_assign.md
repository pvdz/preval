# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Statement > Logic and right > Auto ident arr pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
$(100) && ([x, y] = [$(3), $(4)]);
$(a, x, y);
`````

## Pre Normal

`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
$(100) && ([x, y] = [$(3), $(4)]);
$(a, x, y);
`````

## Normalized

`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const arrAssignPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
} else {
}
$(a, x, y);
`````

## Output

`````js filename=intro
let x = 1;
let y = 2;
const tmpIfTest = $(100);
const a = { a: 999, b: 1000 };
if (tmpIfTest) {
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  x = tmpArrElement;
  y = tmpArrElement$1;
  $(a, x, tmpArrElement$1);
} else {
  $(a, x, y);
}
`````

## PST Output

With rename=true

`````js filename=intro
let a = 1;
let b = 2;
const c = $( 100 );
const d = {
a: 999,
b: 1000
;
if (c) {
  const e = $( 3 );
  const f = $( 4 );
  a = e;
  b = f;
  $( d, a, f );
}
else {
  $( d, a, b );
}
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 3
 - 3: 4
 - 4: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
