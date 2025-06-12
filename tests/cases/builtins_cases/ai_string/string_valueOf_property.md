# Preval test case

# string_valueOf_property.md

> Builtins cases > Ai string > String valueOf property
>
> Test .valueOf property access on a string literal

## Input

`````js filename=intro
$("hello".valueOf);
// Expected: String.prototype.valueOf

// Test .valueOf property access on a string variable
let s = "world";
$(s.valueOf);
// Expected: String.prototype.valueOf

// Test .valueOf property access using computed property
$("abcde"["valueOf"]);
// Expected: String.prototype.valueOf

// Test .valueOf property access with .call (should be function)
$(String.prototype.valueOf.call("hello"));
// Expected: "hello"

// Test .valueOf property access with spread (should be function)
$(String.prototype.valueOf.call(...$(["hello"])));
// Expected: "hello"
`````


## Settled


`````js filename=intro
$($string_valueOf);
$($string_valueOf);
$($string_valueOf);
$(`hello`);
const tmpCalleeParam$9 /*:array*/ /*truthy*/ = [`hello`];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$9);
const tmpCalleeParam$7 /*:unknown*/ /*truthy*/ = $dotCall($function_call, $string_valueOf, `call`, ...tmpMCSP);
$(tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($string_valueOf);
$($string_valueOf);
$($string_valueOf);
$(`hello`);
const tmpMCSP = $([`hello`]);
$($dotCall($function_call, $string_valueOf, `call`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
$( $string_valueOf );
$( $string_valueOf );
$( $string_valueOf );
$( "hello" );
const a = [ "hello" ];
const b = $( a );
const c = $dotCall( $function_call, $string_valueOf, "call", ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $string_valueOf;
$($string_valueOf);
let s = `world`;
let tmpCalleeParam$1 = s.valueOf;
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = $string_valueOf;
$($string_valueOf);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.valueOf;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam$5 = $dotCall(tmpMCF, tmpMCOO, `call`, `hello`);
$(tmpCalleeParam$5);
const tmpCompObj$1 = $String_prototype;
const tmpMCOO$1 = tmpCompObj$1.valueOf;
const tmpMCF$1 = tmpMCOO$1.call;
let tmpCalleeParam$9 = [`hello`];
const tmpMCSP = $(tmpCalleeParam$9);
let tmpCalleeParam$7 = $dotCall(tmpMCF$1, tmpMCOO$1, `call`, ...tmpMCSP);
$(tmpCalleeParam$7);
`````


## Todos triggered


- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: '<function>'
 - 4: 'hello'
 - 5: ['hello']
 - 6: 'hello'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
