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
const obj /*:object*/ = { a: 1, b: 2 };
const tmpMCP /*:(unknown)=>unknown*/ = function ($$0) {
  const c /*:unknown*/ = $$0;
  debugger;
  const tmpCalleeParam$3 /*:unknown*/ = obj[c];
  $(c, tmpCalleeParam$3);
  const tmpReturnArg /*:unknown*/ = obj[c];
  return tmpReturnArg;
};
const rex /*:regex*/ = /\w.*\w/g;
const tmpCalleeParam /*:string*/ = $dotCall($string_replace, `a is not b`, `replace`, rex, tmpMCP);
$(tmpCalleeParam);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const obj = { a: 1, b: 2 };
const tmpMCP = function (c) {
  $(c, obj[c]);
  const tmpReturnArg = obj[c];
  return tmpReturnArg;
};
$($dotCall($string_replace, `a is not b`, `replace`, /\w.*\w/g, tmpMCP));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = {
  a: 1,
  b: 2,
};
const b = function($$0 ) {
  const c = $$0;
  debugger;
  const d = a[ c ];
  $( c, d );
  const e = a[ c ];
  return e;
};
const f = /\w.*\w/g;
const g = $dotCall( $string_replace, "a is not b", "replace", f, b );
$( g );
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
