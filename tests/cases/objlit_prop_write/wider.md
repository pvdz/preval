# Preval test case

# wider.md

> Objlit prop write > Wider
>
> This is about as minimal as I can get with the test case.
> At the time of writing there was a problem iwth the property not getting inlined.

## Options

- unroll=0
- globals: unknown

## Input

`````js filename=intro
const val = $(1);
const distract = function () {
  debugger;
  while ($LOOP_NO_UNROLLS_LEFT) {
    $(tmpSSA_zC9nb, another_glob);
  }
  return undefined;
};

// Meat of the test case:
const tmpSSA_zC9nb = { b: true };
const another_glob = [1, 2, 3];
tmpSSA_zC9nb.inline_me = val;

// Rest is required to trigger the repro, but it's about the above
distract();
const tmpAssignMemRhs /*:unknown*/ = unknown.property;
tmpSSA_zC9nb.ch = tmpAssignMemRhs;
distract();
$(tmpSSA_zC9nb);
`````


## Settled


`````js filename=intro
const val /*:unknown*/ = $(1);
const distract /*:()=>undefined*/ = function () {
  debugger;
  while ($LOOP_NO_UNROLLS_LEFT) {
    $(tmpSSA_zC9nb, another_glob);
  }
  return undefined;
};
const tmpSSA_zC9nb /*:object*/ /*truthy*/ = { b: true, inline_me: val };
const another_glob /*:array*/ /*truthy*/ = [1, 2, 3];
distract();
const tmpAssignMemRhs /*:unknown*/ = unknown.property;
tmpSSA_zC9nb.ch = tmpAssignMemRhs;
distract();
$(tmpSSA_zC9nb);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const val = $(1);
const distract = function () {
  while (true) {
    $(tmpSSA_zC9nb, another_glob);
  }
};
const tmpSSA_zC9nb = { b: true, inline_me: val };
const another_glob = [1, 2, 3];
distract();
tmpSSA_zC9nb.ch = unknown.property;
distract();
$(tmpSSA_zC9nb);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( 1 );
const b = function() {
  debugger;
  while ($LOOP_NO_UNROLLS_LEFT) {
    $( c, d );
  }
  return undefined;
};
const c = {
  b: true,
  inline_me: a,
};
const d = [ 1, 2, 3 ];
b();
const e = unknown.property;
c.ch = e;
b();
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const val = $(1);
const distract = function () {
  debugger;
  while ($LOOP_NO_UNROLLS_LEFT) {
    $(tmpSSA_zC9nb, another_glob);
  }
  return undefined;
};
const tmpSSA_zC9nb = { b: true };
const another_glob = [1, 2, 3];
tmpSSA_zC9nb.inline_me = val;
distract();
const tmpAssignMemRhs = unknown.property;
tmpSSA_zC9nb.ch = tmpAssignMemRhs;
distract();
$(tmpSSA_zC9nb);
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) support array reads statement type ExpressionStatement


## Globals


None (except for the 1 globals expected by the test)


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 3: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 4: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 5: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 6: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 7: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 8: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 9: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 10: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 11: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 12: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 13: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 14: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 15: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 16: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 17: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 18: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 19: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 20: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 21: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 22: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 23: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 24: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 25: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - 26: { b: 'true', inline_me: '1' }, [1, 2, 3]
 - eval returned: ('<crash[ Loop aborted by Preval test runner (this simply curbs infinite loops in tests) ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
