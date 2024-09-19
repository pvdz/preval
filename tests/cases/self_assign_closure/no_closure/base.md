# Preval test case

# base.md

> Self assign closure > No closure > Base
>
> This case creates an inner function but no closures

## Input

`````js filename=intro
const arr = [`2175510YjCZON`, `10TAFtVj`, `11526394DNqxUn`, `60YWJuYY`, `794766IkrVMo`, `348105xrUwtS`];
let f = function(a, b) {
  f = function(c, d) {
    const tmp = c - 427;
    const Co$1 = arr[tmp];
    return Co$1;
  };
  const tmpReturnArg$23 = f(a, b);
  return tmpReturnArg$23;
};
$(f(430));
$(f(431));
$(f(432));
$(f); // escapes (important, otherwise different rules would tackle it)
`````

## Pre Normal


`````js filename=intro
const arr = [`2175510YjCZON`, `10TAFtVj`, `11526394DNqxUn`, `60YWJuYY`, `794766IkrVMo`, `348105xrUwtS`];
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  f = function ($$0, $$1) {
    let c = $$0;
    let d = $$1;
    debugger;
    const tmp = c - 427;
    const Co$1 = arr[tmp];
    return Co$1;
  };
  const tmpReturnArg$23 = f(a, b);
  return tmpReturnArg$23;
};
$(f(430));
$(f(431));
$(f(432));
$(f);
`````

## Normalized


`````js filename=intro
const arr = [`2175510YjCZON`, `10TAFtVj`, `11526394DNqxUn`, `60YWJuYY`, `794766IkrVMo`, `348105xrUwtS`];
let f = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  f = function ($$0, $$1) {
    let c = $$0;
    let d = $$1;
    debugger;
    const tmp = c - 427;
    const Co$1 = arr[tmp];
    return Co$1;
  };
  const tmpReturnArg$23 = f(a, b);
  return tmpReturnArg$23;
};
const tmpCallCallee = $;
const tmpCalleeParam = f(430);
tmpCallCallee(tmpCalleeParam);
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = f(431);
tmpCallCallee$1(tmpCalleeParam$1);
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = f(432);
tmpCallCallee$3(tmpCalleeParam$3);
$(f);
`````

## Output


`````js filename=intro
const arr /*:array*/ = [`2175510YjCZON`, `10TAFtVj`, `11526394DNqxUn`, `60YWJuYY`, `794766IkrVMo`, `348105xrUwtS`];
let f = function ($$0, $$1) {
  const a = $$0;
  const b = $$1;
  debugger;
  f = function ($$0, $$1) {
    const c = $$0;
    debugger;
    const tmp /*:number*/ = c - 427;
    const Co$1 = arr[tmp];
    return Co$1;
  };
  const tmpReturnArg$23 = f(a, b);
  return tmpReturnArg$23;
};
const tmpCalleeParam = f(430);
$(tmpCalleeParam);
const tmpCalleeParam$1 = f(431);
$(tmpCalleeParam$1);
const tmpCalleeParam$3 = f(432);
$(tmpCalleeParam$3);
$(f);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "2175510YjCZON", "10TAFtVj", "11526394DNqxUn", "60YWJuYY", "794766IkrVMo", "348105xrUwtS" ];
let b = function($$0,$$1 ) {
  const c = d;
  const e = f;
  debugger;
  b = function($$0,$$1 ) {
    const g = d;
    debugger;
    const h = g - 427;
    const i = a[ h ];
    return i;
  };
  const j = b( c, e );
  return j;
};
const k = b( 430 );
$( k );
const l = b( 431 );
$( l );
const m = b( 432 );
$( m );
$( b );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '60YWJuYY'
 - 2: '794766IkrVMo'
 - 3: '348105xrUwtS'
 - 4: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
