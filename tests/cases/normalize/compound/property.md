# Preval test case

# property.md

> Normalize > Compound > Property
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

obj.x += 5; // This line should become `obj.x = obj.x + 5`
$(a, s); // 5, 'read;write[5]'
`````


## Settled


`````js filename=intro
let s /*:string*/ = ``;
let a /*:primitive*/ = 0;
const obj /*:object*/ = {
  get x() {
    debugger;
    const tmpStringConcatR /*:unknown*/ = s;
    s = `${tmpStringConcatR}read;`;
    return a;
  },
  set x($$0) {
    const v /*:unknown*/ = $$0;
    debugger;
    const tmpBinBothLhs /*:unknown*/ = s;
    const tmpStringConcatL$1 /*:string*/ = $coerce(v, `plustr`);
    const tmpBinBothRhs /*:string*/ = `write[${tmpStringConcatL$1}];`;
    s = tmpBinBothLhs + tmpBinBothRhs;
    a = a + v;
    return a;
  },
};
const tmpCompoundAssignLhs /*:unknown*/ = obj.x;
const tmpAssignMemRhs /*:primitive*/ = tmpCompoundAssignLhs + 5;
obj.x = tmpAssignMemRhs;
$(a, s);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
let s = ``;
let a = 0;
const obj = {
  get x() {
    const tmpStringConcatR = s;
    s = `${tmpStringConcatR}read;`;
    return a;
  },
  set x(v) {
    const tmpBinBothLhs = s;
    const tmpStringConcatL$1 = $coerce(v, `plustr`);
    s = tmpBinBothLhs + `write[${tmpStringConcatL$1}];`;
    a = a + v;
    return a;
  },
};
obj.x = obj.x + 5;
$(a, s);
`````


## PST Settled
With rename=true

`````js filename=intro
let a = "";
let b = 0;
const c = {
  get x() {
    debugger;
    const d = a;
    a = `${d}read;`;
    return b;
  },
  set x( $$0 ) {
    const e = $$0;
    debugger;
    const f = a;
    const g = $coerce( e, "plustr" );
    const h = `write[${g}];`;
    a = f + h;
    b = b + e;
    return b;
  },
};
const i = c.x;
const j = i + 5;
c.x = j;
$( b, a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 5, 'read;write[5];'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
