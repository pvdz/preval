# Preval test case

# default_yes_yes__empty_str.md

> Normalize > Pattern > Param > Obj > Obj > Rest > Default yes yes  empty str
>
> By normalizing patterns we don't have to concern ourselves with its complexities. Defaults are another dimension to take care off and test for.

## Input

`````js filename=intro
function f({ x: { ...y } = $({ a: 'pass' }) } = $({ x: { a: 'fail2' } })) {
  return y;
}
$(f('', 10));
`````


## Settled


`````js filename=intro
const tmpOPBD /*:unknown*/ = $String_prototype.x;
let tmpCalleeParam$3 /*:unknown*/ /*ternaryConst*/ = undefined;
const tmpIfTest$1 /*:boolean*/ = tmpOPBD === undefined;
if (tmpIfTest$1) {
  const tmpCalleeParam$1 /*:object*/ /*truthy*/ = { a: `pass` };
  tmpCalleeParam$3 = $(tmpCalleeParam$1);
} else {
  tmpCalleeParam$3 = tmpOPBD;
}
const tmpCalleeParam$5 /*:array*/ /*truthy*/ = [];
const y /*:unknown*/ = $objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
$(y);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpOPBD = $String_prototype.x;
let tmpCalleeParam$3 = undefined;
if (tmpOPBD === undefined) {
  tmpCalleeParam$3 = $({ a: `pass` });
} else {
  tmpCalleeParam$3 = tmpOPBD;
}
$($objPatternRest(tmpCalleeParam$3, [], undefined));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $String_prototype.x;
let b = undefined;
const c = a === undefined;
if (c) {
  const d = { a: "pass" };
  b = $( d );
}
else {
  b = a;
}
const e = [];
const f = $objPatternRest( b, e, undefined );
$( f );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function ($$0) {
  const tmpParamBare = $$0;
  debugger;
  let tmpBindingPatternObjRoot = undefined;
  const tmpIfTest = tmpParamBare === undefined;
  if (tmpIfTest) {
    const tmpObjLitVal = { a: `fail2` };
    let tmpCalleeParam = { x: tmpObjLitVal };
    tmpBindingPatternObjRoot = $(tmpCalleeParam);
  } else {
    tmpBindingPatternObjRoot = tmpParamBare;
  }
  let tmpOPBD = tmpBindingPatternObjRoot.x;
  let tmpOPAD = undefined;
  const tmpIfTest$1 = tmpOPBD === undefined;
  if (tmpIfTest$1) {
    let tmpCalleeParam$1 = { a: `pass` };
    tmpOPAD = $(tmpCalleeParam$1);
  } else {
    tmpOPAD = tmpOPBD;
  }
  let tmpCalleeParam$3 = tmpOPAD;
  let tmpCalleeParam$5 = [];
  let y = $objPatternRest(tmpCalleeParam$3, tmpCalleeParam$5, undefined);
  return y;
};
let tmpCalleeParam$7 = f(``, 10);
$(tmpCalleeParam$7);
`````


## Todos triggered


- (todo) array reads var statement with init CallExpression
- (todo) support IfStatement as statement in let_hoisting noob check


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: { a: '"pass"' }
 - 2: { a: '"pass"' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
