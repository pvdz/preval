# Preval test case

# global_after_use.md

> Normalize > Hoisting > Exported func default > Global after use
>
> Function declarations are hoisted and will be initialized at the start of a function. So they should be moved to the very top. Even above var decls of the same name, if any. Their order should not matter.

## Input

`````js filename=intro
$(f(1));
export default function f() { return $(2); }
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  return $(2);
};
$(f(1));
export { f as default };
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpReturnArg = $(2);
  return tmpReturnArg;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(1);
tmpCallCallee(tmpCalleeParam);
export { f as default };
`````

## Output


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  const tmpReturnArg /*:unknown*/ = $(2);
  return tmpReturnArg;
};
const tmpCalleeParam /*:unknown*/ = $(2);
$(tmpCalleeParam);
export { f as default };
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $( 2 );
  return b;
};
const c = $( 2 );
$( c );
export { a as default };
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
