# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident delete computed s-seq complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let arg = { y: 1 };

  let a = delete ($(1), $(2), arg)[$("y")];
  $(a, arg);
}
$(f());
`````


## Settled


`````js filename=intro
$(1);
$(2);
const tmpDeleteCompProp /*:unknown*/ = $(`y`);
const arg /*:object*/ /*truthy*/ = { y: 1 };
const a /*:boolean*/ = delete arg[tmpDeleteCompProp];
$(a, arg);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$(1);
$(2);
const tmpDeleteCompProp = $(`y`);
const arg = { y: 1 };
$(delete arg[tmpDeleteCompProp], arg);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
$( 1 );
$( 2 );
const a = $( "y" );
const b = { y: 1 };
const c = delete b[ a ];
$( c, b );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let arg = { y: 1 };
  $(1);
  $(2);
  const tmpDeleteCompObj = arg;
  const tmpDeleteCompProp = $(`y`);
  let a = delete tmpDeleteCompObj[tmpDeleteCompProp];
  $(a, arg);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: true, {}
 - 5: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
