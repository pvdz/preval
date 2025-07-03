# Preval test case

# string_toString_property.md

> Builtins cases > Ai string > String toString property
>
> Test .toString property access on a string literal

## Input

`````js filename=intro
$("hello".toString);
// Expected: String.prototype.toString

// Test .toString property access on a string variable
let s = "world";
$(s.toString);
// Expected: String.prototype.toString

// Test .toString property access using computed property
$("abcde"["toString"]);
// Expected: String.prototype.toString

// Test .toString property access with .call (should be function)
$(String.prototype.toString.call("hello"));
// Expected: "hello"

// Test .toString property access with spread (should be function)
$(String.prototype.toString.call(...$(["hello"])));
// Expected: "hello"
`````


## Settled


`````js filename=intro
$($string_toString);
$($string_toString);
$($string_toString);
$(`hello`);
const tmpCalleeParam$9 /*:array*/ /*truthy*/ = [`hello`];
const tmpMCSP /*:unknown*/ = $(tmpCalleeParam$9);
const tmpCalleeParam$7 /*:unknown*/ /*truthy*/ = $dotCall($function_call, $string_toString, `call`, ...tmpMCSP);
$(tmpCalleeParam$7);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$($string_toString);
$($string_toString);
$($string_toString);
$(`hello`);
const tmpMCSP = $([`hello`]);
$($dotCall($function_call, $string_toString, `call`, ...tmpMCSP));
`````


## PST Settled
With rename=true

`````js filename=intro
$( $string_toString );
$( $string_toString );
$( $string_toString );
$( "hello" );
const a = [ "hello" ];
const b = $( a );
const c = $dotCall( $function_call, $string_toString, "call", ...b );
$( c );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let tmpCalleeParam = $string_toString;
$($string_toString);
let s = `world`;
let tmpCalleeParam$1 = s.toString;
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = $string_toString;
$($string_toString);
const tmpCompObj = $String_prototype;
const tmpMCOO = tmpCompObj.toString;
const tmpMCF = tmpMCOO.call;
let tmpCalleeParam$5 = $dotCall(tmpMCF, tmpMCOO, `call`, `hello`);
$(tmpCalleeParam$5);
const tmpCompObj$1 = $String_prototype;
const tmpMCOO$1 = tmpCompObj$1.toString;
const tmpMCF$1 = tmpMCOO$1.call;
let tmpCalleeParam$9 = [`hello`];
const tmpMCSP = $(tmpCalleeParam$9);
let tmpCalleeParam$7 = $dotCall(tmpMCF$1, tmpMCOO$1, `call`, ...tmpMCSP);
$(tmpCalleeParam$7);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) type trackeed tricks can possibly support static $string_toString


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
