# Preval test case

# stringnum.md

> Normalize > Compound > Stringnum
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

obj.x = $spy(); // This line should become `obj.x = obj.x + 5`
$(a, s); // 5, 'read;write[5]'
`````


## Settled


`````js filename=intro
let s /*:string*/ = ``;
let a /*:primitive*/ = 0;
const tmpAssignMemRhs /*:unknown*/ = $spy();
const tmpAssignMemLhsObj /*:object*/ = {
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
    const tmpStringConcatL /*:string*/ = $coerce(v, `plustr`);
    const tmpBinBothRhs /*:string*/ = `write[${tmpStringConcatL}];`;
    s = tmpBinBothLhs + tmpBinBothRhs;
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
const tmpAssignMemRhs = $spy();
const tmpAssignMemLhsObj = {
  get x() {
    const tmpStringConcatR = s;
    s = `${tmpStringConcatR}read;`;
    return a;
  },
  set x(v) {
    const tmpBinBothLhs = s;
    const tmpStringConcatL = $coerce(v, `plustr`);
    s = tmpBinBothLhs + `write[${tmpStringConcatL}];`;
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
const c = $spy();
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
    const i = `write[${h}];`;
    a = g + i;
    b = b + f;
    return b;
  },
};
d.x = c;
$( b, a );
`````


## Todos triggered


None


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'Creating spy', 1, 0, ['spy', 12345]
 - 2: '$spy[1].valueOf()'
 - 3: '$spy[1].valueOf()'
 - 4: 12345, 'write[12345];'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
