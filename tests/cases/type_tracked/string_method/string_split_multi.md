# Preval test case

# string_split_multi.md

> Type tracked > String method > String split multi
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.split('', $, unknown));
`````


## Settled


`````js filename=intro
unknown;
const tmpCalleeParam /*:array*/ /*truthy*/ = [`h`, `e`, `l`, `l`, `o`, ` `, `w`, `o`, `r`, `l`, `d`];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
unknown;
$([`h`, `e`, `l`, `l`, `o`, ` `, `w`, `o`, `r`, `l`, `d`]);
`````


## PST Settled
With rename=true

`````js filename=intro
unknown;
const a = [ "h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d" ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_split;
let tmpCalleeParam = $dotCall($string_split, `hello world`, `split`, ``, $, unknown);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


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
