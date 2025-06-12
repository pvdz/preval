# Preval test case

# string_bold_call_ctx_3args.md

> Builtins cases > Ai string > String bold call ctx 3args
>
> Test String.prototype.bold called with .call and object context, 3 arguments; extra arguments are ignored

## Input

`````js filename=intro
const str = $("hello world");
const result = String.prototype.bold.call(str, "extra1", "extra2", "extra3");
$(result); // Expected: "<b>hello world</b>"
`````


## Settled


`````js filename=intro
const str /*:unknown*/ = $(`hello world`);
const result /*:string*/ = $dotCall($string_bold, str, undefined, `extra1`);
$(result);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($dotCall($string_bold, $(`hello world`), undefined, `extra1`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "hello world" );
const b = $dotCall( $string_bold, a, undefined, "extra1" );
$( b );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const str = $(`hello world`);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.bold;
const tmpMCF = tmpMCOO.call;
const result = $dotCall(tmpMCF, tmpMCOO, `call`, str, `extra1`, `extra2`, `extra3`);
$(result);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'hello world'
 - 2: '<b>hello world</b>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
