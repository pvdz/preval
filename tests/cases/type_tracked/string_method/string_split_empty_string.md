# Preval test case

# string_split_empty_string.md

> Type tracked > String method > String split empty string
>
> String replace should fully resolve

## Input

`````js filename=intro
$('hello world'.split(''));
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [`h`, `e`, `l`, `l`, `o`, ` `, `w`, `o`, `r`, `l`, `d`];
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$([`h`, `e`, `l`, `l`, `o`, ` `, `w`, `o`, `r`, `l`, `d`]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [ "h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d" ];
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_split;
let tmpCalleeParam = $dotCall($string_split, `hello world`, `split`, ``);
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['h', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
