# Preval test case

# string_split_multi.md

> Type tracked > String method > String split multi
>
> String replace should fully resolve

Except when any arg is not primitive

## Input

`````js filename=intro
// np
$('hello world'.split('', 5, $, unknown));
// problem (for normalization, at least)
$('hello world'.split('', $, unknown));
`````


## Settled


`````js filename=intro
unknown;
const tmpCalleeParam /*:array*/ /*truthy*/ = [`h`, `e`, `l`, `l`, `o`];
$(tmpCalleeParam);
unknown;
const tmpCalleeParam$1 /*:array*/ /*truthy*/ = $dotCall($string_split, `hello world`, `split`, ``, $);
$(tmpCalleeParam$1);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
unknown;
$([`h`, `e`, `l`, `l`, `o`]);
unknown;
$($dotCall($string_split, `hello world`, `split`, ``, $));
`````


## PST Settled
With rename=true

`````js filename=intro
unknown;
const a = [ "h", "e", "l", "l", "o" ];
$( a );
unknown;
const b = $dotCall( $string_split, "hello world", "split", "", $ );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_split;
const tmpArgOverflow = ``;
const tmpArgOverflow$1 = 5;
unknown;
let tmpCalleeParam = $dotCall($string_split, `hello world`, `split`, tmpArgOverflow, tmpArgOverflow$1);
$(tmpCalleeParam);
const tmpMCF$1 = $string_split;
const tmpArgOverflow$3 = ``;
const tmpArgOverflow$5 = $;
unknown;
let tmpCalleeParam$1 = $dotCall($string_split, `hello world`, `split`, tmpArgOverflow$3, tmpArgOverflow$5);
$(tmpCalleeParam$1);
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
