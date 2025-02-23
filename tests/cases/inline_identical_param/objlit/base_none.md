# Preval test case

# base_none.md

> Inline identical param > Objlit > Base none
>
>

## Input

`````js filename=intro
function f(obj) {
  $(obj);
  $(obj);
}

f({});
f({});
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let obj = $$0;
  debugger;
  $(obj);
  $(obj);
};
f({});
f({});
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let obj = $$0;
  debugger;
  $(obj);
  $(obj);
  return undefined;
};
const tmpCallCallee = f;
const tmpCalleeParam = {};
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = {};
tmpCallCallee$1(tmpCalleeParam$1);
`````

## Output


`````js filename=intro
const f /*:()=>*/ = function () {
  debugger;
  const obj /*:object*/ = {};
  $(obj);
  $(obj);
  return undefined;
};
f();
f();
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = {};
  $( b );
  $( b );
  return undefined;
};
a();
a();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: {}
 - 2: {}
 - 3: {}
 - 4: {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
