# Preval test case

# ai_symbol_static_methods_opaque.md

> Ai > Ai2 > Ai symbol static methods opaque
>
> Test: Symbol.for() and Symbol.keyFor() with opaque arguments.

## Input

`````js filename=intro
// Expected: Calls preserved.
let key_for_symbol = $('sym_for_key', 'mySymbolKey');
let sym1 = Symbol.for(key_for_symbol);
$('sym_is_sym1', typeof sym1 === 'symbol');

let key_from_sym1 = Symbol.keyFor(sym1);
$('sym_key_is_original', key_from_sym1);

let opaque_key = $('sym_opaque_key');
let sym_from_opaque = Symbol.for(opaque_key);
$('sym_key_from_opaque', Symbol.keyFor(sym_from_opaque));

let opaque_symbol_arg = $('sym_opaque_symbol_arg');
$('sym_keyfor_opaque_symbol', Symbol.keyFor(opaque_symbol_arg));

let non_global_sym = Symbol('sym_desc_local');
$('sym_keyfor_local_symbol', Symbol.keyFor(non_global_sym)); // Should be undefined
`````


## Settled


`````js filename=intro
const key_for_symbol /*:unknown*/ = $(`sym_for_key`, `mySymbolKey`);
const tmpMCF /*:unknown*/ = Symbol.for;
const sym1 /*:unknown*/ = $dotCall(tmpMCF, Symbol, `for`, key_for_symbol);
const tmpBinLhs /*:string*/ /*truthy*/ = typeof sym1;
const tmpCalleeParam /*:boolean*/ = tmpBinLhs === `symbol`;
$(`sym_is_sym1`, tmpCalleeParam);
const tmpMCF$1 /*:unknown*/ = Symbol.keyFor;
const key_from_sym1 /*:unknown*/ = $dotCall(tmpMCF$1, Symbol, `keyFor`, sym1);
$(`sym_key_is_original`, key_from_sym1);
const opaque_key /*:unknown*/ = $(`sym_opaque_key`);
const tmpMCF$3 /*:unknown*/ = Symbol.for;
const sym_from_opaque /*:unknown*/ = $dotCall(tmpMCF$3, Symbol, `for`, opaque_key);
const tmpMCF$5 /*:unknown*/ = Symbol.keyFor;
const tmpCalleeParam$1 /*:unknown*/ = $dotCall(tmpMCF$5, Symbol, `keyFor`, sym_from_opaque);
$(`sym_key_from_opaque`, tmpCalleeParam$1);
const opaque_symbol_arg /*:unknown*/ = $(`sym_opaque_symbol_arg`);
const tmpMCF$7 /*:unknown*/ = Symbol.keyFor;
const tmpCalleeParam$3 /*:unknown*/ = $dotCall(tmpMCF$7, Symbol, `keyFor`, opaque_symbol_arg);
$(`sym_keyfor_opaque_symbol`, tmpCalleeParam$3);
const tmpMCF$9 /*:unknown*/ = Symbol.keyFor;
const non_global_sym /*:unknown*/ = Symbol(`sym_desc_local`);
const tmpCalleeParam$5 /*:unknown*/ = $dotCall(tmpMCF$9, Symbol, `keyFor`, non_global_sym);
$(`sym_keyfor_local_symbol`, tmpCalleeParam$5);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const sym1 = Symbol.for($(`sym_for_key`, `mySymbolKey`));
$(`sym_is_sym1`, typeof sym1 === `symbol`);
$(`sym_key_is_original`, Symbol.keyFor(sym1));
const sym_from_opaque = Symbol.for($(`sym_opaque_key`));
$(`sym_key_from_opaque`, Symbol.keyFor(sym_from_opaque));
const opaque_symbol_arg = $(`sym_opaque_symbol_arg`);
$(`sym_keyfor_opaque_symbol`, Symbol.keyFor(opaque_symbol_arg));
const tmpMCF$9 = Symbol.keyFor;
$(`sym_keyfor_local_symbol`, $dotCall(tmpMCF$9, Symbol, `keyFor`, Symbol(`sym_desc_local`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "sym_for_key", "mySymbolKey" );
const b = Symbol.for;
const c = $dotCall( b, Symbol, "for", a );
const d = typeof c;
const e = d === "symbol";
$( "sym_is_sym1", e );
const f = Symbol.keyFor;
const g = $dotCall( f, Symbol, "keyFor", c );
$( "sym_key_is_original", g );
const h = $( "sym_opaque_key" );
const i = Symbol.for;
const j = $dotCall( i, Symbol, "for", h );
const k = Symbol.keyFor;
const l = $dotCall( k, Symbol, "keyFor", j );
$( "sym_key_from_opaque", l );
const m = $( "sym_opaque_symbol_arg" );
const n = Symbol.keyFor;
const o = $dotCall( n, Symbol, "keyFor", m );
$( "sym_keyfor_opaque_symbol", o );
const p = Symbol.keyFor;
const q = Symbol( "sym_desc_local" );
const r = $dotCall( p, Symbol, "keyFor", q );
$( "sym_keyfor_local_symbol", r );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let key_for_symbol = $(`sym_for_key`, `mySymbolKey`);
const tmpMCF = Symbol.for;
let sym1 = $dotCall(tmpMCF, Symbol, `for`, key_for_symbol);
const tmpBinLhs = typeof sym1;
let tmpCalleeParam = tmpBinLhs === `symbol`;
$(`sym_is_sym1`, tmpCalleeParam);
const tmpMCF$1 = Symbol.keyFor;
let key_from_sym1 = $dotCall(tmpMCF$1, Symbol, `keyFor`, sym1);
$(`sym_key_is_original`, key_from_sym1);
let opaque_key = $(`sym_opaque_key`);
const tmpMCF$3 = Symbol.for;
let sym_from_opaque = $dotCall(tmpMCF$3, Symbol, `for`, opaque_key);
const tmpMCF$5 = Symbol.keyFor;
let tmpCalleeParam$1 = $dotCall(tmpMCF$5, Symbol, `keyFor`, sym_from_opaque);
$(`sym_key_from_opaque`, tmpCalleeParam$1);
let opaque_symbol_arg = $(`sym_opaque_symbol_arg`);
const tmpMCF$7 = Symbol.keyFor;
let tmpCalleeParam$3 = $dotCall(tmpMCF$7, Symbol, `keyFor`, opaque_symbol_arg);
$(`sym_keyfor_opaque_symbol`, tmpCalleeParam$3);
let non_global_sym = Symbol(`sym_desc_local`);
const tmpMCF$9 = Symbol.keyFor;
let tmpCalleeParam$5 = $dotCall(tmpMCF$9, Symbol, `keyFor`, non_global_sym);
$(`sym_keyfor_local_symbol`, tmpCalleeParam$5);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

Symbol


## Runtime Outcome


Should call `$` with:
 - 1: 'sym_for_key', 'mySymbolKey'
 - 2: 'sym_is_sym1', true
 - 3: 'sym_key_is_original', 'sym_for_key'
 - 4: 'sym_opaque_key'
 - 5: 'sym_key_from_opaque', 'sym_opaque_key'
 - 6: 'sym_opaque_symbol_arg'
 - eval returned: ('<crash[ sym_opaque_symbol_arg is not a symbol ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
