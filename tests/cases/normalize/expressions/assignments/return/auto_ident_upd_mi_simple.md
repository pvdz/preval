# Preval test case

# auto_ident_upd_mi_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident upd mi simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = --b);
}
$(f());
$(a, b);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return (a = --b);
};
let b = 1;
let a = { a: 999, b: 1000 };
$(f());
$(a, b);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpNestedCompoundLhs = b;
  const tmpNestedComplexRhs = tmpNestedCompoundLhs - 1;
  b = tmpNestedComplexRhs;
  a = tmpNestedComplexRhs;
  return a;
};
let b = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, b);
`````

## Output


`````js filename=intro
$(0);
$(0, 0);
`````

## PST Output

With rename=true

`````js filename=intro
$( 0 );
$( 0, 0 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0, 0
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
