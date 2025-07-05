# Preval test case

# with_global_assign.md

> Buffer base64 > With global assign
>
> Doing base64 decoding with Buffer

## Input

`````js filename=intro
let unknown = $(1);
function f(x) {
  unknown = x; // This was found in the real world case and deterred the trick
  Buffer; // This was the original case
  const tmp = Buffer.from(x, `base64`);
  const tmp2 = tmp.toString(`utf8`);
  return tmp2;
};
$(f); // Do not inline the func
$(f("cGF0aA")); // path
$(unknown);
`````


## Settled


`````js filename=intro
const f /*:(unknown)=>string*/ = function ($$0) {
  const x /*:unknown*/ = $$0;
  debugger;
  unknown = x;
  const tmp /*:buffer*/ /*truthy*/ = $Buffer_from(x, `base64`);
  const tmp2 /*:string*/ = $dotCall($buffer_toString, tmp, `toString`, `utf8`);
  return tmp2;
};
let unknown /*:unknown*/ = $(1);
$(f);
unknown = `cGF0aA`;
$(`path`);
$(unknown);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function (x) {
  unknown = x;
  const tmp2 = $dotCall($buffer_toString, $Buffer_from(x, `base64`), `toString`, `utf8`);
  return tmp2;
};
let unknown = $(1);
$(f);
unknown = `cGF0aA`;
$(`path`);
$(unknown);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function($$0 ) {
  const b = $$0;
  debugger;
  c = b;
  const d = $Buffer_from( b, "base64" );
  const e = $dotCall( $buffer_toString, d, "toString", "utf8" );
  return e;
};
let c = $( 1 );
$( a );
c = "cGF0aA";
$( "path" );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  unknown = x;
  const tmpMCF = $Buffer_from;
  const tmp = $Buffer_from(x, `base64`);
  const tmpMCF$1 = tmp.toString;
  const tmp2 = $dotCall(tmpMCF$1, tmp, `toString`, `utf8`);
  return tmp2;
};
let unknown = $(1);
$(f);
let tmpCalleeParam = f(`cGF0aA`);
$(tmpCalleeParam);
$(unknown);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $buffer_toString
- (todo) support ExpressionStatement as statement in let_hoisting noob check
- (todo) type trackeed tricks can possibly support static $Buffer_from


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: '<function>'
 - 3: 'path'
 - 4: 'cGF0aA'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
