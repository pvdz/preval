# Preval test case

# alias_to_function_decl.md

> Ternary alias > Ai silly contrived > Alias to function decl
>
> b assigned to a function declaration: should NOT replace

## Input

`````js filename=intro
function a() {}
let b = undefined;
if (x) {} else { b = a; }
$(b);
// Expect: No change, b is not a local alias
`````


## Settled


`````js filename=intro
const a /*:()=>unknown*/ = function () {
  debugger;
  return undefined;
};
if (x) {
  $(undefined);
} else {
  $(a);
}
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const a = function () {};
if (x) {
  $(undefined);
} else {
  $(a);
}
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  return undefined;
};
if (x) {
  $( undefined );
}
else {
  $( a );
}
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = function () {
  debugger;
  return undefined;
};
let b = undefined;
if (x) {
  $(b);
} else {
  b = a;
  $(a);
}
`````


## Todos triggered


None


## Globals


BAD@! Found 1 implicit global bindings:

x


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
