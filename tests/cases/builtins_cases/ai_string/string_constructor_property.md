# Preval test case

# string_constructor_property.md

> Builtins cases > Ai string > String constructor property
>
> Test .constructor property access on a string literal

## Input

`````js filename=intro
$("hello".constructor);
// Expected: String

// Test .constructor property access on a string variable
let s = "world";
$(s.constructor);
// Expected: String

// Test .constructor property access using computed property
$("abcde"["constructor"]);
// Expected: String

// Test .constructor property access with .call (should be undefined)
$(String.prototype.constructor.call("hello"));
// Expected: undefined

// Test .constructor property access with spread (should be undefined)
$(String.prototype.constructor.call(...$(["hello"])));
// Expected: undefined
`````


## Settled


`````js filename=intro
$($string_constructor);
$($string_constructor);
$($string_constructor);
$(``);
const tmpCalleeParam$9 /*:array*/ /*truthy*/ = [`hello`];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$9);
const tmpCalleeParam$7 /*:unknown*/ /*truthy*/ = $dotCall($function_call, $string_constructor, `call`, ...tmpMCSP);
$(tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($string_constructor);
$($string_constructor);
$($string_constructor);
$(``);
const tmpMCSP = $([`hello`]);
$($dotCall($function_call, $string_constructor, `call`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
$( $string_constructor );
$( $string_constructor );
$( $string_constructor );
$( "" );
const a = [ "hello" ];
const b = $( a );
const c = $dotCall( $function_call, $string_constructor, "call", ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $string_constructor;
$($string_constructor);
let s = `world`;
let tmpCalleeParam$1 = s.constructor;
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = $string_constructor;
$($string_constructor);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.constructor;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam$5 = $dotCall(tmpMCF, tmpMCOO, `call`, `hello`);
$(tmpCalleeParam$5);
const tmpCompObj$1 = $String_prototype;
const tmpMCOO$1 = tmpCompObj$1.constructor;
const tmpMCF$1 = tmpMCOO$1.call;
let tmpCalleeParam$9 = [`hello`];
const tmpMCSP = $(tmpCalleeParam$9);
let tmpCalleeParam$7 = $dotCall(tmpMCF$1, tmpMCOO$1, `call`, ...tmpMCSP);
$(tmpCalleeParam$7);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '<function>'
 - 2: '<function>'
 - 3: '<function>'
 - 4: ''
 - 5: ['hello']
 - 6: ''
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
