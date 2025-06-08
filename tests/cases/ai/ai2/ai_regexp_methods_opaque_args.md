# Preval test case

# ai_regexp_methods_opaque_args.md

> Ai > Ai2 > Ai regexp methods opaque args
>
> Test: RegExp methods (test, exec) with opaque arguments / lastIndex.

## Input

`````js filename=intro
// Expected: Calls preserved. Behavior depends on opaque inputs.
let re_literal = /\w+/g;
let re_opaque_source = $('re_source', 'a.b');
let re_opaque_flags = $('re_flags', 'gi');
let re_from_opaque = new RegExp(re_opaque_source, re_opaque_flags);

let str_to_test = $('re_str', 'hello world');

$('re_literal_test', re_literal.test(str_to_test));
$('re_literal_exec_1', re_literal.exec(str_to_test)[0]);
$('re_literal_lastIndex_1', re_literal.lastIndex);
$('re_literal_exec_2', re_literal.exec(str_to_test)[0]);
$('re_literal_lastIndex_2', re_literal.lastIndex);
re_literal.lastIndex = $('re_set_lastIndex', 0);

$('re_from_opaque_test', re_from_opaque.test(str_to_test));
let exec_res_opaque = re_from_opaque.exec($('re_exec_str_opaque', 'a_b c_d'));
$('re_from_opaque_exec_0', exec_res_opaque ? exec_res_opaque[0] : null);
$('re_from_opaque_lastIndex', re_from_opaque.lastIndex);

// String methods using RegExp
$('string_match_re_literal', str_to_test.match(re_literal));
$('string_search_re_from_opaque', str_to_test.search(re_from_opaque));
`````


## Settled


