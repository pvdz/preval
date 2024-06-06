# Preval test case

# auto_ident_unary_tilde_simple.md

> Normalize > Expressions > Statement > Return > Auto ident unary tilde simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
function f() {
  return ~arg;
}
$(f());
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return ~arg;
};
let arg = 1;
let a = { a: 999, b: 1000 };
$(f());
$(a, arg);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = ~arg;
  return tmpReturnArg;
};
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
$(-2);
const a = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( -2 );
const a = {
a: 999,
b: 1000
;
$( a, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: -2
 - 2: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
