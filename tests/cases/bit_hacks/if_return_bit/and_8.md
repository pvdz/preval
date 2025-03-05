# Preval test case

# and_8.md

> Bit hacks > If return bit > And 8
>
> Just making sure this got fixed

## Input

`````js filename=intro
function f(y) {
  const x = y & 8;
  if (x) { return 8; }
  else { return 0; }
}
$(f($(7)));
$(f($(8)));
$(f($(9)));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let y = $$0;
  debugger;
  const x = y & 8;
  if (x) {
    return 8;
  } else {
    return 0;
  }
};
$(f($(7)));
$(f($(8)));
$(f($(9)));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let y = $$0;
  debugger;
  const x = y & 8;
  if (x) {
    return 8;
  } else {
    return 0;
  }
};
const tmpCallCallee = f;
const tmpCalleeParam$1 = $(7);
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1);
$(tmpCalleeParam);
const tmpCallCallee$1 = f;
const tmpCalleeParam$5 = $(8);
const tmpCalleeParam$3 = tmpCallCallee$1(tmpCalleeParam$5);
$(tmpCalleeParam$3);
const tmpCallCallee$3 = f;
const tmpCalleeParam$9 = $(9);
const tmpCalleeParam$7 = tmpCallCallee$3(tmpCalleeParam$9);
$(tmpCalleeParam$7);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 /*:unknown*/ = $(7);
const x$5 /*:number*/ = tmpCalleeParam$1 & 8;
$(x$5);
const tmpCalleeParam$5 /*:unknown*/ = $(8);
const x$3 /*:number*/ = tmpCalleeParam$5 & 8;
$(x$3);
const tmpCalleeParam$9 /*:unknown*/ = $(9);
const x$1 /*:number*/ = tmpCalleeParam$9 & 8;
$(x$1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 7 );
const b = a & 8;
$( b );
const c = $( 8 );
const d = c & 8;
$( d );
const e = $( 9 );
const f = e & 8;
$( f );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 7
 - 2: 0
 - 3: 8
 - 4: 8
 - 5: 9
 - 6: 8
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
