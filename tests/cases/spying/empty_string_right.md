# Preval test case

# empty_string_right.md

> Spying > Empty string right
>
> When appending an empty string to a value known to be a string, the operation is essentially a noop and can be dropped.

## Input

`````js filename=intro
function f() {
  const a = '' + $spy(); // Unknown value but known to be a string
  $(a, 'a');
  const b = a + ''; // Redundant. This is what we want to drop.
  $(b, 'b');
}
f();
f();
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const tmpBinBothRhs /*:unknown*/ = $spy();
  const a /*:string*/ = $coerce(tmpBinBothRhs, `plustr`);
  $(a, `a`);
  $(a, `b`);
  return undefined;
};
f();
f();
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  const a = $coerce($spy(), `plustr`);
  $(a, `a`);
  $(a, `b`);
};
f();
f();
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = $spy();
  const c = $coerce( b, "plustr" );
  $( c, "a" );
  $( c, "b" );
  return undefined;
};
a();
a();
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const tmpBinBothLhs = ``;
  const tmpBinBothRhs = $spy();
  const a = tmpBinBothLhs + tmpBinBothRhs;
  $(a, `a`);
  const b = $coerce(a, `plustr`);
  $(b, `b`);
  return undefined;
};
f();
f();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: '12345', 'a'
 - 4: '12345', 'b'
 - 5: 'Creating spy', 2, 0, ['spy', 12345]
 - 6: '$spy[2].valueOf()'
 - 7: '12345', 'a'
 - 8: '12345', 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
