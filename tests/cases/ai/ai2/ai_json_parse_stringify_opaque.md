# Preval test case

# ai_json_parse_stringify_opaque.md

> Ai > Ai2 > Ai json parse stringify opaque
>
> Test: JSON.parse and JSON.stringify with opaque arguments and reviver/replacer.

## Input

`````js filename=intro
// Expected: Calls preserved. Opaque reviver/replacer used.
let json_str = $('json_str_to_parse', '{"a":1,"b":"text"}');
let obj_to_stringify = $('json_obj_to_stringify', {c:2, d:true});
let opaque_reviver = $('json_opaque_reviver');
let opaque_replacer = $('json_opaque_replacer');
let opaque_space = $('json_opaque_space', 2);

$('json_parsed_no_reviver', JSON.parse(json_str));
$('json_parsed_with_reviver', JSON.parse(json_str, opaque_reviver));

$('json_stringified_no_replacer', JSON.stringify(obj_to_stringify));
$('json_stringified_with_replacer_space', JSON.stringify(obj_to_stringify, opaque_replacer, opaque_space));

// Opaque inputs for parse/stringify themselves
let opaque_input_for_parse = $('opaque_json_parse_input');
let opaque_input_for_stringify = $('opaque_json_stringify_input');
$('json_parsed_opaque_input', JSON.parse(opaque_input_for_parse, opaque_reviver));
$('json_stringified_opaque_input', JSON.stringify(opaque_input_for_stringify));
`````


## Settled


`````js filename=intro
const json_str /*:unknown*/ = $(`json_str_to_parse`, `{"a":1,"b":"text"}`);
const tmpCalleeParam /*:object*/ = { c: 2, d: true };
const obj_to_stringify /*:unknown*/ = $(`json_obj_to_stringify`, tmpCalleeParam);
const opaque_reviver /*:unknown*/ = $(`json_opaque_reviver`);
const opaque_replacer /*:unknown*/ = $(`json_opaque_replacer`);
const opaque_space /*:unknown*/ = $(`json_opaque_space`, 2);
const tmpCalleeParam$1 /*:unknown*/ = $JSON_parse(json_str);
$(`json_parsed_no_reviver`, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:unknown*/ = $JSON_parse(json_str, opaque_reviver);
$(`json_parsed_with_reviver`, tmpCalleeParam$3);
const tmpCalleeParam$5 /*:primitive*/ = $JSON_stringify(obj_to_stringify);
$(`json_stringified_no_replacer`, tmpCalleeParam$5);
const tmpCalleeParam$7 /*:primitive*/ = $JSON_stringify(obj_to_stringify, opaque_replacer, opaque_space);
$(`json_stringified_with_replacer_space`, tmpCalleeParam$7);
const opaque_input_for_parse /*:unknown*/ = $(`opaque_json_parse_input`);
const opaque_input_for_stringify /*:unknown*/ = $(`opaque_json_stringify_input`);
const tmpCalleeParam$9 /*:unknown*/ = $JSON_parse(opaque_input_for_parse, opaque_reviver);
$(`json_parsed_opaque_input`, tmpCalleeParam$9);
const tmpCalleeParam$11 /*:primitive*/ = $JSON_stringify(opaque_input_for_stringify);
$(`json_stringified_opaque_input`, tmpCalleeParam$11);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const json_str = $(`json_str_to_parse`, `{"a":1,"b":"text"}`);
const obj_to_stringify = $(`json_obj_to_stringify`, { c: 2, d: true });
const opaque_reviver = $(`json_opaque_reviver`);
const opaque_replacer = $(`json_opaque_replacer`);
const opaque_space = $(`json_opaque_space`, 2);
$(`json_parsed_no_reviver`, $JSON_parse(json_str));
$(`json_parsed_with_reviver`, $JSON_parse(json_str, opaque_reviver));
$(`json_stringified_no_replacer`, $JSON_stringify(obj_to_stringify));
$(`json_stringified_with_replacer_space`, $JSON_stringify(obj_to_stringify, opaque_replacer, opaque_space));
const opaque_input_for_parse = $(`opaque_json_parse_input`);
const opaque_input_for_stringify = $(`opaque_json_stringify_input`);
$(`json_parsed_opaque_input`, $JSON_parse(opaque_input_for_parse, opaque_reviver));
$(`json_stringified_opaque_input`, $JSON_stringify(opaque_input_for_stringify));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "json_str_to_parse", "{\"a\":1,\"b\":\"text\"}" );
const b = {
  c: 2,
  d: true,
};
const c = $( "json_obj_to_stringify", b );
const d = $( "json_opaque_reviver" );
const e = $( "json_opaque_replacer" );
const f = $( "json_opaque_space", 2 );
const g = $JSON_parse( a );
$( "json_parsed_no_reviver", g );
const h = $JSON_parse( a, d );
$( "json_parsed_with_reviver", h );
const i = $JSON_stringify( c );
$( "json_stringified_no_replacer", i );
const j = $JSON_stringify( c, e, f );
$( "json_stringified_with_replacer_space", j );
const k = $( "opaque_json_parse_input" );
const l = $( "opaque_json_stringify_input" );
const m = $JSON_parse( k, d );
$( "json_parsed_opaque_input", m );
const n = $JSON_stringify( l );
$( "json_stringified_opaque_input", n );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let json_str = $(`json_str_to_parse`, `{"a":1,"b":"text"}`);
let tmpCalleeParam = { c: 2, d: true };
let obj_to_stringify = $(`json_obj_to_stringify`, tmpCalleeParam);
let opaque_reviver = $(`json_opaque_reviver`);
let opaque_replacer = $(`json_opaque_replacer`);
let opaque_space = $(`json_opaque_space`, 2);
const tmpMCF = $JSON_parse;
let tmpCalleeParam$1 = $JSON_parse(json_str);
$(`json_parsed_no_reviver`, tmpCalleeParam$1);
const tmpMCF$1 = $JSON_parse;
let tmpCalleeParam$3 = $JSON_parse(json_str, opaque_reviver);
$(`json_parsed_with_reviver`, tmpCalleeParam$3);
const tmpMCF$3 = $JSON_stringify;
let tmpCalleeParam$5 = $JSON_stringify(obj_to_stringify);
$(`json_stringified_no_replacer`, tmpCalleeParam$5);
const tmpMCF$5 = $JSON_stringify;
let tmpCalleeParam$7 = $JSON_stringify(obj_to_stringify, opaque_replacer, opaque_space);
$(`json_stringified_with_replacer_space`, tmpCalleeParam$7);
let opaque_input_for_parse = $(`opaque_json_parse_input`);
let opaque_input_for_stringify = $(`opaque_json_stringify_input`);
const tmpMCF$7 = $JSON_parse;
let tmpCalleeParam$9 = $JSON_parse(opaque_input_for_parse, opaque_reviver);
$(`json_parsed_opaque_input`, tmpCalleeParam$9);
const tmpMCF$9 = $JSON_stringify;
let tmpCalleeParam$11 = $JSON_stringify(opaque_input_for_stringify);
$(`json_stringified_opaque_input`, tmpCalleeParam$11);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $JSON_parse
- (todo) type trackeed tricks can possibly support static $JSON_stringify


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'json_str_to_parse', '{"a":1,"b":"text"}'
 - 2: 'json_obj_to_stringify', { c: '2', d: 'true' }
 - 3: 'json_opaque_reviver'
 - 4: 'json_opaque_replacer'
 - 5: 'json_opaque_space', 2
 - eval returned: ('<crash[ Unexpected token \'j\', "json_str_to_parse" is not valid JSON ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
