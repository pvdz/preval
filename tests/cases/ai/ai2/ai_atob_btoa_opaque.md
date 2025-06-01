# Preval test case

# ai_atob_btoa_opaque.md

> Ai > Ai2 > Ai atob btoa opaque
>
> Test: atob() and btoa() with opaque strings.

## Input

`````js filename=intro
// Expected: Calls preserved. Runtime might error if strings aren't valid base64/chars.
let str_for_btoa = $('btoa_str', 'Hello->World'); // Valid for btoa
let str_for_atob = $('atob_str', 'SGVsbG8tPldvcmxk'); // SGVsbG8tPldvcmxk is Hello->World
let opaque_general_str = $('opaque_ab_str');

let encoded_btoa = btoa(str_for_btoa);
$('btoa_encoded_result', encoded_btoa);
$('atob_decoded_result', atob(encoded_btoa)); // Should decode what btoa produced from opaque str_for_btoa

$('btoa_opaque_input', btoa(opaque_general_str));
$('atob_opaque_input', atob(opaque_general_str)); // opaque_general_str might be valid for one, not other, or neither

// Test with known invalid char for btoa if Preval handles it
// let invalid_btoa_char = $('invalid_btoa_char', 'Hello®');
// try { $('btoa_invalid_char_res', btoa(invalid_btoa_char)); } catch(e) { $('btoa_invalid_error', e.name); }
`````


## Settled


`````js filename=intro
const str_for_btoa /*:unknown*/ = $(`btoa_str`, `Hello->World`);
$(`atob_str`, `SGVsbG8tPldvcmxk`);
const opaque_general_str /*:unknown*/ = $(`opaque_ab_str`);
const encoded_btoa /*:string*/ = btoa(str_for_btoa);
$(`btoa_encoded_result`, encoded_btoa);
const tmpCalleeParam /*:string*/ = atob(encoded_btoa);
$(`atob_decoded_result`, tmpCalleeParam);
const tmpCalleeParam$1 /*:string*/ = btoa(opaque_general_str);
$(`btoa_opaque_input`, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:string*/ = atob(opaque_general_str);
$(`atob_opaque_input`, tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str_for_btoa = $(`btoa_str`, `Hello->World`);
$(`atob_str`, `SGVsbG8tPldvcmxk`);
const opaque_general_str = $(`opaque_ab_str`);
const encoded_btoa = btoa(str_for_btoa);
$(`btoa_encoded_result`, encoded_btoa);
$(`atob_decoded_result`, atob(encoded_btoa));
$(`btoa_opaque_input`, btoa(opaque_general_str));
$(`atob_opaque_input`, atob(opaque_general_str));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "btoa_str", "Hello->World" );
$( "atob_str", "SGVsbG8tPldvcmxk" );
const b = $( "opaque_ab_str" );
const c = btoa( a );
$( "btoa_encoded_result", c );
const d = atob( c );
$( "atob_decoded_result", d );
const e = btoa( b );
$( "btoa_opaque_input", e );
const f = atob( b );
$( "atob_opaque_input", f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let str_for_btoa = $(`btoa_str`, `Hello->World`);
let str_for_atob = $(`atob_str`, `SGVsbG8tPldvcmxk`);
let opaque_general_str = $(`opaque_ab_str`);
let encoded_btoa = btoa(str_for_btoa);
$(`btoa_encoded_result`, encoded_btoa);
let tmpCalleeParam = atob(encoded_btoa);
$(`atob_decoded_result`, tmpCalleeParam);
let tmpCalleeParam$1 = btoa(opaque_general_str);
$(`btoa_opaque_input`, tmpCalleeParam$1);
let tmpCalleeParam$3 = atob(opaque_general_str);
$(`atob_opaque_input`, tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'btoa_str', 'Hello->World'
 - 2: 'atob_str', 'SGVsbG8tPldvcmxk'
 - 3: 'opaque_ab_str'
 - 4: 'btoa_encoded_result', 'YnRvYV9zdHI='
 - 5: 'atob_decoded_result', 'btoa_str'
 - 6: 'btoa_opaque_input', 'b3BhcXVlX2FiX3N0cg=='
 - eval returned: ('<crash[ Invalid character ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
