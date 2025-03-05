# Preval test case

# auto_ident_array_complex.md

> Normalize > Expressions > Statement > Stmt func block > Auto ident array complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  {
    let a = { a: 999, b: 1000 };
    [$(1), 2, $(3)];
    $(a);
  }
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  {
    let a = { a: 999, b: 1000 };
    [$(1), 2, $(3)];
    $(a);
  }
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  $(1);
  $(3);
  debugger;
  let a = { a: 999, b: 1000 };
  $(a);
  return undefined;
};
const tmpCalleeParam = f();
$(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(1);
$(3);
const a /*:object*/ = { a: 999, b: 1000 };
$(a);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 1 );
$( 3 );
const a = {
  a: 999,
  b: 1000,
};
$( a );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 3
 - 3: { a: '999', b: '1000' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
