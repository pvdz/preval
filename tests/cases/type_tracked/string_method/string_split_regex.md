# Preval test case

# string_split_regex.md

> Type tracked > String method > String split regex
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.split(/o/g));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`hell`, ` w`, `rld`];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`hell`, ` w`, `rld`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "hell", " w", "rld" ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_split;
const tmpMCP = new $regex_constructor(`o`, `g`);
let tmpCalleeParam = $dotCall(tmpMCF, `hello world`, `split`, tmpMCP);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['hell', ' w', 'rld']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
