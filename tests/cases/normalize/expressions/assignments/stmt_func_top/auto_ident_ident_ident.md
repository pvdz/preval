# Preval test case

# auto_ident_ident_ident.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident ident ident
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = 1,
    c = 2;

  let a = { a: 999, b: 1000 };
  a = b = 2;
  $(a, b, c);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = 1,
    c = 2;
  let a = { a: 999, b: 1000 };
  a = b = 2;
  $(a, b, c);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = 1;
  let c = 2;
  let a = { a: 999, b: 1000 };
  b = 2;
  a = 2;
  $(a, b, c);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(2, 2, 2);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( 2, 2, 2 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2, 2, 2
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
