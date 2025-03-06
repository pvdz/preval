# Preval test case

# auto_ident_arr_pattern_assign_seq.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident arr pattern assign seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let x = 1,
      y = 2;

    let a = { a: 999, b: 1000 };
    [x, y] = ($(x), $(y), [$(3), $(4)]);
    $(a, x, y);
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let x = 1,
      y = 2;
    let a = { a: 999, b: 1000 };
    [x, y] = ($(x), $(y), [$(3), $(4)]);
    $(a, x, y);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let x = 1;
  let y = 2;
  let a = { a: 999, b: 1000 };
  $(x);
  $(y);
  const tmpArrElement = $(3);
  const tmpArrElement$1 = $(4);
  const arrAssignPatternRhs = [tmpArrElement, tmpArrElement$1];
  const arrPatternSplat = [...arrAssignPatternRhs];
  x = arrPatternSplat[0];
  y = arrPatternSplat[1];
  $(a, x, y);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
$(2);
const tmpArrElement /*:unknown*/ = $(3);
const tmpArrElement$1 /*:unknown*/ = $(4);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, tmpArrElement, tmpArrElement$1);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( 3 );
const b = $( 4 );
const c = {
  a: 999,
  b: 1000,
};
$( c, a, b );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 3
 - 4: 4
 - 5: { a: '999', b: '1000' }, 3, 4
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope