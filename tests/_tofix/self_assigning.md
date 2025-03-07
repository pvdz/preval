# Preval test case

# self_assigning.md

> Tofix > self assigning

Point is that this function is called and immediately overrides itself, then calls itself again.

Especially in global, I think we can do better

## Input

`````js filename=intro
let _0x4a09/*:(unknown, unknown)=>*/ = function(_0x5796ef, _0x26241c) {
  _0x4a09 = function(_0x6bfd63, $$1) {
    const tmpPrevalAliasArgumentsAny = arguments;
    const tmpClusterSSA__0x6bfd63/*:number*/ = _0x6bfd63 - 208;
    const _0x34cc82 = _0x4157[tmpClusterSSA__0x6bfd63];
    if (_0x4a09.NCZorg === undefined) {
      _0x4a09.YBuklE = tmpClusterSSA__0x36fe1d;
      _0x5796ef = tmpPrevalAliasArgumentsAny;
      _0x4a09.NCZorg = true;
    }
    const _0x3ccddd/*:primitive*/ = tmpClusterSSA__0x6bfd63 + _0x4157[0];
    const _0x3ffbb4 = _0x5796ef[_0x3ccddd];
    if (_0x3ffbb4) {
      return _0x3ffbb4;
    } else {
      const tmpClusterSSA__0x34cc82 = _0x4a09.YBuklE(_0x34cc82);
      _0x5796ef[_0x3ccddd] = tmpClusterSSA__0x34cc82;
      return tmpClusterSSA__0x34cc82;
    }
  };
  const tmpReturnArg$3 = _0x4a09(_0x5796ef, _0x26241c);
  return tmpReturnArg$3;
};
$(_0x4a09);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
let _0x4a09 = function (_0x5796ef, _0x26241c) {
  _0x4a09 = function (_0x6bfd63, $$1) {
    const tmpPrevalAliasArgumentsAny$1 = arguments;
    const tmpClusterSSA__0x6bfd63 = _0x6bfd63 - 208;
    const _0x34cc82 = _0x4157[tmpClusterSSA__0x6bfd63];
    if (_0x4a09.NCZorg === undefined) {
      _0x4a09.YBuklE = tmpClusterSSA__0x36fe1d;
      _0x5796ef = tmpPrevalAliasArgumentsAny$1;
      _0x4a09.NCZorg = true;
    }
    const _0x3ccddd = tmpClusterSSA__0x6bfd63 + _0x4157[0];
    const _0x3ffbb4 = _0x5796ef[_0x3ccddd];
    if (_0x3ffbb4) {
      return _0x3ffbb4;
    } else {
      const tmpClusterSSA__0x34cc82 = _0x4a09.YBuklE(_0x34cc82);
      _0x5796ef[_0x3ccddd] = tmpClusterSSA__0x34cc82;
      return tmpClusterSSA__0x34cc82;
    }
  };
  const tmpReturnArg$3 = _0x4a09(_0x5796ef, _0x26241c);
  return tmpReturnArg$3;
};
$(_0x4a09);
`````

## Pre Normal


`````js filename=intro
let _0x4a09 = function ($$0, $$1) {
  let _0x5796ef = $$0;
  let _0x26241c = $$1;
  debugger;
  _0x4a09 = function ($$0, $$1) {
    const tmpPrevalAliasArgumentsAny$1 = arguments;
    let _0x6bfd63 = $$0;
    let $dlr_$$1 = $$1;
    debugger;
    const tmpPrevalAliasArgumentsAny = tmpPrevalAliasArgumentsAny$1;
    const tmpClusterSSA__0x6bfd63 = _0x6bfd63 - 208;
    const _0x34cc82 = _0x4157[tmpClusterSSA__0x6bfd63];
    if (_0x4a09.NCZorg === undefined) {
      _0x4a09.YBuklE = tmpClusterSSA__0x36fe1d;
      _0x5796ef = tmpPrevalAliasArgumentsAny;
      _0x4a09.NCZorg = true;
    }
    const _0x3ccddd = tmpClusterSSA__0x6bfd63 + _0x4157[0];
    const _0x3ffbb4 = _0x5796ef[_0x3ccddd];
    if (_0x3ffbb4) {
      return _0x3ffbb4;
    } else {
      const tmpClusterSSA__0x34cc82 = _0x4a09.YBuklE(_0x34cc82);
      _0x5796ef[_0x3ccddd] = tmpClusterSSA__0x34cc82;
      return tmpClusterSSA__0x34cc82;
    }
  };
  const tmpReturnArg$3 = _0x4a09(_0x5796ef, _0x26241c);
  return tmpReturnArg$3;
};
$(_0x4a09);
`````

## Normalized


