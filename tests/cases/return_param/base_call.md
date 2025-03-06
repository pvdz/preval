# Preval test case

# base_call.md

> Return param > Base call
>
> If a function returns a static mutation to a param value we can outline the param and drop it

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = x();
  return y;
}

$(f(function(){ $('pass'); }));
$(f(2));
$(f('three'));
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = x();
  return y;
};
$(
  f(function () {
    debugger;
    $(`pass`);
  }),
);
$(f(2));
$(f(`three`));
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = x();
  return y;
};
const tmpCallCallee = f;
const tmpCalleeParam$1 = function () {
  debugger;
  $(`pass`);
  return undefined;
};
const tmpCalleeParam = tmpCallCallee(tmpCalleeParam$1);
$(tmpCalleeParam);
const tmpCalleeParam$3 = f(2);
$(tmpCalleeParam$3);
const tmpCalleeParam$5 = f(`three`);
$(tmpCalleeParam$5);
`````

## Output


`````js filename=intro
const f /*:()=>unknown*/ = function () {
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  return undefined;
};
f();
$(`pass`);
$(undefined);
f();
2();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`2()\``;
`````

## PST Output

With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "no" );
  $( "inlining" );
  $( "please" );
  return undefined;
};
a();
$( "pass" );
$( undefined );
a();
2.undefined();
throw "[Preval]: Call expression with illegal callee must crash before this line ; `2()`";
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: 'pass'
 - 5: undefined
 - 6: 'no'
 - 7: 'inlining'
 - 8: 'please'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same

Todos triggered:
- maybe support this call case too