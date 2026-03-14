# Preval test case

# ai_uri_encode_decode_opaque2.md

> Ai > Ai2 > Ai uri encode decode opaque2
>
> Test: URI handling functions with opaque strings.

## Input

`````js filename=intro
let uri_comp = $('uri_comp_str', 'a test & stuff');
let encoded_comp = encodeURIComponent(uri_comp);
$('encoded_comp_result', encoded_comp);
`````


## Settled


`````js filename=intro
const uri_comp /*:unknown*/ = $(`uri_comp_str`, `a test & stuff`);
const encoded_comp /*:string*/ = $Global_encodeURIComponent(uri_comp);
$(`encoded_comp_result`, encoded_comp);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`encoded_comp_result`, $Global_encodeURIComponent($(`uri_comp_str`, `a test & stuff`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "uri_comp_str", "a test & stuff" );
const b = $Global_encodeURIComponent( a );
$( "encoded_comp_result", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let uri_comp = $(`uri_comp_str`, `a test & stuff`);
let encoded_comp = $Global_encodeURIComponent(uri_comp);
$(`encoded_comp_result`, encoded_comp);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'uri_comp_str', 'a test & stuff'
 - 2: 'encoded_comp_result', 'uri_comp_str'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