`````js filename=intro
let _0x4a09 = function ($$0, $$1) {
  let _0x5796ef = $$0;
  let _0x26241c = $$1;
  debugger;
  _0x4a09 = function ($$0, $$1) {
    const tmpPrevalAliasArgumentsAny$1 = arguments;
    let _0x6bfd63 = $$0;
    let $dlr_$$1 = $$1;
    debugger;
    const tmpPrevalAliasArgumentsAny = tmpPrevalAliasArgumentsAny$1;
    const tmpClusterSSA__0x6bfd63 = _0x6bfd63 - 208;
    const _0x34cc82 = _0x4157[tmpClusterSSA__0x6bfd63];
    const tmpBinLhs = _0x4a09.NCZorg;
    const tmpIfTest = tmpBinLhs === undefined;
    if (tmpIfTest) {
      _0x4a09.YBuklE = tmpClusterSSA__0x36fe1d;
      _0x5796ef = tmpPrevalAliasArgumentsAny;
      _0x4a09.NCZorg = true;
    } else {
    }
    const tmpBinBothLhs = tmpClusterSSA__0x6bfd63;
    const tmpBinBothRhs = _0x4157[0];
    const _0x3ccddd = tmpBinBothLhs + tmpBinBothRhs;
    const _0x3ffbb4 = _0x5796ef[_0x3ccddd];
    if (_0x3ffbb4) {
      return _0x3ffbb4;
    } else {
      const tmpClusterSSA__0x34cc82 = _0x4a09.YBuklE(_0x34cc82);
      _0x5796ef[_0x3ccddd] = tmpClusterSSA__0x34cc82;
      return tmpClusterSSA__0x34cc82;
    }
  };
  const tmpReturnArg$3 = _0x4a09(_0x5796ef, _0x26241c);
  return tmpReturnArg$3;
};
$(_0x4a09);
`````

## Settled


`````js filename=intro
let _0x4a09 /*:(unknown, unknown)=>unknown*/ = function ($$0, $$1) {
  let _0x5796ef /*:unknown*/ = $$0;
  const _0x26241c /*:unknown*/ = $$1;
  debugger;
  _0x4a09 = function ($$0, $$1) {
    const tmpPrevalAliasArgumentsAny$1 /*:arguments*/ = arguments;
    const _0x6bfd63 /*:unknown*/ = $$0;
    debugger;
    const tmpClusterSSA__0x6bfd63 /*:number*/ = _0x6bfd63 - 208;
    const _0x34cc82 /*:unknown*/ = _0x4157[tmpClusterSSA__0x6bfd63];
    const tmpBinLhs /*:unknown*/ = _0x4a09.NCZorg;
    const tmpIfTest /*:boolean*/ = tmpBinLhs === undefined;
    if (tmpIfTest) {
      _0x4a09.YBuklE = tmpClusterSSA__0x36fe1d;
      _0x5796ef = tmpPrevalAliasArgumentsAny$1;
      _0x4a09.NCZorg = true;
    } else {
    }
    const tmpBinBothRhs /*:unknown*/ = _0x4157[0];
    const _0x3ccddd /*:primitive*/ = tmpClusterSSA__0x6bfd63 + tmpBinBothRhs;
    const _0x3ffbb4 /*:unknown*/ = _0x5796ef[_0x3ccddd];
    if (_0x3ffbb4) {
      return _0x3ffbb4;
    } else {
      const tmpClusterSSA__0x34cc82 /*:unknown*/ = _0x4a09.YBuklE(_0x34cc82);
      _0x5796ef[_0x3ccddd] = tmpClusterSSA__0x34cc82;
      return tmpClusterSSA__0x34cc82;
    }
  };
  const tmpReturnArg$3 /*:unknown*/ = _0x4a09(_0x5796ef, _0x26241c);
  return tmpReturnArg$3;
};
$(_0x4a09);
`````

## PST Settled
With rename=true

`````js filename=intro
let a = function($$0,$$1 ) {
  let b = $$0;
  const c = $$1;
  debugger;
  a = function($$0,$$1 ) {
    const d = e;
    const f = $$0;
    debugger;
    const g = f - 208;
    const h = _0x4157[ g ];
    const i = a.NCZorg;
    const j = i === undefined;
    if (j) {
      a.YBuklE = tmpClusterSSA__0x36fe1d;
      b = d;
      a.NCZorg = true;
    }
    const k = _0x4157[ 0 ];
    const l = g + k;
    const m = b[ l ];
    if (m) {
      return m;
    }
    else {
      const n = a.YBuklE( h );
      b[l] = n;
      return n;
    }
  };
  const o = a( b, c );
  return o;
};
$( a );
`````

## Globals

BAD@! Found 2 implicit global bindings:

_0x4157, tmpClusterSSA__0x36fe1d

## Result

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
