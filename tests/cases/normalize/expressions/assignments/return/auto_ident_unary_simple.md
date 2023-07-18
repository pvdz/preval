# Preval test case

# auto_ident_unary_simple.md

> Normalize > Expressions > Assignments > Return > Auto ident unary simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = typeof x);
}
$(f());
$(a, x);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = typeof x);
};
let x = 1;
let a = { a: 999, b: 1000 };
$(f());
$(a, x);
`````

## Normalized

`````js filename=intro
let f = function () {
  debugger;
  a = typeof x;
  return a;
};
let x = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
$(a, x);
`````

## Output

`````js filename=intro
$(`number`);
$(`number`, 1);
`````

## PST Output

With rename=true

`````js filename=intro
$( "number" );
$( "number", 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'number'
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
