# Preval test case

# with_ident2.md

> Buffer base64 > With ident2
>
> Doing base64 decoding with Buffer
>
> Point here is to see if it will still outline the global assignment when used multiple times

## Input

`````js filename=intro
function f(x) {
  unknown = x; // This was found in the real world case and deterred the trick
  Buffer; // This was the original case
  const tmp = Buffer.from(x, `base64`);
  const tmp2 = tmp.toString(`utf8`);
  return tmp2;
};
$(f); // Do not inline the func
$(f("cGF0aA")); // path
$(f("cGF0aA")); // path
$(f("cGF0aA")); // path
$(f("cGF0aA")); // path
$(f("cGF0aA")); // path
$(f("cGF0aA")); // path
`````


## Settled


`````js filename=intro
const f /*:(unknown)=>unknown*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  unknown = x;
  const tmp /*:buffer*/ = $dotCall($Buffer_from, Buffer, `from`, x, `base64`);
  const tmpCallCompVal$1 /*:unknown*/ = tmp.toString;
  const tmp2 /*:unknown*/ = $dotCall(tmpCallCompVal$1, tmp, `toString`, `utf8`);
  return tmp2;
};
$(f);
unknown = `cGF0aA`;
const tmpBufFrom$9 /*:buffer*/ = $dotCall($Buffer_from, Buffer, `from`, `cGF0aA`, `base64`);
const tmpCallCompVal$2 /*:unknown*/ = tmpBufFrom$9.toString;
$dotCall(tmpCallCompVal$2, tmpBufFrom$9, `toString`, `utf8`);
$(`path`);
unknown = `cGF0aA`;
const tmpBufFrom$7 /*:buffer*/ = $dotCall($Buffer_from, Buffer, `from`, `cGF0aA`, `base64`);
const tmpCallCompVal$6 /*:unknown*/ = tmpBufFrom$7.toString;
$dotCall(tmpCallCompVal$6, tmpBufFrom$7, `toString`, `utf8`);
$(`path`);
unknown = `cGF0aA`;
const tmpBufFrom$5 /*:buffer*/ = $dotCall($Buffer_from, Buffer, `from`, `cGF0aA`, `base64`);
const tmpCallCompVal$10 /*:unknown*/ = tmpBufFrom$5.toString;
$dotCall(tmpCallCompVal$10, tmpBufFrom$5, `toString`, `utf8`);
$(`path`);
unknown = `cGF0aA`;
const tmpBufFrom$3 /*:buffer*/ = $dotCall($Buffer_from, Buffer, `from`, `cGF0aA`, `base64`);
const tmpCallCompVal$14 /*:unknown*/ = tmpBufFrom$3.toString;
$dotCall(tmpCallCompVal$14, tmpBufFrom$3, `toString`, `utf8`);
$(`path`);
unknown = `cGF0aA`;
const tmpBufFrom$1 /*:buffer*/ = $dotCall($Buffer_from, Buffer, `from`, `cGF0aA`, `base64`);
const tmpCallCompVal$18 /*:unknown*/ = tmpBufFrom$1.toString;
$dotCall(tmpCallCompVal$18, tmpBufFrom$1, `toString`, `utf8`);
$(`path`);
unknown = `cGF0aA`;
const tmpBufFrom /*:buffer*/ = $dotCall($Buffer_from, Buffer, `from`, `cGF0aA`, `base64`);
const tmpCallCompVal$22 /*:unknown*/ = tmpBufFrom.toString;
$dotCall(tmpCallCompVal$22, tmpBufFrom, `toString`, `utf8`);
$(`path`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function (x) {
  unknown = x;
  const tmp = $dotCall($Buffer_from, Buffer, `from`, x, `base64`);
  const tmp2 = tmp.toString(`utf8`);
  return tmp2;
});
unknown = `cGF0aA`;
const tmpBufFrom$9 = $dotCall($Buffer_from, Buffer, `from`, `cGF0aA`, `base64`);
tmpBufFrom$9.toString(`utf8`);
$(`path`);
unknown = `cGF0aA`;
const tmpBufFrom$7 = $dotCall($Buffer_from, Buffer, `from`, `cGF0aA`, `base64`);
tmpBufFrom$7.toString(`utf8`);
$(`path`);
unknown = `cGF0aA`;
const tmpBufFrom$5 = $dotCall($Buffer_from, Buffer, `from`, `cGF0aA`, `base64`);
tmpBufFrom$5.toString(`utf8`);
$(`path`);
unknown = `cGF0aA`;
const tmpBufFrom$3 = $dotCall($Buffer_from, Buffer, `from`, `cGF0aA`, `base64`);
tmpBufFrom$3.toString(`utf8`);
$(`path`);
unknown = `cGF0aA`;
const tmpBufFrom$1 = $dotCall($Buffer_from, Buffer, `from`, `cGF0aA`, `base64`);
tmpBufFrom$1.toString(`utf8`);
$(`path`);
unknown = `cGF0aA`;
const tmpBufFrom = $dotCall($Buffer_from, Buffer, `from`, `cGF0aA`, `base64`);
tmpBufFrom.toString(`utf8`);
$(`path`);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  unknown = b;
  const c = $dotCall( $Buffer_from, Buffer, "from", b, "base64" );
  const d = c.toString;
  const e = $dotCall( d, c, "toString", "utf8" );
  return e;
};
$( a );
unknown = "cGF0aA";
const f = $dotCall( $Buffer_from, Buffer, "from", "cGF0aA", "base64" );
const g = f.toString;
$dotCall( g, f, "toString", "utf8" );
$( "path" );
unknown = "cGF0aA";
const h = $dotCall( $Buffer_from, Buffer, "from", "cGF0aA", "base64" );
const i = h.toString;
$dotCall( i, h, "toString", "utf8" );
$( "path" );
unknown = "cGF0aA";
const j = $dotCall( $Buffer_from, Buffer, "from", "cGF0aA", "base64" );
const k = j.toString;
$dotCall( k, j, "toString", "utf8" );
$( "path" );
unknown = "cGF0aA";
const l = $dotCall( $Buffer_from, Buffer, "from", "cGF0aA", "base64" );
const m = l.toString;
$dotCall( m, l, "toString", "utf8" );
$( "path" );
unknown = "cGF0aA";
const n = $dotCall( $Buffer_from, Buffer, "from", "cGF0aA", "base64" );
const o = n.toString;
$dotCall( o, n, "toString", "utf8" );
$( "path" );
unknown = "cGF0aA";
const p = $dotCall( $Buffer_from, Buffer, "from", "cGF0aA", "base64" );
const q = p.toString;
$dotCall( q, p, "toString", "utf8" );
$( "path" );
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $Buffer_from
- (todo) access object property that also exists on prototype? $buffer_toString
- (todo) infertyping on a non-ident? is that a crash or bug? MemberExpression
- (todo) when we are still receiving method calls in typed tracked tricks?
- (todo) Encountered non-ident as callee


## Globals


BAD@! Found 1 implicit global bindings:

unknown


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
