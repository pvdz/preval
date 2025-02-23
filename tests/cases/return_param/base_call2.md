# Preval test case

# base_call2.md

> Return param > Base call2
>
> Returning a static param mutation but also reading it so we can't just eliminate it

## Input

`````js filename=intro
const f = function () {
  $('no');
  $('inlining');
  $('please');
  return undefined;
};
undefined;
f();
$('pass');
$(undefined);
undefined;
f();
const tmpCalleeParam$3 = 2();
$(tmpCalleeParam$3);
undefined;
f();
const tmpCalleeParam$5 = 'three'();
$(tmpCalleeParam$5);
`````

## Pre Normal


`````js filename=intro
const f = function () {
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  return undefined;
};
undefined;
f();
$(`pass`);
$(undefined);
undefined;
f();
const tmpCalleeParam$3 = 2();
$(tmpCalleeParam$3);
undefined;
f();
const tmpCalleeParam$5 = `three`();
$(tmpCalleeParam$5);
`````

## Normalized


`````js filename=intro
const f = function () {
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
const tmpCalleeParam$3 = 2();
throw `[Preval]: Call expression with illegal callee must crash before this line ; \`2()\``;
const tmpCalleeParam$5 = 0;
`````

## Output


`````js filename=intro
const f /*:()=>*/ = function () {
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
