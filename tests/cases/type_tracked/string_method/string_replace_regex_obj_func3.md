# Preval test case

# string_replace_regex_obj_func3.md

> Type tracked > String method > String replace regex obj func3
>
> (This case ended up badly)

## Input

`````js filename=intro
const obj = {a: 1, b: 2};
const rex = /\w.*\w/g;
$('a is not b'.replace(rex, (c) => ($(c, obj[c]), obj[c])));
`````


## Settled


`````js filename=intro
const obj /*:object*/ /*truthy*/ = { a: 1, b: 2 };
const rex /*:regex*/ /*truthy*/ = new $regex_constructor(`\\w.*\\w`, `g`);
const tmpMCP /*:(unknown)=>unknown*/ = function ($$0) {
  const c /*:unknown*/ = $$0;
  debugger;
  const tmpCalleeParam$3 /*:unknown*/ = obj[c];
  $(c, tmpCalleeParam$3);
  const tmpReturnArg /*:unknown*/ = obj[c];
  return tmpReturnArg;
};
const tmpCalleeParam /*:string*/ = $dotCall($string_replace, `a is not b`, `replace`, rex, tmpMCP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = { a: 1, b: 2 };
const rex = new $regex_constructor(`\\w.*\\w`, `g`);
$(
  $dotCall($string_replace, `a is not b`, `replace`, rex, function (c) {
    $(c, obj[c]);
    const tmpReturnArg = obj[c];
    return tmpReturnArg;
  }),
);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = new $regex_constructor( "\\w.*\\w", "g" );
const c = function($$0 ) {
  const d = $$0;
  debugger;
  const e = a[ d ];
  $( d, e );
  const f = a[ d ];
  return f;
};
const g = $dotCall( $string_replace, "a is not b", "replace", b, c );
$( g );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const obj = { a: 1, b: 2 };
const rex = new $regex_constructor(`\\w.*\\w`, `g`);
const tmpMCF = $string_replace;
const tmpMCP = function ($$0) {
  let c = $$0;
  debugger;
  let tmpCalleeParam$1 = c;
  let tmpCalleeParam$3 = obj[c];
  $(tmpCalleeParam$1, tmpCalleeParam$3);
  const tmpReturnArg = obj[c];
  return tmpReturnArg;
};
let tmpCalleeParam = $dotCall(tmpMCF, `a is not b`, `replace`, rex, tmpMCP);
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'a is not b', undefined
 - 2: 'undefined'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
