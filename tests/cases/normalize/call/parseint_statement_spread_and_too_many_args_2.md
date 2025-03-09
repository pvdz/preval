# Preval test case

# parseint_statement_spread_and_too_many_args_2.md

> Normalize > Call > Parseint statement spread and too many args 2
>
> A builtin with too many args that is a statement...

## Input

`````js filename=intro
parseInt(...$([1, 2]), $spy('b'), $spy('c'));
`````

## Settled


`````js filename=intro
const tmpCalleeParam /*:array*/ = [1, 2];
const tmpArrSpread /*:unknown*/ = $(tmpCalleeParam);
const tmpArgOverflowOne /*:array*/ = [...tmpArrSpread];
const tmpArgOverflowLen /*:number*/ = tmpArgOverflowOne.length;
const tmpArgOverflowTwo /*:unknown*/ = $spy(`b`);
const tmpArgOverflowThree /*:unknown*/ = $spy(`c`);
if (tmpArgOverflowLen) {
  const tmpClusterSSA_tmpCalleeParam$1 /*:unknown*/ = tmpArgOverflowOne[0];
  $coerce(tmpClusterSSA_tmpCalleeParam$1, `string`);
} else {
  $coerce(tmpArgOverflowTwo, `string`);
}
let tmpUnaryArg /*:unknown*/ = undefined;
const tmpIfTest /*:boolean*/ = tmpArgOverflowLen > 1;
if (tmpIfTest) {
  tmpUnaryArg = tmpArgOverflowOne[1];
} else {
  if (tmpArgOverflowLen) {
    tmpUnaryArg = tmpArgOverflowTwo;
  } else {
    tmpUnaryArg = tmpArgOverflowThree;
  }
}
+tmpUnaryArg;
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrSpread = $([1, 2]);
const tmpArgOverflowOne = [...tmpArrSpread];
const tmpArgOverflowLen = tmpArgOverflowOne.length;
const tmpArgOverflowTwo = $spy(`b`);
const tmpArgOverflowThree = $spy(`c`);
if (tmpArgOverflowLen) {
  $coerce(tmpArgOverflowOne[0], `string`);
} else {
  $coerce(tmpArgOverflowTwo, `string`);
}
let tmpUnaryArg = undefined;
if (tmpArgOverflowLen > 1) {
  tmpUnaryArg = tmpArgOverflowOne[1];
} else {
  if (tmpArgOverflowLen) {
    tmpUnaryArg = tmpArgOverflowTwo;
  } else {
    tmpUnaryArg = tmpArgOverflowThree;
  }
}
+tmpUnaryArg;
`````

## Pre Normal


`````js filename=intro
parseInt(...$([1, 2]), $spy(`b`), $spy(`c`));
`````

## Normalized


`````js filename=intro
const tmpCalleeParam = [1, 2];
const tmpArrSpread = $(tmpCalleeParam);
const tmpArgOverflowOne = [...tmpArrSpread];
const tmpArgOverflowLen = tmpArgOverflowOne.length;
const tmpArgOverflowTwo = $spy(`b`);
const tmpArgOverflowThree = $spy(`c`);
let tmpCalleeParam$1 = undefined;
if (tmpArgOverflowLen) {
  tmpCalleeParam$1 = tmpArgOverflowOne[0];
  $coerce(tmpCalleeParam$1, `string`);
} else {
  tmpCalleeParam$1 = tmpArgOverflowTwo;
  $coerce(tmpArgOverflowTwo, `string`);
}
let tmpUnaryArg = undefined;
const tmpIfTest = tmpArgOverflowLen > 1;
if (tmpIfTest) {
  tmpUnaryArg = tmpArgOverflowOne[1];
} else {
  if (tmpArgOverflowLen) {
    tmpUnaryArg = tmpArgOverflowTwo;
  } else {
    tmpUnaryArg = tmpArgOverflowThree;
  }
}
+tmpUnaryArg;
`````

## PST Settled
With rename=true

`````js filename=intro
const a = [ 1, 2 ];
const b = $( a );
const c = [ ...b ];
const d = c.length;
const e = $spy( "b" );
const f = $spy( "c" );
if (d) {
  const g = c[ 0 ];
  $coerce( g, "string" );
}
else {
  $coerce( e, "string" );
}
let h = undefined;
const i = d > 1;
if (i) {
  h = c[ 1 ];
}
else {
  if (d) {
    h = e;
  }
  else {
    h = f;
  }
}
+h;
`````

## Globals

None

## Runtime Outcome

Should call `$` with:
 - 1: [1, 2]
 - 2: 'Creating spy', 1, 1, ['b', 'b']
 - 3: 'Creating spy', 2, 1, ['c', 'c']
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- we may be able to confirm that ident refs in the array literal are primitives in same loop/try scope
