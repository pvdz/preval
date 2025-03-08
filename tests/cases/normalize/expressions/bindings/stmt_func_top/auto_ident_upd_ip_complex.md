# Preval test case

# auto_ident_upd_ip_complex.md

> Normalize > Expressions > Bindings > Stmt func top > Auto ident upd ip complex
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
function f() {
  let b = { x: 1 };

  let a = $($(b)).x++;
  $(a, b);
}
$(f());
`````

## Settled


`````js filename=intro
const b /*:object*/ = { x: 1 };
const tmpCalleeParam /*:unknown*/ = $(b);
const tmpUpdObj /*:unknown*/ = $(tmpCalleeParam);
const tmpUpdProp /*:unknown*/ = tmpUpdObj.x;
const tmpUpdNum /*:number*/ = $coerce(tmpUpdProp, `number`);
const tmpUpdInc /*:number*/ = tmpUpdNum + 1;
tmpUpdObj.x = tmpUpdInc;
$(tmpUpdNum, b);
$(undefined);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const b = { x: 1 };
const tmpUpdObj = $($(b));
const tmpUpdNum = $coerce(tmpUpdObj.x, `number`);
tmpUpdObj.x = tmpUpdNum + 1;
$(tmpUpdNum, b);
$(undefined);
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  let a = $($(b)).x++;
  $(a, b);
};
$(f());
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  let b = { x: 1 };
  const tmpCalleeParam = $(b);
  let tmpUpdObj = $(tmpCalleeParam);
  let tmpUpdProp = tmpUpdObj.x;
  let tmpUpdNum = $coerce(tmpUpdProp, `number`);
  let tmpUpdInc = tmpUpdNum + 1;
  tmpUpdObj.x = tmpUpdInc;
  let a = tmpUpdNum;
  $(tmpUpdNum, b);
  return undefined;
};
const tmpCalleeParam$1 = f();
$(tmpCalleeParam$1);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = { x: 1 };
const b = $( a );
const c = $( b );
const d = c.x;
const e = $coerce( d, "number" );
const f = e + 1;
c.x = f;
$( e, a );
$( undefined );
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: { x: '1' }
 - 2: { x: '1' }
 - 3: 1, { x: '2' }
 - 4: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
