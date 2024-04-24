# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Assignments > Return > Auto ident unary complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
function f() {
  return (a = typeof $(x));
}
$(f());
$(a, x);
`````

## Pre Normal

`````js filename=intro
let f = function () {
  debugger;
  return (a = typeof $(x));
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
  const tmpUnaryArg = $(x);
  a = typeof tmpUnaryArg;
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
const tmpUnaryArg = $(1);
const tmpSSA_a = typeof tmpUnaryArg;
$(tmpSSA_a);
$(tmpSSA_a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeofa;
$( b );
$( b, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number'
 - 3: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
