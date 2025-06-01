# Preval test case

# ai_escape_unescape_opaque.md

> Ai > Ai2 > Ai escape unescape opaque
>
> Test: escape() and unescape() (deprecated) with opaque strings.

## Input

`````js filename=intro
// Expected: Calls preserved if Preval doesn't outright disallow/warn them.
let str_to_escape = $('esc_str', 'Hello World! @*');
let opaque_str_esc = $('esc_opaque_str');

let escaped = escape(str_to_escape);
$('escaped_result', escaped);
$('unescaped_result', unescape(escaped));

$('escaped_opaque', escape(opaque_str_esc));
// Assuming opaque_str_esc might be an escaped string for unescape
$('unescaped_opaque', unescape(opaque_str_esc));
`````


## Settled


`````js filename=intro
const str_to_escape /*:unknown*/ = $(`esc_str`, `Hello World! @*`);
const opaque_str_esc /*:unknown*/ = $(`esc_opaque_str`);
const escaped /*:string*/ = escape(str_to_escape);
$(`escaped_result`, escaped);
const tmpCalleeParam /*:string*/ = unescape(escaped);
$(`unescaped_result`, tmpCalleeParam);
const tmpCalleeParam$1 /*:string*/ = escape(opaque_str_esc);
$(`escaped_opaque`, tmpCalleeParam$1);
const tmpCalleeParam$3 /*:string*/ = unescape(opaque_str_esc);
$(`unescaped_opaque`, tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const str_to_escape = $(`esc_str`, `Hello World! @*`);
const opaque_str_esc = $(`esc_opaque_str`);
const escaped = escape(str_to_escape);
$(`escaped_result`, escaped);
$(`unescaped_result`, unescape(escaped));
$(`escaped_opaque`, escape(opaque_str_esc));
$(`unescaped_opaque`, unescape(opaque_str_esc));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "esc_str", "Hello World! @*" );
const b = $( "esc_opaque_str" );
const c = escape( a );
$( "escaped_result", c );
const d = unescape( c );
$( "unescaped_result", d );
const e = escape( b );
$( "escaped_opaque", e );
const f = unescape( b );
$( "unescaped_opaque", f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let str_to_escape = $(`esc_str`, `Hello World! @*`);
let opaque_str_esc = $(`esc_opaque_str`);
let escaped = escape(str_to_escape);
$(`escaped_result`, escaped);
let tmpCalleeParam = unescape(escaped);
$(`unescaped_result`, tmpCalleeParam);
let tmpCalleeParam$1 = escape(opaque_str_esc);
$(`escaped_opaque`, tmpCalleeParam$1);
let tmpCalleeParam$3 = unescape(opaque_str_esc);
$(`unescaped_opaque`, tmpCalleeParam$3);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'esc_str', 'Hello World! @*'
 - 2: 'esc_opaque_str'
 - 3: 'escaped_result', 'esc_str'
 - 4: 'unescaped_result', 'esc_str'
 - 5: 'escaped_opaque', 'esc_opaque_str'
 - 6: 'unescaped_opaque', 'esc_opaque_str'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
