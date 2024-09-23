# Preval test case

# multi_scope_let_blocking.md

> Object literal > Static prop lookups > Multi scope let blocking
>
> If we can statically resolve a property lookup, we should

## Input

`````js filename=intro
let o = {x: $(1)};
const f = function() {
  $(o.x);
};
$(o.x);
o = {x: 10};
f();
f();
f();
`````

## Pre Normal


`````js filename=intro
let o = { x: $(1) };
const f = function () {
  debugger;
  $(o.x);
};
$(o.x);
o = { x: 10 };
f();
f();
f();
`````

## Normalized


`````js filename=intro
const tmpObjLitVal = $(1);
let o = { x: tmpObjLitVal };
const f = function () {
  debugger;
  const tmpCallCallee = $;
  const tmpCalleeParam = o.x;
  tmpCallCallee(tmpCalleeParam);
  return undefined;
};
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = o.x;
tmpCallCallee$1(tmpCalleeParam$1);
o = { x: 10 };
f();
f();
f();
`````

## Output


`````js filename=intro
const tmpObjLitVal = $(1);
let o /*:object*/ = { x: tmpObjLitVal };
const f /*:()=>*/ = function () {
  debugger;
  const tmpCalleeParam = o.x;
  $(tmpCalleeParam);
  return undefined;
};
$(tmpObjLitVal);
o = { x: 10 };
f();
f();
f();
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
let b = { x: a };
const c = function() {
  debugger;
  const d = b.x;
  $( d );
  return undefined;
};
$( a );
b = { x: 10 };
c();
c();
c();
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 10
 - 4: 10
 - 5: 10
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
