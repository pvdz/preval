# Preval test case

# self_div.md

> Tofix > Self div

- fix the current test outcome; settled side $() effects are not same as input
- can we do better to predict the arg/arg ?
- can we improve how arg%0 is currently left? probably not but that's why we have $spy
- if we know a function would not spy IF given primitives and we see it being called with primitives can we not create a $free function for the whole func and replace at least those calls, which may then hopefully resolve by preval?
  - in this case, when the input is string, we know the result is undefined
  - and when the input is number, we know the result is input+1
  - after that, the function can be outlined to the only remaining call, which may simplify the $spy call a bit?
- the original function would keep calling itself, so not $(argup) but f(argup)

## Input

`````js filename=intro
function f(arg) {
  const tmpCalleeParam$141 = typeof arg;
  const tmpReturnArg$107 = tmpCalleeParam$141 === `string`;
  if (tmpReturnArg$107) {
  } else {
    const one    /*:number*/  = arg / arg;                         // <- isn't this outcome known? maybe...
    const onestr /*:string*/  = $coerce(one, `string`);
    const len    /*:number*/  = onestr.length;
    const isone  /*:boolean*/ = len === 1;
    if (isone) {
      arg % 0;                                                     // <- seems silly to keep this but maybe
    } else {
    }
    const argup = arg + 1;
    $(argup);                                                      // <- also lookinto the case where this recurses
  }
}
f(500);
f('thing');
f($spy());
`````

## Pre Normal


`````js filename=intro
let f = function ($$0) {
  let arg = $$0;
  debugger;
  const tmpCalleeParam$141 = typeof arg;
  const tmpReturnArg$107 = tmpCalleeParam$141 === `string`;
  if (tmpReturnArg$107) {
  } else {
    const one = arg / arg;
    const onestr = $coerce(one, `string`);
    const len = onestr.length;
    const isone = len === 1;
    if (isone) {
      arg % 0;
    } else {
    }
    const argup = arg + 1;
    $(argup);
  }
};
f(500);
f(`thing`);
f($spy());
`````

## Normalized


`````js filename=intro
let f = function ($$0) {
  let arg = $$0;
  debugger;
  const tmpCalleeParam$141 = typeof arg;
  const tmpReturnArg$107 = tmpCalleeParam$141 === `string`;
  if (tmpReturnArg$107) {
    return undefined;
  } else {
    const one = arg / arg;
    const onestr = $coerce(one, `string`);
    const len = onestr.length;
    const isone = len === 1;
    if (isone) {
      arg % 0;
    } else {
    }
    const argup = arg + 1;
    $(argup);
    return undefined;
  }
};
f(500);
f(`thing`);
const tmpCallCallee = f;
const tmpCalleeParam = $spy();
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpFree /*:(number)=>string*/ = function $free($$0) {
  const arg /*:number*/ = $$0;
  debugger;
  const one /*:number*/ = arg / arg;
  const tmpRet /*:string*/ = $coerce(one, `string`);
  return tmpRet;
};
const f /*:(number)=>undefined*/ = function ($$0) {
  const arg$1 /*:number*/ = $$0;
  debugger;
  const onestr /*:string*/ = $frfr(tmpFree, arg$1);
  onestr.length;
  const argup /*:number*/ = arg$1 + 1;
  $(argup);
  return undefined;
};
f(500);
f(`thing`);
const tmpCalleeParam = $spy();
f(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = function b($$0 ) {
  const c = $$0;
  debugger;
  const d = c / c;
  const e = $coerce( d, "string" );
  return e;
};
const f = function($$0 ) {
  const g = $$0;
  debugger;
  const h = i( a, g );
  h.length;
  const j = g + 1;
  $( j );
  return undefined;
};
f( 500 );
f( "thing" );
const k = $spy();
f( k );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 501
 - 2: 'Creating spy', 1, 0, ['spy', 12345]
 - 3: '$spy[1].valueOf()'
 - 4: '$spy[1].valueOf()'
 - 5: '$spy[1].valueOf()'
 - 6: '$spy[1].valueOf()'
 - 7: 12346
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: BAD!!
 - 1: 501
 - 2: 'thing1'
 - 3: 'Creating spy', 1, 0, ['spy', 12345]
 - 4: '$spy[1].valueOf()'
 - 5: '$spy[1].valueOf()'
 - 6: '$spy[1].valueOf()'
 - 7: 12346
 - eval returned: undefined
