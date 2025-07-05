# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Statement > Stmt func top > Auto ident computed s-seq simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
function f() {
  let b = { c: 1 };

  let a = { a: 999, b: 1000 };
  (1, 2, b)[$("c")];
  $(a, b);
}
$(f());
`````


## Settled


`````js filename=intro
const tmpCalleeParam /*:unknown*/ = $(`c`);
$coerce(tmpCalleeParam, `string`);
const a /*:object*/ /*truthy*/ = { a: 999, b: 1000 };
const b /*:object*/ /*truthy*/ = { c: 1 };
$(a, b);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
String($(`c`));
$({ a: 999, b: 1000 }, { c: 1 });
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "c" );
$coerce( a, "string" );
const b = {
  a: 999,
  b: 1000,
};
const c = { c: 1 };
$( b, c );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  let b = { c: 1 };
  let a = { a: 999, b: 1000 };
  const tmpCompObj = b;
  const tmpCalleeParam = $(`c`);
  tmpCompObj[tmpCalleeParam];
  $(a, b);
  return undefined;
};
let tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````


## Todos triggered


- (todo) support ObjectExpression as var init in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'c'
 - 2: { a: '999', b: '1000' }, { c: '1' }
 - 3: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
