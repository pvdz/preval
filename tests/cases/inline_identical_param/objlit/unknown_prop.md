# Preval test case

# unknown_prop.md

> Inline identical param > Objlit > Unknown prop
>
>

## Input

`````js filename=intro
function f(obj) {
  $(obj.a);
  $(obj.b); // Note: neither object has a b property... this will return Object.prototype.b
}

f({a: 1});
f({a: 3});
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let obj = $$0;
  debugger;
  $(obj.a);
  $(obj.b);
};
f({ a: 1 });
f({ a: 3 });
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
  return undefined;
};
const tmpCallCallee$3 = f;
const tmpCalleeParam$3 = { a: 1 };
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$5 = f;
const tmpCalleeParam$5 = { a: 3 };
tmpCallCallee$5(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
const f = function ($$0) {
  const a = $$0;
  debugger;
  $(a);
  const tmpCalleeParam$1 = $ObjectPrototype.b;
  $(tmpCalleeParam$1);
  return undefined;
};
f(1);
f(3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = c;
  debugger;
  $( b );
  const d = $ObjectPrototype.b;
  $( d );
  return undefined;
};
a( 1 );
a( 3 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: undefined
 - 3: 3
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
