# Preval test case

# empty_string_left.md

> Type tracked > Plus > Empty string left
>
> When appending an empty string to a value known to be a string, the operation is essentially a noop and can be dropped.

## Input

`````js filename=intro
function f() {
  const a = '' + $(1); // Unknown value but known to be a string
  $(a, 'a');
  const b = '' + a; // Redundant. This is what we want to drop.
  $(b, 'b');
}
f();
f();
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const tmpBinBothRhs /*:unknown*/ = $(1);
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
  const a = $coerce($(1), `plustr`);
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
  const b = $( 1 );
  const c = $coerce( b, "plustr" );
  $( c, "a" );
  $( c, "b" );
  return undefined;
};
a();
a();
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: '1', 'a'
 - 3: '1', 'b'
 - 4: 1
 - 5: '1', 'a'
 - 6: '1', 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
