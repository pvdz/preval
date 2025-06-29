# Preval test case

# base_call.md

> Return param > Base call
>
> If a function returns a static mutation to a param value we can outline the param and drop it

## Input

`````js filename=intro
function f(x) {
  $('no');
  $('inlining');
  $('please');
  
  const y = x();
  return y;
}

$(f(function(){ $('pass'); }));
$(f(2));
$(f('three'));
`````


## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  return undefined;
};
f();
$(`pass`);
$(undefined);
f();
const tmpThrowArg /*:object*/ /*truthy*/ = new $typeError_constructor(
  `[Preval] Attempting to call a value that cannot be called: \`const tmpCalleeParam\$3 = 2();\``,
);
throw tmpThrowArg;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const f = function () {
  $(`no`);
  $(`inlining`);
  $(`please`);
};
f();
$(`pass`);
$(undefined);
f();
const tmpThrowArg = new $typeError_constructor(
  `[Preval] Attempting to call a value that cannot be called: \`const tmpCalleeParam\$3 = 2();\``,
);
throw tmpThrowArg;
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( "no" );
  $( "inlining" );
  $( "please" );
  return undefined;
};
a();
$( "pass" );
$( undefined );
a();
const b = new $typeError_constructor( "[Preval] Attempting to call a value that cannot be called: `const tmpCalleeParam$3 = 2();`" );
throw b;
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  $(`no`);
  $(`inlining`);
  $(`please`);
  const y = x();
  return y;
};
const tmpCallCallee = f;
let tmpCalleeParam$1 = function () {
  debugger;
  $(`pass`);
  return undefined;
};
let tmpCalleeParam = f(tmpCalleeParam$1);
$(tmpCalleeParam);
let tmpCalleeParam$3 = f(2);
$(tmpCalleeParam$3);
let tmpCalleeParam$5 = f(`three`);
$(tmpCalleeParam$5);
`````


## Todos triggered


- (todo) Encountered non-ident as callee
- (todo) infertyping on a non-ident? is that a crash or bug? Literal
- (todo) infertyping on a non-ident? is that a crash or bug? TemplateLiteral


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'no'
 - 2: 'inlining'
 - 3: 'please'
 - 4: 'pass'
 - 5: undefined
 - 6: 'no'
 - 7: 'inlining'
 - 8: 'please'
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
