# Preval test case

# unary_arr_spy.md

> Normalize > Binary > With > Arr > Unary arr spy
>
> Deal with certain primitive with binary ops

## Input

`````js filename=intro
const arr = [
  ~ [$('~ operator')],
  ! [$('! operator')],
  - [$('- operator')],
  + [$('+ operator')],
  typeof [$('typeof operator')],
  void [$('void operator')],
];
$(arr);
`````


## Settled


`````js filename=intro
const tmpArrElement$11 /*:unknown*/ = $(`~ operator`);
const tmpUnaryArg /*:array*/ /*truthy*/ = [tmpArrElement$11];
const tmpArrElement /*:number*/ = ~tmpUnaryArg;
$(`! operator`);
const tmpArrElement$15 /*:unknown*/ = $(`- operator`);
const tmpUnaryArg$3 /*:array*/ /*truthy*/ = [tmpArrElement$15];
const tmpArrElement$3 /*:number*/ = -tmpUnaryArg$3;
const tmpArrElement$17 /*:unknown*/ = $(`+ operator`);
const tmpUnaryArg$5 /*:array*/ /*truthy*/ = [tmpArrElement$17];
const tmpArrElement$5 /*:number*/ = +tmpUnaryArg$5;
$(`typeof operator`);
$(`void operator`);
const arr /*:array*/ /*truthy*/ = [tmpArrElement, false, tmpArrElement$3, tmpArrElement$5, `object`, undefined];
$(arr);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpArrElement$11 = $(`~ operator`);
const tmpUnaryArg = [tmpArrElement$11];
const tmpArrElement = ~tmpUnaryArg;
$(`! operator`);
const tmpArrElement$15 = $(`- operator`);
const tmpUnaryArg$3 = [tmpArrElement$15];
const tmpArrElement$3 = -tmpUnaryArg$3;
const tmpArrElement$17 = $(`+ operator`);
const tmpUnaryArg$5 = [tmpArrElement$17];
const tmpArrElement$5 = +tmpUnaryArg$5;
$(`typeof operator`);
$(`void operator`);
$([tmpArrElement, false, tmpArrElement$3, tmpArrElement$5, `object`, undefined]);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = $( "~ operator" );
const b = [ a ];
const c = ~b;
$( "! operator" );
const d = $( "- operator" );
const e = [ d ];
const f = -e;
const g = $( "+ operator" );
const h = [ g ];
const i = +h;
$( "typeof operator" );
$( "void operator" );
const j = [ c, false, f, i, "object", undefined ];
$( j );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpArrElement$11 = $(`~ operator`);
const tmpUnaryArg = [tmpArrElement$11];
const tmpArrElement = ~tmpUnaryArg;
const tmpArrElement$13 = $(`! operator`);
const tmpUnaryArg$1 = [tmpArrElement$13];
const tmpArrElement$1 = !tmpUnaryArg$1;
const tmpArrElement$15 = $(`- operator`);
const tmpUnaryArg$3 = [tmpArrElement$15];
const tmpArrElement$3 = -tmpUnaryArg$3;
const tmpArrElement$17 = $(`+ operator`);
const tmpUnaryArg$5 = [tmpArrElement$17];
const tmpArrElement$5 = +tmpUnaryArg$5;
const tmpArrElement$19 = $(`typeof operator`);
const tmpUnaryArg$7 = [tmpArrElement$19];
const tmpArrElement$7 = typeof tmpUnaryArg$7;
$(`void operator`);
const tmpArrElement$9 = undefined;
const arr = [tmpArrElement, tmpArrElement$1, tmpArrElement$3, tmpArrElement$5, tmpArrElement$7, tmpArrElement$9];
$(arr);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type VarStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '~ operator'
 - 2: '! operator'
 - 3: '- operator'
 - 4: '+ operator'
 - 5: 'typeof operator'
 - 6: 'void operator'
 - 7: [-1, false, NaN, NaN, 'object', undefined]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
