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
const f /*:()=>unknown*/ = function () {
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
throw `Attempting to call a value that cannot be called: \`const tmpCalleeParam\$3 = 2();\``;
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
throw `Attempting to call a value that cannot be called: \`const tmpCalleeParam\$3 = 2();\``;
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
throw "Attempting to call a value that cannot be called: `const tmpCalleeParam$3 = 2();`";
`````


## Todos triggered


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
