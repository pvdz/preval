# Preval test case

# arguments_default_with_args.md

> Arguments > Ai > Arguments default with args
>
> Test default parameters with arguments access

## Input

`````js filename=intro
function testDefaultWithArgs(a = 'default', b = 42, c = true) {
  const argsLen = arguments.length;
  const first = arguments[0];
  const second = arguments[1];
  const third = arguments[2];
  $(argsLen, first, second, third, a, b, c);
}

testDefaultWithArgs();
testDefaultWithArgs('custom');
testDefaultWithArgs('custom', 100);
testDefaultWithArgs('custom', 100, false);
testDefaultWithArgs('custom', 100, false, 'extra');
`````


## Settled


`````js filename=intro
const testDefaultWithArgs /*:(primitive, primitive, primitive)=>undefined*/ = function ($$0, $$1, $$2 /*uses arguments*/) {
  const tmpPrevalAliasArgumentsAny /*:arguments*/ /*truthy*/ = arguments;
  const tmpPrevalAliasArgumentsLen /*:number*/ = arguments.length;
  const tmpParamBare /*:primitive*/ = $$0;
  const tmpParamBare$1 /*:primitive*/ = $$1;
  const tmpParamBare$3 /*:primitive*/ = $$2;
  debugger;
  let a /*:primitive*/ /*ternaryConst*/ = `default`;
  const tmpIfTest /*:boolean*/ = tmpParamBare === undefined;
  if (tmpIfTest) {
  } else {
    a = tmpParamBare;
  }
  let b /*:primitive*/ /*ternaryConst*/ = 42;
  const tmpIfTest$1 /*:boolean*/ = tmpParamBare$1 === undefined;
  if (tmpIfTest$1) {
  } else {
    b = tmpParamBare$1;
  }
  let c /*:primitive*/ /*ternaryConst*/ = true;
  const tmpIfTest$3 /*:boolean*/ = tmpParamBare$3 === undefined;
  if (tmpIfTest$3) {
  } else {
    c = tmpParamBare$3;
  }
  const first /*:unknown*/ = tmpPrevalAliasArgumentsAny[0];
  const second /*:unknown*/ = tmpPrevalAliasArgumentsAny[1];
  const third /*:unknown*/ = tmpPrevalAliasArgumentsAny[2];
  $(tmpPrevalAliasArgumentsLen, first, second, third, a, b, c);
  return undefined;
};
testDefaultWithArgs();
testDefaultWithArgs(`custom`);
testDefaultWithArgs(`custom`, 100);
testDefaultWithArgs(`custom`, 100, false);
testDefaultWithArgs(`custom`, 100, false, `extra`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const testDefaultWithArgs = function (tmpParamBare, tmpParamBare$1, tmpParamBare$3) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  let a = `default`;
  if (!(tmpParamBare === undefined)) {
    a = tmpParamBare;
  }
  let b = 42;
  if (!(tmpParamBare$1 === undefined)) {
    b = tmpParamBare$1;
  }
  let c = true;
  if (!(tmpParamBare$3 === undefined)) {
    c = tmpParamBare$3;
  }
  $(tmpPrevalAliasArgumentsLen, tmpPrevalAliasArgumentsAny[0], tmpPrevalAliasArgumentsAny[1], tmpPrevalAliasArgumentsAny[2], a, b, c);
};
testDefaultWithArgs();
testDefaultWithArgs(`custom`);
testDefaultWithArgs(`custom`, 100);
testDefaultWithArgs(`custom`, 100, false);
testDefaultWithArgs(`custom`, 100, false, `extra`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0,$$1,$$2 ) {
  const b = c;
  const d = c.length;
  const e = $$0;
  const f = $$1;
  const g = $$2;
  debugger;
  let h = "default";
  const i = e === undefined;
  if (i) {

  }
  else {
    h = e;
  }
  let j = 42;
  const k = f === undefined;
  if (k) {

  }
  else {
    j = f;
  }
  let l = true;
  const m = g === undefined;
  if (m) {

  }
  else {
    l = g;
  }
  const n = b[ 0 ];
  const o = b[ 1 ];
  const p = b[ 2 ];
  $( d, n, o, p, h, j, l );
  return undefined;
};
a();
a( "custom" );
a( "custom", 100 );
a( "custom", 100, false );
a( "custom", 100, false, "extra" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let testDefaultWithArgs = function ($$0, $$1, $$2) {
  const tmpPrevalAliasArgumentsAny = arguments;
  const tmpPrevalAliasArgumentsLen = arguments.length;
  const tmpParamBare = $$0;
  const tmpParamBare$1 = $$1;
  const tmpParamBare$3 = $$2;
  debugger;
  let a = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    a = `default`;
  } else {
    a = tmpParamBare;
  }
  let b = undefined;
  const tmpIfTest$1 = tmpParamBare$1 === undefined;
  if (tmpIfTest$1) {
    b = 42;
  } else {
    b = tmpParamBare$1;
  }
  let c = undefined;
  const tmpIfTest$3 = tmpParamBare$3 === undefined;
  if (tmpIfTest$3) {
    c = true;
  } else {
    c = tmpParamBare$3;
  }
  const argsLen = tmpPrevalAliasArgumentsLen;
  const first = tmpPrevalAliasArgumentsAny[0];
  const second = tmpPrevalAliasArgumentsAny[1];
  const third = tmpPrevalAliasArgumentsAny[2];
  $(argsLen, first, second, third, a, b, c);
  return undefined;
};
testDefaultWithArgs();
testDefaultWithArgs(`custom`);
testDefaultWithArgs(`custom`, 100);
testDefaultWithArgs(`custom`, 100, false);
testDefaultWithArgs(`custom`, 100, false, `extra`);
`````


## Todos triggered


- (todo) Can we inline a function that uses arguments, anyways?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 0, undefined, undefined, undefined, 'default', 42, true
 - 2: 1, 'custom', undefined, undefined, 'custom', 42, true
 - 3: 2, 'custom', 100, undefined, 'custom', 100, true
 - 4: 3, 'custom', 100, false, 'custom', 100, false
 - 5: 4, 'custom', 100, false, 'custom', 100, false
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
