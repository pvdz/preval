# Preval test case

# init_member_call.md

> Normalize > Binding > Init member call
>
> Binding declaration with a member expression call init should not be outlined

## Input

`````js filename=intro
let x = "foo".toString();
$(x);
`````


## Settled


`````js filename=intro
const x /*:string*/ = $dotCall($string_toString, `foo`, `toString`);
$(x);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_toString, `foo`, `toString`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $dotCall( $string_toString, "foo", "toString" );
$( a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpMCF = $string_toString;
let x = $dotCall($string_toString, `foo`, `toString`);
$(x);
`````


## Todos triggered


- (todo) type trackeed tricks can possibly support static $string_toString


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'foo'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
