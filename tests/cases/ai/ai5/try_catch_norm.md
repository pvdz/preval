# Preval test case

# try_catch_norm.md

> Ai > Ai5 > Try catch norm
>
> Test try-catch normalization

## Input

`````js filename=intro
try {
    $(1);  // Track try block
    throw new Error("test");
} catch {
    $(2);  // Track catch block
    $("error");
}

// Expected:
// try {
//     $(1);
//     throw new Error("test");
// } catch ($$0) {
//     const e = $$0;
//     debugger;
//     $(2);
//     $("error");
// }
`````


## Settled


`````js filename=intro
try {
  $(1);
  const tmpThrowArg /*:object*/ /*truthy*/ = new $error_constructor(`test`);
  throw tmpThrowArg;
} catch (e) {
  $(2);
  $(`error`);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
try {
  $(1);
  const tmpThrowArg = new $error_constructor(`test`);
  throw tmpThrowArg;
} catch (e) {
  $(2);
  $(`error`);
}
`````


## PST Settled
With rename=true

`````js filename=intro
try {
  $( 1 );
  const a = new $error_constructor( "test" );
  throw a;
}
catch (b) {
  $( 2 );
  $( "error" );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
try {
  $(1);
  const tmpThrowArg = new $error_constructor(`test`);
  throw tmpThrowArg;
} catch (e) {
  $(2);
  $(`error`);
}
`````


## Todos triggered


- (todo) can try-escaping support this expr node type? CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'error'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
