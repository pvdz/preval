# Preval test case

# ai_uri_encode_decode_opaque.md

> Ai > Ai2 > Ai uri encode decode opaque
>
> Test: URI handling functions with opaque strings.

## Input

`````js filename=intro
// Expected: encodeURI, encodeURIComponent, decodeURI, decodeURIComponent preserved.
let uri_plain = $('uri_plain_str', 'http://example.com/?q=a test');
let uri_comp = $('uri_comp_str', 'a test & stuff');
let uri_opaque = $('uri_opaque_str');

let encoded_uri = encodeURI(uri_plain);
$('encoded_uri_result', encoded_uri);
$('decoded_uri_result', decodeURI(encoded_uri));

let encoded_comp = encodeURIComponent(uri_comp);
$('encoded_comp_result', encoded_comp);
$('decoded_comp_result', decodeURIComponent(encoded_comp));

$('encoded_uri_opaque', encodeURI(uri_opaque));
$('encoded_comp_opaque', encodeURIComponent(uri_opaque));
// Assuming uri_opaque might be an encoded string for decode tests
$('decoded_uri_opaque', decodeURI(uri_opaque));
$('decoded_comp_opaque', decodeURIComponent(uri_opaque));
`````


## Settled


`````js filename=intro
const uri_plain /*:unknown*/ = $(`uri_plain_str`, `http://example.com/?q=a test`);
const uri_comp /*:unknown*/ = $(`uri_comp_str`, `a test & stuff`);
const uri_opaque /*:unknown*/ = $(`uri_opaque_str`);
const encoded_uri /*:string*/ = $Global_encodeURI(uri_plain);
$(`encoded_uri_result`, encoded_uri);
const tmpCalleeParam /*:string*/ = $Global_decodeURI(encoded_uri);
$(`decoded_uri_result`, tmpCalleeParam);
const encoded_comp /*:string*/ = $Global_encodeURIComponent(uri_comp);
$(`encoded_comp_result`, encoded_comp);
const tmpCalleeParam$1 /*:string*/ = $Global_decodeURIComponent(encoded_comp);
$(`decoded_comp_result`, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:string*/ = $Global_encodeURI(uri_opaque);
$(`encoded_uri_opaque`, tmpCalleeParam$3);
const tmpCalleeParam$5 /*:string*/ = $Global_encodeURIComponent(uri_opaque);
$(`encoded_comp_opaque`, tmpCalleeParam$5);
const tmpCalleeParam$7 /*:string*/ = $Global_decodeURI(uri_opaque);
$(`decoded_uri_opaque`, tmpCalleeParam$7);
const tmpCalleeParam$9 /*:string*/ = $Global_decodeURIComponent(uri_opaque);
$(`decoded_comp_opaque`, tmpCalleeParam$9);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const uri_plain = $(`uri_plain_str`, `http://example.com/?q=a test`);
const uri_comp = $(`uri_comp_str`, `a test & stuff`);
const uri_opaque = $(`uri_opaque_str`);
const encoded_uri = $Global_encodeURI(uri_plain);
$(`encoded_uri_result`, encoded_uri);
$(`decoded_uri_result`, $Global_decodeURI(encoded_uri));
const encoded_comp = $Global_encodeURIComponent(uri_comp);
$(`encoded_comp_result`, encoded_comp);
$(`decoded_comp_result`, $Global_decodeURIComponent(encoded_comp));
$(`encoded_uri_opaque`, $Global_encodeURI(uri_opaque));
$(`encoded_comp_opaque`, $Global_encodeURIComponent(uri_opaque));
$(`decoded_uri_opaque`, $Global_decodeURI(uri_opaque));
$(`decoded_comp_opaque`, $Global_decodeURIComponent(uri_opaque));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "uri_plain_str", "http://example.com/?q=a test" );
const b = $( "uri_comp_str", "a test & stuff" );
const c = $( "uri_opaque_str" );
const d = $Global_encodeURI( a );
$( "encoded_uri_result", d );
const e = $Global_decodeURI( d );
$( "decoded_uri_result", e );
const f = $Global_encodeURIComponent( b );
$( "encoded_comp_result", f );
const g = $Global_decodeURIComponent( f );
$( "decoded_comp_result", g );
const h = $Global_encodeURI( c );
$( "encoded_uri_opaque", h );
const i = $Global_encodeURIComponent( c );
$( "encoded_comp_opaque", i );
const j = $Global_decodeURI( c );
$( "decoded_uri_opaque", j );
const k = $Global_decodeURIComponent( c );
$( "decoded_comp_opaque", k );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let uri_plain = $(`uri_plain_str`, `http://example.com/?q=a test`);
let uri_comp = $(`uri_comp_str`, `a test & stuff`);
let uri_opaque = $(`uri_opaque_str`);
let encoded_uri = $Global_encodeURI(uri_plain);
$(`encoded_uri_result`, encoded_uri);
let tmpCalleeParam = $Global_decodeURI(encoded_uri);
$(`decoded_uri_result`, tmpCalleeParam);
let encoded_comp = $Global_encodeURIComponent(uri_comp);
$(`encoded_comp_result`, encoded_comp);
let tmpCalleeParam$1 = $Global_decodeURIComponent(encoded_comp);
$(`decoded_comp_result`, tmpCalleeParam$1);
let tmpCalleeParam$3 = $Global_encodeURI(uri_opaque);
$(`encoded_uri_opaque`, tmpCalleeParam$3);
let tmpCalleeParam$5 = $Global_encodeURIComponent(uri_opaque);
$(`encoded_comp_opaque`, tmpCalleeParam$5);
let tmpCalleeParam$7 = $Global_decodeURI(uri_opaque);
$(`decoded_uri_opaque`, tmpCalleeParam$7);
let tmpCalleeParam$9 = $Global_decodeURIComponent(uri_opaque);
$(`decoded_comp_opaque`, tmpCalleeParam$9);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'uri_plain_str', 'http://example.com/?q=a test'
 - 2: 'uri_comp_str', 'a test & stuff'
 - 3: 'uri_opaque_str'
 - 4: 'encoded_uri_result', 'uri_plain_str'
 - 5: 'decoded_uri_result', 'uri_plain_str'
 - 6: 'encoded_comp_result', 'uri_comp_str'
 - 7: 'decoded_comp_result', 'uri_comp_str'
 - 8: 'encoded_uri_opaque', 'uri_opaque_str'
 - 9: 'encoded_comp_opaque', 'uri_opaque_str'
 - 10: 'decoded_uri_opaque', 'uri_opaque_str'
 - 11: 'decoded_comp_opaque', 'uri_opaque_str'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
