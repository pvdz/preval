# Preval test case

# base_multi.md

> Inline identical param > Objlit > Base multi
>
>

## Input

`````js filename=intro
function f(obj) {
  $(obj.a);
  $(obj.b);
  $(obj.c);
  $(obj.d);
}

f({a: 1, b: 2, c: 'hi', d: parseInt});
f({a: 3, b: 4, c: true, d: null});
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let obj = $$0;
  debugger;
  $(obj.a);
  $(obj.b);
  $(obj.c);
  $(obj.d);
};
f({ a: 1, b: 2, c: `hi`, d: parseInt });
f({ a: 3, b: 4, c: true, d: null });
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let obj = $$0;
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = obj.a;
  tmpCallCallee(tmpCalleeParam);
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = obj.b;
  tmpCallCallee$1(tmpCalleeParam$1);
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = obj.c;
  tmpCallCallee$3(tmpCalleeParam$3);
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$5 = obj.d;
  tmpCallCallee$5(tmpCalleeParam$5);
  return undefined;
};
const tmpCallCallee$7 = f;
const tmpCalleeParam$7 = { a: 1, b: 2, c: `hi`, d: parseInt };
tmpCallCallee$7(tmpCalleeParam$7);
const tmpCallCallee$9 = f;
const tmpCalleeParam$9 = { a: 3, b: 4, c: true, d: null };
tmpCallCallee$9(tmpCalleeParam$9);
`````

## Output


`````js filename=intro
const f = function ($$0, $$1, $$2, $$3) {
  const d = $$3;
  const c = $$2;
  const b = $$1;
  const a = $$0;
  debugger;
  $(a);
  $(b);
  $(c);
  $(d);
  return undefined;
};
f(1, 2, `hi`, parseInt);
f(3, 4, true, null);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2,$$3 ) {
  const b = c;
  const d = e;
  const f = g;
  const h = i;
  debugger;
  $( h );
  $( f );
  $( d );
  $( b );
  return undefined;
};
a( 1, 2, "hi", parseInt );
a( 3, 4, true, null );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'hi'
 - 4: '<function>'
 - 5: 3
 - 6: 4
 - 7: true
 - 8: null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
