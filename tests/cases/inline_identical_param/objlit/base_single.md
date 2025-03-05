# Preval test case

# base_single.md

> Inline identical param > Objlit > Base single
>
>

## Input

`````js filename=intro
function f(obj) {
  $(obj.a);
  $(obj.a);
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
  $(obj.a);
};
f({ a: 1 });
f({ a: 3 });
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let obj = $$0;
  debugger;
  const tmpCalleeParam = obj.a;
  $(tmpCalleeParam);
  const tmpCalleeParam$1 = obj.a;
  $(tmpCalleeParam$1);
  return undefined;
};
const tmpCallCallee = f;
const tmpCalleeParam$3 = { a: 1 };
tmpCallCallee(tmpCalleeParam$3);
const tmpCallCallee$1 = f;
const tmpCalleeParam$5 = { a: 3 };
tmpCallCallee$1(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
const f /*:(number)=>undefined*/ = function ($$0) {
  const a /*:number*/ = $$0;
  debugger;
  $(a);
  $(a);
  return undefined;
};
f(1);
f(3);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  $( b );
  $( b );
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
 - 2: 1
 - 3: 3
 - 4: 3
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
