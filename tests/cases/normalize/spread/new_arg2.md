# Preval test case

# new_arg2.md

> Normalize > Spread > New arg2
>
> Spread should normalize itself

## Input

`````js filename=intro
(2).c;
(5)[6];
const tmpObjLitVal = [7];
new String(8.5, 8, ...tmpObjLitVal);
`````


## Settled


`````js filename=intro
$Number_prototype.c;
$Number_prototype[6];
const tmpObjLitVal /*:array*/ = [7];
new $string_constructor(8.5, 8, ...tmpObjLitVal);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
$Number_prototype.c;
$Number_prototype[6];
const tmpObjLitVal = [7];
new $string_constructor(8.5, 8, ...tmpObjLitVal);
`````


## PST Settled
With rename=true

`````js filename=intro
$Number_prototype.c;
$Number_prototype[ 6 ];
const a = [ 7 ];
new $string_constructor( 8.5, 8, ...a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
$Number_prototype.c;
$Number_prototype[6];
const tmpObjLitVal = [7];
new $string_constructor(8.5, 8, ...tmpObjLitVal);
`````


## Todos triggered


- (todo) support array reads statement type ExpressionStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
