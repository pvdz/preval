# Preval test case

# auto_ident_arr_pattern_assign.md

> Normalize > Expressions > Statement > Logic and both > Auto ident arr pattern assign
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let x = 1,
  y = 2;

let a = { a: 999, b: 1000 };
([x, y] = [$(3), $(4)]) && ([x, y] = [$(3), $(4)]);
$(a, x, y);
`````

## Settled


`````js filename=intro
$(3);
$(4);
const tmpArrElement$3 /*:unknown*/ = $(3);
const tmpArrElement$5 /*:unknown*/ = $(4);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpArrElement$3, tmpArrElement$5);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(3);
$(4);
const tmpArrElement$3 = $(3);
const tmpArrElement$5 = $(4);
$({ a: 999, b: 1000 }, tmpArrElement$3, tmpArrElement$5);
`````

## Pre Normal


`````js filename=intro
let x = 1,
  y = 2;
let a = { a: 999, b: 1000 };
([x, y] = [$(3), $(4)]) && ([x, y] = [$(3), $(4)]);
$(a, x, y);
`````

## Normalized


`````js filename=intro
let x = 1;
let y = 2;
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpArrElement = $(3);
const tmpArrElement$1 = $(4);
const tmpNestedAssignArrPatternRhs = [tmpArrElement, tmpArrElement$1];
const arrPatternSplat = [...tmpNestedAssignArrPatternRhs];
x = arrPatternSplat[0];
y = arrPatternSplat[1];
tmpIfTest = tmpNestedAssignArrPatternRhs;
if (tmpIfTest) {
  const tmpArrElement$3 = $(3);
  const tmpArrElement$5 = $(4);
  const arrAssignPatternRhs = [tmpArrElement$3, tmpArrElement$5];
  const arrPatternSplat$1 = [...arrAssignPatternRhs];
  x = arrPatternSplat$1[0];
  y = arrPatternSplat$1[1];
  $(a, x, y);
} else {
  $(a, x, y);
}
`````

## PST Settled
With rename=true

`````js filename=intro
$( 3 );
$( 4 );
const a = $( 3 );
const b = $( 4 );
const c = {
  a: 999,
  b: 1000,
};
$( c, a, b );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: 3
 - 2: 4
 - 3: 3
 - 4: 4
 - 5: { a: '999', b: '1000' }, 3, 4
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
- inline computed array property read
