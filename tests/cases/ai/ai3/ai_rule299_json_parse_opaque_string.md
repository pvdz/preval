# Preval test case

# ai_rule299_json_parse_opaque_string.md

> Ai > Ai3 > Ai rule299 json parse opaque string
>
> Test: JSON.parse with an opaque string argument.

## Input

`````js filename=intro
// Expected: JSON.parse(str); (or equivalent, call preserved)
let str = $('str', '{"key": "value"}');
let obj = $('obj', JSON.parse(str));
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`str`, `{"key": "value"}`);
const tmpCalleeParam /*:unknown*/ = $JSON_parse(str);
$(`obj`, tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(`obj`, $JSON_parse($(`str`, `{"key": "value"}`)));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "str", "{\"key\": \"value\"}" );
const b = $JSON_parse( a );
$( "obj", b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let str = $(`str`, `{"key": "value"}`);
const tmpMCF = $JSON_parse;
let tmpCalleeParam = $JSON_parse(str);
let obj = $(`obj`, tmpCalleeParam);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $JSON_parse


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'str', '{"key": "value"}'
 - eval returned: ('<crash[ Unexpected token \'s\', "str" is not valid JSON ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
