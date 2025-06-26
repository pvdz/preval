# Preval test case

# date.md

> Normalize > Compound > Date
>
> When decomposing compound assignments to properties we must make sure to retain observable runtime semantics. Consider: "what if the property is a getter?"

## Input

`````js filename=intro
let s = '';
let a = 0;
const obj = {
  get x() { 
    s += 'read;';
    return a;
  },
  set x(v) {
    s += 'write[' + v + '];';
    a += v;
    return a;
  }
};

obj.x = new Date(12345); // This line should become `obj.x = obj.x + 5`
$(a, s); // 5, 'read;write[5]'
`````


## Settled


`````js filename=intro
let s /*:string*/ = ``;
let a /*:primitive*/ = 0;
const tmpAssignMemRhs /*:date*/ /*truthy*/ = new $date_constructor(12345);
const tmpAssignMemLhsObj /*:object*/ /*truthy*/ = {
  get x() {
    debugger;
    const tmpStringConcatR /*:string*/ = s;
    s = `${tmpStringConcatR}read;`;
    return a;
  },
  set x($$0) {
    const v /*:unknown*/ = $$0;
    debugger;
    const tmpBinBothLhs /*:string*/ = s;
    const tmpStringConcatL$1 /*:string*/ = $coerce(v, `plustr`);
    s = `${tmpBinBothLhs}write[${tmpStringConcatL$1}];`;
    a = a + v;
    return a;
  },
};
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$(a, s);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let s = ``;
let a = 0;
const tmpAssignMemRhs = new $date_constructor(12345);
const tmpAssignMemLhsObj = {
  get x() {
    const tmpStringConcatR = s;
    s = `${tmpStringConcatR}read;`;
    return a;
  },
  set x(v) {
    const tmpBinBothLhs = s;
    const tmpStringConcatL$1 = $coerce(v, `plustr`);
    s = `${tmpBinBothLhs}write[${tmpStringConcatL$1}];`;
    a = a + v;
    return a;
  },
};
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$(a, s);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = "";
let b = 0;
const c = new $date_constructor( 12345 );
const d = {
  get x() {
    debugger;
    const e = a;
    a = `${e}read;`;
    return b;
  },
  set x( $$0 ) {
    const f = $$0;
    debugger;
    const g = a;
    const h = $coerce( f, "plustr" );
    a = `${g}write[${h}];`;
    b = b + f;
    return b;
  },
};
d.x = c;
$( b, a );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let s = ``;
let a = 0;
const obj = {
  get x() {
    debugger;
    const tmpStringConcatR = $coerce(s, `plustr`);
    s = `${tmpStringConcatR}read;`;
    return a;
  },
  set x($$0) {
    let v = $$0;
    debugger;
    const tmpBinBothLhs = s;
    const tmpStringConcatL = $coerce(v, `plustr`);
    const tmpBinLhs = `write[${tmpStringConcatL}`;
    const tmpStringConcatR$1 = $coerce(tmpBinLhs, `plustr`);
    const tmpBinBothRhs = `${tmpStringConcatR$1}];`;
    s = tmpBinBothLhs + tmpBinBothRhs;
    a = a + v;
    return a;
  },
};
const tmpAssignMemLhsObj = obj;
const tmpAssignMemRhs = new $date_constructor(12345);
tmpAssignMemLhsObj.x = tmpAssignMemRhs;
$(a, s);
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
  '0Thu Jan 01 1970 01:00:12 GMT+0100 (Central European Standard Time)',
  'write[Thu Jan 01 1970 01:00:12 GMT+0100 (Central European Standard Time)];',

 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
