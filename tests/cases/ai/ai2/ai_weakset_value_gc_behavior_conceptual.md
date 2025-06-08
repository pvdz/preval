# Preval test case

# ai_weakset_value_gc_behavior_conceptual.md

> Ai > Ai2 > Ai weakset value gc behavior conceptual
>
> Test: Conceptual: WeakSet value garbage collection leads to its removal.

## Input

`````js filename=intro
// Expected: If a value is GC'd, its entry is removed (Preval cannot model GC).
// This test can only show Preval preserves WeakSet operations around opaque values.
let wset = new WeakSet();
let val = $('ws_gc_val', { type: 'ephemeral' });
wset.add(val);

$('ws_gc_has_val_before_gc_concept', wset.has(val));
// Concept: if 'val' were GC'd here (e.g., val = null; ...GC_Cycle...)
// Then wset.has(original_val_reference_if_it_could_be_recreated) would be false.
val = null; // Drop reference
$('ws_gc_val_nulled');
// Cannot force GC or directly test the weak link in Preval's env.
// Test that operations on wset with other opaque values still work.
wset.add($('other_val_ws', []));
$('ws_other_val_present', wset.has($('other_val_ws')));
`````


## Settled


`````js filename=intro
const wset /*:object*/ /*truthy*/ = new WeakSet();
const tmpCalleeParam /*:object*/ /*truthy*/ = { type: `ephemeral` };
const val /*:unknown*/ = $(`ws_gc_val`, tmpCalleeParam);
const tmpMCF /*:unknown*/ = wset.add;
$dotCall(tmpMCF, wset, `add`, val);
const tmpMCF$1 /*:unknown*/ = wset.has;
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpMCF$1, wset, `has`, val);
$(`ws_gc_has_val_before_gc_concept`, tmpCalleeParam$1);
$(`ws_gc_val_nulled`);
const tmpMCF$3 /*:unknown*/ = wset.add;
const tmpCalleeParam$3 /*:array*/ /*truthy*/ = [];
const tmpMCP /*:unknown*/ = $(`other_val_ws`, tmpCalleeParam$3);
$dotCall(tmpMCF$3, wset, `add`, tmpMCP);
const tmpMCF$5 /*:unknown*/ = wset.has;
const tmpMCP$1 /*:unknown*/ = $(`other_val_ws`);
const tmpCalleeParam$5 /*:unknown*/ = $dotCall(tmpMCF$5, wset, `has`, tmpMCP$1);
$(`ws_other_val_present`, tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const wset = new WeakSet();
const val = $(`ws_gc_val`, { type: `ephemeral` });
wset.add(val);
$(`ws_gc_has_val_before_gc_concept`, wset.has(val));
$(`ws_gc_val_nulled`);
wset.add($(`other_val_ws`, []));
const tmpMCF$5 = wset.has;
$(`ws_other_val_present`, $dotCall(tmpMCF$5, wset, `has`, $(`other_val_ws`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new WeakSet();
const b = { type: "ephemeral" };
const c = $( "ws_gc_val", b );
const d = a.add;
$dotCall( d, a, "add", c );
const e = a.has;
const f = $dotCall( e, a, "has", c );
$( "ws_gc_has_val_before_gc_concept", f );
$( "ws_gc_val_nulled" );
const g = a.add;
const h = [];
const i = $( "other_val_ws", h );
$dotCall( g, a, "add", i );
const j = a.has;
const k = $( "other_val_ws" );
const l = $dotCall( j, a, "has", k );
$( "ws_other_val_present", l );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let wset = new WeakSet();
let tmpCalleeParam = { type: `ephemeral` };
let val = $(`ws_gc_val`, tmpCalleeParam);
const tmpMCF = wset.add;
$dotCall(tmpMCF, wset, `add`, val);
const tmpMCF$1 = wset.has;
let tmpCalleeParam$1 = $dotCall(tmpMCF$1, wset, `has`, val);
$(`ws_gc_has_val_before_gc_concept`, tmpCalleeParam$1);
val = null;
$(`ws_gc_val_nulled`);
const tmpMCF$3 = wset.add;
let tmpCalleeParam$3 = [];
const tmpMCP = $(`other_val_ws`, tmpCalleeParam$3);
$dotCall(tmpMCF$3, wset, `add`, tmpMCP);
const tmpMCF$5 = wset.has;
const tmpMCP$1 = $(`other_val_ws`);
let tmpCalleeParam$5 = $dotCall(tmpMCF$5, wset, `has`, tmpMCP$1);
$(`ws_other_val_present`, tmpCalleeParam$5);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


BAD@! Found 1 implicit global bindings:

WeakSet


## Runtime Outcome


Should call `$` with:
 - 1: 'ws_gc_val', { type: '"ephemeral"' }
 - eval returned: ('<crash[ Invalid value used in weak set ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
