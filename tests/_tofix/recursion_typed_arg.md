# Preval test case

# recursion_typed_arg.md

> Tofix > recursion typed arg
>
> Recursion arg typing

From 2021-08-09_orus_console_hijacker.js

It should be able to know that the arg is a number. The initial call is a number, there are no further 
outside calls. And the recursion call uses the result of the argument plus a number. At the very least
that should downgrade the argument from a number to a primitive. But in this case we should be able to
nail it down to a number.

## Input

`````js filename=intro
const func /*:(unknown)=>undefined*/ = function($$0) {
  const arg = $$0;
  debugger;
  const onesie /*:number*/ = arg / arg;
  const onestrie /*:string*/ = $coerce(onesie, `string`);
  const onetoo /*:number*/ = onestrie.length;
  const test /*:boolean*/ = 1 === onetoo;
  if (test) {
    return 'end';
  } else {
    const next /*:primitive*/ = arg + 1; // This pseudo-self-assignment throws off the type checker
    func(next);
    return 'pass';
  }
};
$(func(0));
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree = function $free($dlr_$$0) {
  const tmpRet = $coerce($dlr_$$0 / $dlr_$$0, `string`);
  return tmpRet;
};
const func = function ($dlr_$$1) {
  const onetoo = $frfr(tmpFree, $dlr_$$1).length;
  if (1 === onetoo) {
    return `end`;
  } else {
    func($dlr_$$1 + 1);
    return `pass`;
  }
};
$(func(0));
`````

## Pre Normal


`````js filename=intro
const func = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const arg = $dlr_$$0;
  const onesie = arg / arg;
  const onestrie = $coerce(onesie, `string`);
  const onetoo = onestrie.length;
  const test = 1 === onetoo;
  if (test) {
    return `end`;
  } else {
    const next = arg + 1;
    func(next);
    return `pass`;
  }
};
$(func(0));
`````

## Normalized


`````js filename=intro
const func = function ($$0) {
  let $dlr_$$0 = $$0;
  debugger;
  const arg = $dlr_$$0;
  const onesie = arg / arg;
  const onestrie = $coerce(onesie, `string`);
  const onetoo = onestrie.length;
  const test = 1 === onetoo;
  if (test) {
    return `end`;
  } else {
    const next = arg + 1;
    func(next);
    return `pass`;
  }
};
const tmpCalleeParam = func(0);
$(tmpCalleeParam);
`````

## Settled


`````js filename=intro
const tmpFree /*:(primitive)=>string*/ = function $free($$0) {
  const $dlr_$$0 /*:primitive*/ = $$0;
  debugger;
  const onesie /*:number*/ = $dlr_$$0 / $dlr_$$0;
  const tmpRet /*:string*/ = $coerce(onesie, `string`);
  return tmpRet;
};
const func /*:(primitive)=>string*/ = function ($$0) {
  const $dlr_$$1 /*:primitive*/ = $$0;
  debugger;
  const onestrie /*:string*/ = $frfr(tmpFree, $dlr_$$1);
  const onetoo /*:number*/ = onestrie.length;
  const test /*:boolean*/ = 1 === onetoo;
  if (test) {
    return `end`;
  } else {
    const next /*:primitive*/ = $dlr_$$1 + 1;
    func(next);
    return `pass`;
  }
};
const tmpCalleeParam /*:string*/ = func(0);
$(tmpCalleeParam);
`````

## PST Settled
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
  const j = h.length;
  const k = 1 === j;
  if (k) {
    return "end";
  }
  else {
    const l = g + 1;
    f( l );
    return "pass";
  }
};
const m = f( 0 );
$( m );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