`````js filename=intro
const re_literal /*:regex*/ /*truthy*/ = new $regex_constructor(`\\w+`, `g`);
const re_opaque_source /*:unknown*/ = $(`re_source`, `a.b`);
const re_opaque_flags /*:unknown*/ = $(`re_flags`, `gi`);
const re_from_opaque /*:regex*/ /*truthy*/ = new $regex_constructor(re_opaque_source, re_opaque_flags);
const str_to_test /*:unknown*/ = $(`re_str`, `hello world`);
const tmpCalleeParam /*:unknown*/ /*truthy*/ = $dotCall($regex_test, re_literal, `test`, str_to_test);
$(`re_literal_test`, tmpCalleeParam);
const tmpCompObj /*:unknown*/ /*truthy*/ = $dotCall($regex_exec, re_literal, `exec`, str_to_test);
const tmpCalleeParam$1 /*:unknown*/ = tmpCompObj[0];
$(`re_literal_exec_1`, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:unknown*/ = re_literal.lastIndex;
$(`re_literal_lastIndex_1`, tmpCalleeParam$3);
const tmpCompObj$1 /*:unknown*/ /*truthy*/ = $dotCall($regex_exec, re_literal, `exec`, str_to_test);
const tmpCalleeParam$5 /*:unknown*/ = tmpCompObj$1[0];
$(`re_literal_exec_2`, tmpCalleeParam$5);
const tmpCalleeParam$7 /*:unknown*/ = re_literal.lastIndex;
$(`re_literal_lastIndex_2`, tmpCalleeParam$7);
const tmpAssignMemRhs /*:unknown*/ = $(`re_set_lastIndex`, 0);
re_literal.lastIndex = tmpAssignMemRhs;
const tmpCalleeParam$9 /*:unknown*/ /*truthy*/ = $dotCall($regex_test, re_from_opaque, `test`, str_to_test);
$(`re_from_opaque_test`, tmpCalleeParam$9);
const tmpMCP /*:unknown*/ = $(`re_exec_str_opaque`, `a_b c_d`);
const exec_res_opaque /*:unknown*/ /*truthy*/ = $dotCall($regex_exec, re_from_opaque, `exec`, tmpMCP);
const tmpClusterSSA_tmpCalleeParam$11 /*:unknown*/ = exec_res_opaque[0];
$(`re_from_opaque_exec_0`, tmpClusterSSA_tmpCalleeParam$11);
const tmpCalleeParam$13 /*:unknown*/ = re_from_opaque.lastIndex;
$(`re_from_opaque_lastIndex`, tmpCalleeParam$13);
const tmpMCF$9 /*:unknown*/ = str_to_test.match;
const tmpCalleeParam$15 /*:unknown*/ = $dotCall(tmpMCF$9, str_to_test, `match`, re_literal);
$(`string_match_re_literal`, tmpCalleeParam$15);
const tmpMCF$11 /*:unknown*/ = str_to_test.search;
const tmpCalleeParam$17 /*:unknown*/ = $dotCall(tmpMCF$11, str_to_test, `search`, re_from_opaque);
$(`string_search_re_from_opaque`, tmpCalleeParam$17);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const re_literal = new $regex_constructor(`\\w+`, `g`);
const re_opaque_source = $(`re_source`, `a.b`);
const re_opaque_flags = $(`re_flags`, `gi`);
const re_from_opaque = new $regex_constructor(re_opaque_source, re_opaque_flags);
const str_to_test = $(`re_str`, `hello world`);
$(`re_literal_test`, $dotCall($regex_test, re_literal, `test`, str_to_test));
$(`re_literal_exec_1`, $dotCall($regex_exec, re_literal, `exec`, str_to_test)[0]);
$(`re_literal_lastIndex_1`, re_literal.lastIndex);
$(`re_literal_exec_2`, $dotCall($regex_exec, re_literal, `exec`, str_to_test)[0]);
$(`re_literal_lastIndex_2`, re_literal.lastIndex);
re_literal.lastIndex = $(`re_set_lastIndex`, 0);
$(`re_from_opaque_test`, $dotCall($regex_test, re_from_opaque, `test`, str_to_test));
$(`re_from_opaque_exec_0`, $dotCall($regex_exec, re_from_opaque, `exec`, $(`re_exec_str_opaque`, `a_b c_d`))[0]);
$(`re_from_opaque_lastIndex`, re_from_opaque.lastIndex);
$(`string_match_re_literal`, str_to_test.match(re_literal));
$(`string_search_re_from_opaque`, str_to_test.search(re_from_opaque));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = new $regex_constructor( "\\w+", "g" );
const b = $( "re_source", "a.b" );
const c = $( "re_flags", "gi" );
const d = new $regex_constructor( b, c );
const e = $( "re_str", "hello world" );
const f = $dotCall( $regex_test, a, "test", e );
$( "re_literal_test", f );
const g = $dotCall( $regex_exec, a, "exec", e );
const h = g[ 0 ];
$( "re_literal_exec_1", h );
const i = a.lastIndex;
$( "re_literal_lastIndex_1", i );
const j = $dotCall( $regex_exec, a, "exec", e );
const k = j[ 0 ];
$( "re_literal_exec_2", k );
const l = a.lastIndex;
$( "re_literal_lastIndex_2", l );
const m = $( "re_set_lastIndex", 0 );
a.lastIndex = m;
const n = $dotCall( $regex_test, d, "test", e );
$( "re_from_opaque_test", n );
const o = $( "re_exec_str_opaque", "a_b c_d" );
const p = $dotCall( $regex_exec, d, "exec", o );
const q = p[ 0 ];
$( "re_from_opaque_exec_0", q );
const r = d.lastIndex;
$( "re_from_opaque_lastIndex", r );
const s = e.match;
const t = $dotCall( s, e, "match", a );
$( "string_match_re_literal", t );
const u = e.search;
const v = $dotCall( u, e, "search", d );
$( "string_search_re_from_opaque", v );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let re_literal = new $regex_constructor(`\\w+`, `g`);
let re_opaque_source = $(`re_source`, `a.b`);
let re_opaque_flags = $(`re_flags`, `gi`);
let re_from_opaque = new $regex_constructor(re_opaque_source, re_opaque_flags);
let str_to_test = $(`re_str`, `hello world`);
const tmpMCF = re_literal.test;
let tmpCalleeParam = $dotCall(tmpMCF, re_literal, `test`, str_to_test);
$(`re_literal_test`, tmpCalleeParam);
const tmpMCF$1 = re_literal.exec;
const tmpCompObj = $dotCall(tmpMCF$1, re_literal, `exec`, str_to_test);
let tmpCalleeParam$1 = tmpCompObj[0];
$(`re_literal_exec_1`, tmpCalleeParam$1);
let tmpCalleeParam$3 = re_literal.lastIndex;
$(`re_literal_lastIndex_1`, tmpCalleeParam$3);
const tmpMCF$3 = re_literal.exec;
const tmpCompObj$1 = $dotCall(tmpMCF$3, re_literal, `exec`, str_to_test);
let tmpCalleeParam$5 = tmpCompObj$1[0];
$(`re_literal_exec_2`, tmpCalleeParam$5);
let tmpCalleeParam$7 = re_literal.lastIndex;
$(`re_literal_lastIndex_2`, tmpCalleeParam$7);
const tmpAssignMemLhsObj = re_literal;
const tmpAssignMemRhs = $(`re_set_lastIndex`, 0);
tmpAssignMemLhsObj.lastIndex = tmpAssignMemRhs;
const tmpMCF$5 = re_from_opaque.test;
let tmpCalleeParam$9 = $dotCall(tmpMCF$5, re_from_opaque, `test`, str_to_test);
$(`re_from_opaque_test`, tmpCalleeParam$9);
const tmpMCF$7 = re_from_opaque.exec;
const tmpMCP = $(`re_exec_str_opaque`, `a_b c_d`);
let exec_res_opaque = $dotCall(tmpMCF$7, re_from_opaque, `exec`, tmpMCP);
let tmpCalleeParam$11 = undefined;
if (exec_res_opaque) {
  tmpCalleeParam$11 = exec_res_opaque[0];
  $(`re_from_opaque_exec_0`, tmpCalleeParam$11);
} else {
  tmpCalleeParam$11 = null;
  $(`re_from_opaque_exec_0`, tmpCalleeParam$11);
}
let tmpCalleeParam$13 = re_from_opaque.lastIndex;
$(`re_from_opaque_lastIndex`, tmpCalleeParam$13);
const tmpMCF$9 = str_to_test.match;
let tmpCalleeParam$15 = $dotCall(tmpMCF$9, str_to_test, `match`, re_literal);
$(`string_match_re_literal`, tmpCalleeParam$15);
const tmpMCF$11 = str_to_test.search;
let tmpCalleeParam$17 = $dotCall(tmpMCF$11, str_to_test, `search`, re_from_opaque);
$(`string_search_re_from_opaque`, tmpCalleeParam$17);
`````


## Todos triggered


- (todo) access object property that also exists on prototype? $regex_exec
- (todo) access object property that also exists on prototype? $regex_test
- (todo) type trackeed tricks can possibly support static $regex_exec


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 're_source', 'a.b'
 - 2: 're_flags', 'gi'
 - eval returned: ("<crash[ Invalid flags supplied to RegExp constructor 're_flags' ]>")

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
