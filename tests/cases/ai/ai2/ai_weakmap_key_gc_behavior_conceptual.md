# Preval test case

# ai_weakmap_key_gc_behavior_conceptual.md

> Ai > Ai2 > Ai weakmap key gc behavior conceptual
>
> Test: Conceptual: WeakMap key garbage collection leads to value removal.

## Input

`````js filename=intro
// Expected: If a key is GC'd, its entry is removed (Preval cannot model GC).
// This test can only show Preval preserves WeakMap operations around opaque keys.
let wmap = new WeakMap();
let key = $('wm_gc_key', { name: 'potentially_gc_able' });
wmap.set(key, $('wm_gc_val'));

$('wm_gc_has_key_before_gc_concept', wmap.has(key));
// Concept: if 'key' were GC'd here (e.g., key = null; ...GC_Cycle...)
// Then wmap.has(original_key_reference_if_it_could_be_recreated) would be false.
// Preval will likely just keep key as an opaque reference.
key = null; // Drop reference
$('wm_gc_key_nulled');
// Cannot force GC or directly test the weak link in Preval's env.
// Test that operations on wmap with other opaque keys still work.
wmap.set($('other_key', {}), $('other_val'));
$('wm_other_key_present', wmap.has($('other_key')));
`````


## Settled


`````js filename=intro
const wmap /*:object*/ /*truthy*/ = new WeakMap();
const tmpCalleeParam /*:object*/ /*truthy*/ = { name: `potentially_gc_able` };
const key /*:unknown*/ = $(`wm_gc_key`, tmpCalleeParam);
const tmpMCF /*:unknown*/ = wmap.set;
const tmpMCP /*:unknown*/ = $(`wm_gc_val`);
$dotCall(tmpMCF, wmap, `set`, key, tmpMCP);
const tmpMCF$1 /*:unknown*/ = wmap.has;
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpMCF$1, wmap, `has`, key);
$(`wm_gc_has_key_before_gc_concept`, tmpCalleeParam$1);
$(`wm_gc_key_nulled`);
const tmpMCF$3 /*:unknown*/ = wmap.set;
const tmpCalleeParam$3 /*:object*/ /*truthy*/ = {};
const tmpMCP$1 /*:unknown*/ = $(`other_key`, tmpCalleeParam$3);
const tmpMCP$3 /*:unknown*/ = $(`other_val`);
$dotCall(tmpMCF$3, wmap, `set`, tmpMCP$1, tmpMCP$3);
const tmpMCF$5 /*:unknown*/ = wmap.has;
const tmpMCP$5 /*:unknown*/ = $(`other_key`);
const tmpCalleeParam$5 /*:unknown*/ = $dotCall(tmpMCF$5, wmap, `has`, tmpMCP$5);
$(`wm_other_key_present`, tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const wmap = new WeakMap();
const key = $(`wm_gc_key`, { name: `potentially_gc_able` });
wmap.set(key, $(`wm_gc_val`));
$(`wm_gc_has_key_before_gc_concept`, wmap.has(key));
$(`wm_gc_key_nulled`);
wmap.set($(`other_key`, {}), $(`other_val`));
const tmpMCF$5 = wmap.has;
$(`wm_other_key_present`, $dotCall(tmpMCF$5, wmap, `has`, $(`other_key`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new WeakMap();
const b = { name: "potentially_gc_able" };
const c = $( "wm_gc_key", b );
const d = a.set;
const e = $( "wm_gc_val" );
$dotCall( d, a, "set", c, e );
const f = a.has;
const g = $dotCall( f, a, "has", c );
$( "wm_gc_has_key_before_gc_concept", g );
$( "wm_gc_key_nulled" );
const h = a.set;
const i = {};
const j = $( "other_key", i );
const k = $( "other_val" );
$dotCall( h, a, "set", j, k );
const l = a.has;
const m = $( "other_key" );
const n = $dotCall( l, a, "has", m );
$( "wm_other_key_present", n );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let wmap = new WeakMap();
let tmpCalleeParam = { name: `potentially_gc_able` };
let key = $(`wm_gc_key`, tmpCalleeParam);
const tmpMCF = wmap.set;
const tmpMCP = $(`wm_gc_val`);
$dotCall(tmpMCF, wmap, `set`, key, tmpMCP);
const tmpMCF$1 = wmap.has;
let tmpCalleeParam$1 = $dotCall(tmpMCF$1, wmap, `has`, key);
$(`wm_gc_has_key_before_gc_concept`, tmpCalleeParam$1);
key = null;
$(`wm_gc_key_nulled`);
const tmpMCF$3 = wmap.set;
let tmpCalleeParam$3 = {};
const tmpMCP$1 = $(`other_key`, tmpCalleeParam$3);
const tmpMCP$3 = $(`other_val`);
$dotCall(tmpMCF$3, wmap, `set`, tmpMCP$1, tmpMCP$3);
const tmpMCF$5 = wmap.has;
const tmpMCP$5 = $(`other_key`);
let tmpCalleeParam$5 = $dotCall(tmpMCF$5, wmap, `has`, tmpMCP$5);
$(`wm_other_key_present`, tmpCalleeParam$5);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

WeakMap


## Runtime Outcome


Should call `$` with:
 - 1: 'wm_gc_key', { name: '"potentially_gc_able"' }
 - 2: 'wm_gc_val'
 - eval returned: ('<crash[ Invalid value used as weak map key ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
