# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident unary tilde simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let arg = 1;

  let a = { a: 999, b: 1000 };
  a = ~arg;
  $(a, arg);
}
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let arg = 1;
  let a = { a: 999, b: 1000 };
  a = ~arg;
  $(a, arg);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let arg = 1;
  let a = { a: 999, b: 1000 };
  a = ~arg;
  $(a, arg);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
$(-2, 1);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( -2, 1 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -2, 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
