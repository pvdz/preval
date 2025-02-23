# Preval test case

# if_x_else_ret_bool_x.md

> Ret bool after if > If x else ret bool x
>
> This one works

## Input

`````js filename=intro
function f() {
  const x = Boolean(y);
  if (y) {
    return y;
  } else {
    return x;
  }
}
$(f());
$(f());
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const x = Boolean(y);
  if (y) {
    return y;
  } else {
    return x;
  }
};
$(f());
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const x = Boolean(y);
  if (y) {
    return y;
  } else {
    return x;
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f();
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f();
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const f /*:()=>?,boolean*/ = function () {
  debugger;
  if (y) {
    return y;
  } else {
    const x /*:boolean*/ = Boolean(y);
    return x;
  }
};
const tmpCalleeParam /*:unknown*/ = f();
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:unknown*/ = f();
$(tmpCalleeParam$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  if (y) {
    return y;
  }
  else {
    const b = Boolean( y );
    return b;
  }
};
const c = a();
$( c );
const d = a();
$( d );
`````

## Globals

BAD@! Found 1 implicit global bindings:

y

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
