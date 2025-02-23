# Preval test case

# middle_param_multi_prop.md

> Inline identical param > Objlit > Middle param multi prop
>
>

## Input

`````js filename=intro
function f(x, obj, y) {
  $(x, y, obj.a);
  $(x, y, obj.b);
  $(x, y, obj.c);
  $(x, y, obj.d);
}

f("first1", {a: 1, b: 2, c: 'hi', d: parseInt}, "last1");
f("first2", {a: 3, b: 4, c: true, d: null}, "last2");
`````

## Pre Normal


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  let x = $$0;
  let obj = $$1;
  let y = $$2;
  debugger;
  $(x, y, obj.a);
  $(x, y, obj.b);
  $(x, y, obj.c);
  $(x, y, obj.d);
};
f(`first1`, { a: 1, b: 2, c: `hi`, d: parseInt }, `last1`);
f(`first2`, { a: 3, b: 4, c: true, d: null }, `last2`);
`````

## Normalized


`````js filename=intro
let f = function ($$0, $$1, $$2) {
  let x = $$0;
  let obj = $$1;
  let y = $$2;
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = x;
  const tmpCalleeParam$1 = y;
  const tmpCalleeParam$3 = obj.a;
  tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1, tmpCalleeParam$3);
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$5 = x;
  const tmpCalleeParam$7 = y;
  const tmpCalleeParam$9 = obj.b;
  tmpCallCallee$1(tmpCalleeParam$5, tmpCalleeParam$7, tmpCalleeParam$9);
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$11 = x;
  const tmpCalleeParam$13 = y;
  const tmpCalleeParam$15 = obj.c;
  tmpCallCallee$3(tmpCalleeParam$11, tmpCalleeParam$13, tmpCalleeParam$15);
  const tmpCallCallee$5 = $;
  const tmpCalleeParam$17 = x;
  const tmpCalleeParam$19 = y;
  const tmpCalleeParam$21 = obj.d;
  tmpCallCallee$5(tmpCalleeParam$17, tmpCalleeParam$19, tmpCalleeParam$21);
  return undefined;
};
const tmpCallCallee$7 = f;
const tmpCalleeParam$23 = `first1`;
const tmpCalleeParam$25 = { a: 1, b: 2, c: `hi`, d: parseInt };
const tmpCalleeParam$27 = `last1`;
tmpCallCallee$7(tmpCalleeParam$23, tmpCalleeParam$25, tmpCalleeParam$27);
const tmpCallCallee$9 = f;
const tmpCalleeParam$29 = `first2`;
const tmpCalleeParam$31 = { a: 3, b: 4, c: true, d: null };
const tmpCalleeParam$33 = `last2`;
tmpCallCallee$9(tmpCalleeParam$29, tmpCalleeParam$31, tmpCalleeParam$33);
`````

## Output


`````js filename=intro
const f /*:(string, number, string, number, primitive, unknown)=>undefined*/ = function ($$0, $$1, $$2, $$3, $$4, $$5) {
  const d /*:unknown*/ = $$5;
  const c /*:primitive*/ = $$4;
  const b /*:number*/ = $$3;
  const x /*:string*/ = $$0;
  const a /*:number*/ = $$1;
  const y /*:string*/ = $$2;
  debugger;
  $(x, y, a);
  $(x, y, b);
  $(x, y, c);
  $(x, y, d);
  return undefined;
};
f(`first1`, 1, `last1`, 2, `hi`, parseInt);
f(`first2`, 3, `last2`, 4, true, null);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2,$$3,$$4,$$5 ) {
  const b = $$5;
  const c = $$4;
  const d = $$3;
  const e = $$0;
  const f = $$1;
  const g = $$2;
  debugger;
  $( e, g, f );
  $( e, g, d );
  $( e, g, c );
  $( e, g, b );
  return undefined;
};
a( "first1", 1, "last1", 2, "hi", parseInt );
a( "first2", 3, "last2", 4, true, null );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'first1', 'last1', 1
 - 2: 'first1', 'last1', 2
 - 3: 'first1', 'last1', 'hi'
 - 4: 'first1', 'last1', '<function>'
 - 5: 'first2', 'last2', 3
 - 6: 'first2', 'last2', 4
 - 7: 'first2', 'last2', true
 - 8: 'first2', 'last2', null
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
