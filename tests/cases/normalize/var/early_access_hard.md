# Preval test case

# early_access_hard.md

> Normalize > Var > Early access hard
>
> Actual early access case

The difficult case here is that the temporal differs from the lexical.

Function `f` is declared at the end, appearing after the `var` statement in the source code. Should `x` be updated here? No, because `f` is hoisted.

## Input

`````js filename=intro
$(f()); // We shouldn't break this being undefined
var x = 10; 
$(f());
function f() {
  return x;
}
`````

## Pre Normal


`````js filename=intro
let x = undefined;
let f = function () {
  debugger;
  return x;
};
$(f());
x = 10;
$(f());
`````

## Normalized


`````js filename=intro
let x = undefined;
let f = function () {
  debugger;
  return x;
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
x = 10;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
$(undefined);
$(10);
`````

## PST Output

With rename=true

`````js filename=intro
$( undefined );
$( 10 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: undefined
 - 2: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
