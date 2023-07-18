# Preval test case

# auto_ident_unary_void_simple.md

> Normalize > Expressions > Assignments > Stmt func top > Auto ident unary void simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
function f() {
  let arg = 1;

  let a = { a: 999, b: 1000 };
  a = void arg;
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
  a = void arg;
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
  a = undefined;
  $(a, arg);
  return undefined;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
$(undefined, 1);
$(undefined);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined, 1 );
$( undefined );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined, 1
 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
