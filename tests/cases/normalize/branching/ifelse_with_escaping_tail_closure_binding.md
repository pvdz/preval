# Preval test case

# ifelse_with_escaping_tail_closure_binding.md

> Normalize > Branching > Ifelse with escaping tail closure binding
>
> Regression found while running Preval on Tenko

The problem is that if-else normalization would slice the tail into its own function. But if the tail contained a var decl that was also used in a closure (defined before the if) then the binding would not be accessible anymore, leading to a global variable. 

In this case the function "escapes"; it is passed on into a black hole. It still needs to do what it used to.

## Input

`````js filename=intro
const f = function () {
  const g = function () {
    $(xyz, 'g');
  };
  const t = $([g]); // <- preval won't know $ so it can't safely trace `g` from here on out
  if ($) {
    $(1);
  }
  const xyz = $();
  t[0]();
  return g();
};
$(f());
`````


## Settled


`````js filename=intro
const g /*:()=>undefined*/ = function () {
  debugger;
  $(xyz, `g`);
  return undefined;
};
const tmpCalleeParam /*:array*/ /*truthy*/ = [g];
const t /*:unknown*/ = $(tmpCalleeParam);
if ($) {
  $(1);
} else {
}
const xyz /*:unknown*/ = $();
const tmpMCF /*:unknown*/ = t[0];
$dotCall(tmpMCF, t, undefined);
$(xyz, `g`);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const g = function () {
  $(xyz, `g`);
};
const t = $([g]);
if ($) {
  $(1);
}
const xyz = $();
t[0]();
$(xyz, `g`);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  $( b, "g" );
  return undefined;
};
const c = [ a ];
const d = $( c );
if ($) {
  $( 1 );
}
const b = $();
const e = d[ 0 ];
$dotCall( e, d, undefined );
$( b, "g" );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const f = function () {
  debugger;
  const g = function () {
    debugger;
    $(xyz, `g`);
    return undefined;
  };
  let tmpCalleeParam = [g];
  const t = $(tmpCalleeParam);
  if ($) {
    $(1);
  } else {
  }
  const xyz = $();
  const tmpMCF = t[0];
  $dotCall(tmpMCF, t, undefined);
  const tmpReturnArg = g();
  return tmpReturnArg;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: ['<function>']
 - 2: 1
 - 3: 
 - 4: undefined, 'g'
 - 5: undefined, 'g'
 - 6: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
