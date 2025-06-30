# Preval test case

# call_arg_complex.md

> Normalize > Spread > Call arg complex
>
> Spread should normalize itself

## Input

`````js filename=intro
var a,b,c,d,e,f,g,h,x,y;
x.y(x, 8, ...((a = b.c), (d = e[f]), g).h);
`````


## Settled


`````js filename=intro
undefined.y;
throw `[Preval]: Can not reach here`;
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
undefined.y;
throw `[Preval]: Can not reach here`;
`````


## PST Settled
With rename=true

`````js filename=intro
undefined.y;
throw "[Preval]: Can not reach here";
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let a = undefined;
let b = undefined;
let c = undefined;
let d = undefined;
let e = undefined;
let f = undefined;
let g = undefined;
let h = undefined;
let x = undefined;
let y = undefined;
const tmpMCF = x.y;
a = b.c;
d = e[f];
const tmpCompObj = g;
const tmpMCSP = tmpCompObj.h;
$dotCall(tmpMCF, x, `y`, x, 8, ...tmpMCSP);
`````


## Todos triggered


- (todo) property on nullable; unreachable or hard error?


## Globals


None


## Runtime Outcome


Should call `$` with:
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
