# Preval test case

# else_write_write.md

> Redundant writes > Else write write
>
> In this case only the last write to x is relevant and the let should be moved down

In this case it's a closure so ref tracking logic is unsafe to apply without more checks

Counter case: the whole thing is try/catch and $(1) throws and x is a closure.

This would be observable:
  let x; try { if ($) x = 10; x = $(20); } catch { } $(x)

So it's not actually safe to do this in all situations. But most tho.
- Var is not a closure, or
- Code is not try/catch wrapped

## Input

`````js filename=intro
const f = function() {
  $(x); // It escapes. At call time. Source code order is irrelevant
};
let x = $; // Not observed, but closure
if ($) {

} else {
  x = {}; // Not observed
}
x = $(1);
$(x.headers);
$(f);
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  $(x);
};
let x = $;
if ($) {
} else {
  x = {};
}
x = $(1);
$(x.headers);
$(f);
`````

## Normalized


`````js filename=intro
const f = function () {
  debugger;
  $(x);
  return undefined;
};
let x = $;
if ($) {
} else {
  x = {};
}
x = $(1);
const tmpCalleeParam = x.headers;
$(tmpCalleeParam);
$(f);
`````

## Output


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  $(x);
  return undefined;
};
let x /*:unknown*/ = $;
x = $(1);
const tmpCalleeParam /*:unknown*/ = x.headers;
$(tmpCalleeParam);
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( b );
  return undefined;
};
let b = $;
b = $( 1 );
const c = b.headers;
$( c );
$( a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
