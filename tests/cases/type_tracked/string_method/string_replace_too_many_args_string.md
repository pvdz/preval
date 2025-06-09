# Preval test case

# string_replace_too_many_args_string.md

> Type tracked > String method > String replace too many args string
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.replace(' ', ', ', $, unknown));
`````


## Settled


`````js filename=intro
unknown;
$(`hello, world`);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
unknown;
$(`hello, world`);
`````


## PST Settled
With rename=true

`````js filename=intro
unknown;
$( "hello, world" );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_replace;
const tmpArgOverflow = ` `;
const tmpArgOverflow$1 = `, `;
unknown;
let tmpCalleeParam = $dotCall($string_replace, `hello world`, `replace`, tmpArgOverflow, tmpArgOverflow$1);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

unknown


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
