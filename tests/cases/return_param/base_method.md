# Preval test case

# base_method.md

> Return param > Base method
>
> If a function returns a static mutation to a param value we can outline the param and drop it

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = x.toString();
  return y;
}

$(f([1, 2, 3]));
$(f(300));
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
  const y = x.toString();
  return y;
};
$(f([1, 2, 3]));
$(f(300));
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
  const y = x.toString();
  return y;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = f;
const tmpCalleeParam$1 = [1, 2, 3];
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(300);
tmpCallCallee$3(tmpCalleeParam$3);
const tmpCallCallee$5 = $;
const tmpCalleeParam$5 = f(`three`);
tmpCallCallee$5(tmpCalleeParam$5);
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
const tmpCalleeParam$1 /*:array*/ = [1, 2, 3];
const tmpCalleeParam /*:string*/ = tmpCalleeParam$1.toString();
$(tmpCalleeParam);
f();
$(`300`);
f();
$(`three`);
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
const b = [ 1, 2, 3 ];
const c = b.toString();
$( c );
a();
$( "300" );
a();
$( "three" );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: '1,2,3'
 - 5: 'no'
 - 6: 'inlining'
 - 7: 'please'
 - 8: '300'
 - 9: 'no'
 - 10: 'inlining'
 - 11: 'please'
 - 12: 'three'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
